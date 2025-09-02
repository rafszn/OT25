import OTButton from "../components/OTButton";
import { FaCheck } from "react-icons/fa6";

const Tickets = () => {
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
            OTH25 Basic
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
                ₦5,000
              </div>

              <div className="border border-white/80 rounded-xl h-[38px] w-[104px] flex items-center justify-between p-2">
                <p className="w-[18px] h-[18px] rounded bg-white/20 flex items-center justify-center">
                  -
                </p>
                <p className="text-lg text-white">2</p>
                <p className="w-[18px] h-[18px] bg-white/80 rounded flex items-center justify-center">
                  +
                </p>
              </div>
              <div className="hidden sm:block">
                <OTButton title="Get Tickets" bg="purple_white" />
              </div>
            </div>
            <button
              className={`sm:hidden h-[50px] w-full mt-2  px-8 rounded-xl bg-[#6A0DAD] text-white shadow-[-4px_4px_1px_#ffffff] cursor-pointer sm:text-[20px] text-[16px] font-semibold`}
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
            OTH25 Premium
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
                ₦15,000
              </div>

              <div className="border border-white/80 rounded-xl h-[38px] w-[104px] flex items-center justify-between p-2">
                <p className="w-[18px] h-[18px] rounded bg-white/20 flex items-center justify-center">
                  -
                </p>
                <p className="text-lg text-white">2</p>
                <p className="w-[18px] h-[18px] bg-white/80 rounded flex items-center justify-center">
                  +
                </p>
              </div>
              <div className="hidden sm:block">
                <OTButton title="Get Tickets" bg="orange" />
              </div>
            </div>
            <button
              className={`sm:hidden h-[50px] w-full mt-2  px-8 rounded-xl bg-[#FF7F00] text-white shadow-[-4px_4px_1px_#ffffff] cursor-pointer sm:text-[20px] text-[16px] font-semibold`}
            >
              Get Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tickets;
