import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OTButton from "../components/OTButton";
import { FaCheck } from "react-icons/fa6";
import OTInput from "../components/OTInput";
import { toast } from "sonner";
import axios from "axios";

type TicketType = "basic" | "premium";

interface TicketInfo {
  type: TicketType;
  title: string;
  price: number;
}

const TICKETS: Record<TicketType, TicketInfo> = {
  basic: { type: "basic", title: "OTH25 Basic", price: 2000 },
  premium: { type: "premium", title: "OTH25 Premium", price: 10000 },
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: TicketInfo;
  quantity: number;
}

const TicketModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  ticket,
  quantity,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const total = ticket.price * quantity;

  const handlePay = async () => {
    if (!firstName.trim()) {
      toast.error("Please enter your first name.");
      return;
    }

    if (!lastName.trim()) {
      toast.error("Please enter your last name.");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const payload = {
      firstName,
      lastName,
      email,
      ticketType: ticket.type,
      price: ticket.price,
      quantity,
      referralCode,
      total,
    };

    try {
      setLoading(true);
      const res = await axios.post(
        // "http://localhost:8080/v1/checkout",
        "https://ot-server-juqv.onrender.com/v1/checkout",
        payload
      );

      onClose();
      setLoading(false);
      window.location.href = res.data?.authorization_url;
    } catch {
      setLoading(false);
      toast.error("error");
      return;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[0.3rem] z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          backgroundImage: "url('/left.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-2xl font-bold mb-4">{ticket.title} Ticket</h2>

        <form className="space-y-3">
          <OTInput
            // label="First Name"
            placeholder="First Name"
            value={firstName}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <OTInput
            // label="Last Name"
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <OTInput
            // label="Valid Email"
            placeholder="A valid email address"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <OTInput
            // label="Valid Email"
            placeholder="Referral code (optional)"
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />

          <div className="mt-8 space-y-2">
            <p>
              <span className="font-semibold">Ticket Type:</span> {ticket.title}
            </p>
            <p>
              <span className="font-semibold">Price:</span> ₦
              {ticket.price.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span> {quantity}
            </p>
            <p>
              <span className="font-semibold">Total:</span> ₦
              {total.toLocaleString()}
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePay}
              className="px-4 py-2 bg-[#6A0DAD] text-white rounded cursor-pointer shadow-[4px_4px_1px_#FF7F00]"
            >
              {loading ? "Purchasing ticket(s)..." : "Pay"}
            </button>
          </div>
          <i className="text-[10px]">secured by paystack</i>
        </form>
      </motion.div>
    </motion.div>
  );
};

const Tickets = () => {
  const [quantities, setQuantities] = useState<{ [key in TicketType]: number }>(
    {
      basic: 1,
      premium: 1,
    }
  );

  const [selectedTicket, setSelectedTicket] = useState<TicketInfo | null>(null);

  const updateQuantity = (type: TicketType, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [type]: Math.max(1, prev[type] + delta), // min quantity is 1
    }));
  };

  const openModal = (ticket: TicketInfo) => {
    setSelectedTicket(ticket);
  };

  const closeModal = () => setSelectedTicket(null);

  return (
    <div className="my-10 mb-12">
      <div className="sm:flex p-4 sm:p-0 items-center gap-8">
        <div
          className={`relative sm:w-[608.12px] sm:h-[892px] h-[637px] my-10 sm:p-6 p-4  rounded-2xl bg-[#FF7F00] shadow-[-7px_7px_1px_#6A0DAD]`}
        >
          {/* image */}
          <div className="h-[40%] flex items-center justify-center">
            <img
              src={"/othticket.webp"}
              className="object-cover w-full"
              alt=""
            />
          </div>

          {/* title */}
          <h1
            className={`sm:mt-8 sm:text-[61px] mt-[-1rem] text-[36px] leading-[66px] font-semibold font-[ClashDisplay] text-white text-glow-purple`}
          >
            {TICKETS.basic.title}
          </h1>

          {/* paragraph */}
          <p
            className={`sm:text-[25px] text-[18px] text-white/80 mt-4 flex items-center gap-2`}
          >
            <FaCheck /> Full access to the Event
          </p>
          <p
            className={`sm:text-[25px] text-[18px] text-white/70 mt-2 flex gap-2`}
          >
            <FaCheck className="mt-[0.5rem]" /> Networking opportunities with
            participants
          </p>
          <p
            className={`sm:text-[25px] text-[18px] text-white/70 mt-2 flex  gap-2`}
          >
            <FaCheck className="mt-[0.5rem]" /> Event starter pack (badge, etc)
          </p>

          <div className="absolute left-0 sm:bottom-[10rem] bottom-[7rem] w-full border-b border-dashed custom-dash mt-6 border-b-white/70">
            <div className="relative">
              <div className="sm:h-10 sm:w-10 h-6 w-6 bg-white rounded-full absolute sm:top-[-20px] top-[-10px] left-[-1rem] sm:left-[-1.5rem]" />

              <div className="sm:h-10 h-6 w-6 sm:w-10  bg-white rounded-full absolute sm:right-[-1.2rem] right-[-1rem] top-[-10px] sm:top-[-20px]" />
            </div>
          </div>

          <div className="absolute bottom-6 left-0 w-full sm:px-6 px-4">
            <div className="flex items justify-between">
              <div className="price sm:text-[40px] sm:leading-[40px] text-[30px] font-[ClashDisplay] font-semibold text-white/80 self-end flex">
                <div className="self-end mb-[-12px]">
                  <p className="line-through sm:text-[24px] sm:leading-[27px] text-[15px] leading-[12px]">
                    ₦5,000
                  </p>
                  <p className="">₦{TICKETS.basic.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="border border-white/80 rounded-lg sm:h-[38px] sm:w-[104px] w-[75px] flex items-center justify-between sm:p-2 p-[2px] px-1 self-end mr-[2px] sm:mr-0">
                <p
                  className="sm:w-[18px] sm:h-[18px] w-[14px] h-[14px] rounded bg-white/20 flex items-center justify-center cursor-pointer"
                  onClick={() => updateQuantity("basic", -1)}
                >
                  -
                </p>
                <p className="sm:text-lg text-[14px] text-white">
                  {quantities.basic}
                </p>
                <p
                  className="sm:w-[18px] sm:h-[18px] w-[14px] h-[14px] bg-white/80 rounded flex items-center justify-center cursor-pointer"
                  onClick={() => updateQuantity("basic", +1)}
                >
                  +
                </p>
              </div>
              <div className="hidden sm:block self-end">
                <OTButton
                  title="Get Tickets"
                  bg="purple_white"
                  handleClick={() => openModal(TICKETS.basic)}
                />
              </div>
              <button
                className={`sm:hidden h-[39px] self-end w-[120px] mt-2  px-4 rounded-lg bg-[#6A0DAD]  text-white shadow-[-4px_4px_1px_#ffffff] cursor-pointer sm:text-[20px] text-[12px] font-semibold`}
                onClick={() => openModal(TICKETS.basic)}
              >
                Get Tickets
              </button>
            </div>
          </div>
        </div>

        <div
          className={`relative sm:w-[608.12px] sm:h-[892px] h-[750px] my-10 sm:p-6 px-4  rounded-2xl bg-[#6A0DAD] shadow-[-7px_7px_1px_#FF7F00]`}
        >
          {/* image */}
          <div className="h-[40%] flex items-center justify-center">
            <img
              src={"/othticket.webp"}
              className="object-cover w-full"
              alt=""
            />
          </div>

          {/* title */}
          <h1
            className={`sm:mt-8 sm:text-[61px] mt-[-1rem] text-[36px] leading-[66px] font-semibold font-[ClashDisplay] text-white text-glow-purple`}
          >
            {TICKETS.premium.title}
          </h1>

          {/* paragraph */}
          <p
            className={`sm:text-[25px] text-[18px] text-white/80 mt-4 flex items-center gap-2`}
          >
            Everything in Basic, plus:
          </p>
          <p
            className={`sm:text-[25px] text-[18px] text-white/70 mt-2 flex gap-2`}
          >
            <FaCheck className="mt-[0.5rem]" /> Priority seating at keynote
            sessions
          </p>
          <p
            className={`sm:text-[25px] text-[18px] text-white/70 mt-2 flex  gap-2`}
          >
            <FaCheck className="mt-[0.5rem]" /> VIP networking lounge (with
            speakers & sponsors)
          </p>
          <p
            className={`sm:text-[25px] text-[18px] text-white/70 mt-2 flex  gap-2`}
          >
            <FaCheck className="mt-[0.5rem]" /> Premium event swag (T-shirt,
            Notebook, Branded items)
          </p>

          <div className="absolute left-0 sm:bottom-[10rem] bottom-[7rem] w-full border-b border-dashed custom-dash mt-6 border-b-white/70">
            <div className="relative">
              <div className="sm:h-10 sm:w-10 h-6 w-6 bg-white rounded-full absolute sm:top-[-20px] top-[-10px] left-[-1rem] sm:left-[-1.5rem]" />

              <div className="sm:h-10 h-6 w-6 sm:w-10  bg-white rounded-full absolute sm:right-[-1.2rem] right-[-1rem] top-[-10px] sm:top-[-20px]" />
            </div>
          </div>

          <div className="absolute bottom-6 left-0 w-full sm:px-6 px-4">
            <div className="flex items-center justify-between">
              <div className="price sm:text-[40px] sm:leading-[40px] text-[30px] font-[ClashDisplay] font-semibold text-white/80 self-end flex">
                <div className="self-end mb-[-12px]">
                  <p className="line-through sm:text-[24px] text-[15px] leading-[12px] sm:leading-[27px]">
                    ₦15,000
                  </p>
                  <p className="">₦{TICKETS.premium.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="border border-white/80 rounded-lg sm:h-[38px] sm:w-[104px] w-[75px] flex items-center justify-between sm:p-2 p-[2px] px-1 self-end mr-[2px] sm:mr-0">
                <p
                  className="sm:w-[18px] sm:h-[18px] w-[14px] h-[14px] rounded bg-white/20 flex items-center justify-center cursor-pointer"
                  onClick={() => updateQuantity("premium", -1)}
                >
                  -
                </p>
                <p className="sm:text-lg text-[14px] text-white">
                  {quantities.premium}
                </p>
                <p
                  className="sm:w-[18px] sm:h-[18px] w-[14px] h-[14px] bg-white/80 rounded flex items-center justify-center cursor-pointer"
                  onClick={() => updateQuantity("premium", +1)}
                >
                  +
                </p>
              </div>
              <div className="hidden sm:block self-end">
                <OTButton
                  title="Get Tickets"
                  bg="orange"
                  handleClick={() => openModal(TICKETS.premium)}
                />
              </div>
              <button
                className={`sm:hidden h-[39px] self-end w-[120px] mt-2  px-4 rounded-lg bg-[#FF7F00] text-white shadow-[-4px_4px_1px_#ffffff] cursor-pointer sm:text-[20px] text-[12px] font-semibold`}
                onClick={() => openModal(TICKETS.premium)}
              >
                Get Tickets
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedTicket && (
          <TicketModal
            isOpen={!!selectedTicket}
            onClose={closeModal}
            ticket={selectedTicket}
            quantity={quantities[selectedTicket.type]}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
export default Tickets;
