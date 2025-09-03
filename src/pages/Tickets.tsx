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
  basic: { type: "basic", title: "OTH25 Basic", price: 5000 },
  premium: { type: "premium", title: "OTH25 Premium", price: 15000 },
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
      total,
    };

    try {
      setLoading(true);
      const res = await axios.post(
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
          className={`relative sm:w-[608.12px] sm:h-[892px] h-[637px] my-10 p-6  rounded-2xl bg-[#FF7F00] shadow-[-7px_7px_1px_#6A0DAD]`}
        >
          {/* image */}
          <div className="h-[40%] flex items-center justify-center">
            <img
              src={"/othticket.svg"}
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
            className={`sm:text-[25px] text-[18px] text-white/70 mt-4 flex items-center gap-2`}
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
            <FaCheck className="mt-[0.5rem]" /> Event starter pack (badge,
            program guide)
          </p>

          <div className="absolute left-0 w-full border-b border-dashed custom-dash mt-6 border-b-white/70">
            <div className="relative">
              <div className="sm:h-10 sm:w-10 h-6 w-6 bg-white rounded-full absolute sm:top-[-20px] top-[-10px] left-[-1rem] sm:left-[-1.5rem]" />

              <div className="sm:h-10 h-6 w-6 sm:w-10  bg-white rounded-full absolute sm:right-[-1.2rem] right-[-1rem] top-[-10px] sm:top-[-20px]" />
            </div>
          </div>
          <div className="absolute bottom-6 left-0 w-full px-6">
            <div className="flex items-center justify-between">
              <div className="price sm:text-[40px] text-[30px] font-[ClashDisplay] font-semibold text-white/80">
                ₦{TICKETS.basic.price.toLocaleString()}
              </div>

              <div className="border border-white/80 rounded-xl h-[38px] w-[104px] flex items-center justify-between p-2">
                <p
                  className="w-[18px] h-[18px] rounded bg-white/20 flex items-center justify-center cursor-pointer"
                  onClick={() => updateQuantity("basic", -1)}
                >
                  -
                </p>
                <p className="text-lg text-white">{quantities.basic}</p>
                <p
                  className="w-[18px] h-[18px] bg-white/80 rounded flex items-center justify-center cursor-pointer"
                  onClick={() => updateQuantity("basic", +1)}
                >
                  +
                </p>
              </div>
              <div className="hidden sm:block">
                <OTButton
                  title="Get Tickets"
                  bg="purple_white"
                  handleClick={() => openModal(TICKETS.basic)}
                />
              </div>
            </div>
            <button
              className={`sm:hidden h-[50px] w-full mt-2  px-8 rounded-xl bg-[#6A0DAD] text-white shadow-[-4px_4px_1px_#ffffff] cursor-pointer sm:text-[20px] text-[16px] font-semibold`}
              onClick={() => openModal(TICKETS.basic)}
            >
              Get Tickets
            </button>
          </div>
        </div>

        <div
          className={`relative sm:w-[608.12px] sm:h-[892px] h-[750px] my-10 p-6  rounded-2xl bg-[#6A0DAD] shadow-[-7px_7px_1px_#FF7F00]`}
        >
          {/* image */}
          <div className="h-[40%] flex items-center justify-center">
            <img
              src={"/othticket.svg"}
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
            className={`sm:text-[25px] text-[18px] text-white/70 mt-4 flex items-center gap-2`}
          >
            ✨Everything in Basic, plus:
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
            <FaCheck className="mt-[0.5rem]" /> Premium event swag (t-shirt,
            notebook, branded items)
          </p>

          <div className="absolute left-0 w-full border-b border-dashed custom-dash mt-6 border-b-white/70">
            <div className="relative">
              <div className="sm:h-10 sm:w-10 h-6 w-6 bg-white rounded-full absolute sm:top-[-20px] top-[-10px] left-[-1rem] sm:left-[-1.5rem]" />

              <div className="sm:h-10 h-6 w-6 sm:w-10  bg-white rounded-full absolute sm:right-[-1.2rem] right-[-1rem] top-[-10px] sm:top-[-20px]" />
            </div>
          </div>

          <div className="absolute bottom-6 left-0 w-full px-6">
            <div className="flex items-center justify-between">
              <div className="price sm:text-[40px] text-[30px] font-[ClashDisplay] font-semibold text-white/80">
                ₦{TICKETS.premium.price.toLocaleString()}
              </div>

              <div className="border border-white/80 rounded-xl h-[38px] w-[104px] flex items-center justify-between p-2">
                <p
                  className="w-[18px] h-[18px] rounded bg-white/20 flex items-center justify-center cursor-pointer"
                  onClick={() => updateQuantity("premium", -1)}
                >
                  -
                </p>
                <p className="text-lg text-white">{quantities.premium}</p>
                <p
                  className="w-[18px] h-[18px] bg-white/80 rounded flex items-center justify-center cursor-pointer select-none"
                  onClick={() => updateQuantity("premium", +1)}
                >
                  +
                </p>
              </div>
              <div className="hidden sm:block">
                <OTButton
                  title="Get Tickets"
                  bg="orange"
                  handleClick={() => openModal(TICKETS.premium)}
                />
              </div>
            </div>
            <button
              className={`sm:hidden h-[50px] w-full mt-2  px-8 rounded-xl bg-[#FF7F00] text-white shadow-[-4px_4px_1px_#ffffff] cursor-pointer sm:text-[20px] text-[16px] font-semibold`}
              onClick={() => openModal(TICKETS.premium)}
            >
              Get Tickets
            </button>
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
