import OTButton from "./OTButton";
import OTCard from "./OTCard";
import OTText from "./OTText";

const GreatMovement = () => {
  return (
    <div className="mt-20 mb-20">
      <div className="text-center">
        <OTText title="Be a part of this great Movement" bg="purple" />
      </div>

      <div className="sm:flex flex items-center gap-6 sm:gap-8 overflow-x-auto sm:overflow-x-visible scrollbar-hide snap-x snap-mandatory p-4 sm:p-0">
        <div className="flex-shrink-0 sm:flex-shrink">
          <OTCard
            imgSrc="/akon.webp"
            title="Partner & Build With Us"
            paragraph="Be part of the movement driving tech growth in Owerri. As a partner, you’ll gain visibility, connect with a vibrant audience of tech enthusiasts, and show your support for innovation in the community. From sponsorships to collaborations, your brand can make a real impact."
            lg
            buttonText="Get Involved"
            handleClick={() => {
              window.location.href = "/sponsor";
            }}
          />
        </div>

        <div className="flex-shrink-0 sm:flex-shrink">
          <OTCard
            bg="purple"
            title="Exhibit Your Product"
            paragraph="Showcase what you’re building! Whether it’s a product, service, or startup idea, the Owerri Techies Hangout is the perfect stage to put it in front of a curious and engaged audience. Connect directly with potential customers, users, and collaborators."
            imgSrc="/bruno.webp"
            lg
            buttonText="Book your exhibition space"
            handleClick={() => {
              window.location.href = "/exhibitor";
            }}
          />
        </div>
      </div>

      <div className="mx-4 sm:mx-0 sm:h-[594px] h-[695px] p-8 mt-20 rounded-2xl bg-[#6A0DAD] shadow-[-7px_7px_1px_#FF7F00] sm:flex  items-center justify-center gap-2">
        <div className="flex-1/2 flex items-center justify-center">
          <img src="/oth.webp" alt="" className="sm:w-[80%]" />
        </div>

        <div className="flex-1/2">
          <div className="my-4 sm:my-0">
            <OTText title="Upcoming Events" bg="white_orange" />
          </div>
          <p className="sm:text-[24px] text-[16px] text-white/90 font-semibold mt-[-1rem]">
            Owerri Techies Hangout 2025
          </p>
          <p className="sm:text-[24px] text-[16px] text-white/70">
            Date: 28th November
          </p>

          <p className="sm:text-[24px] text-[16px] text-white/70 sm:mt-8 mt-4 mb-4">
            The No.1 hangout for Tech experts, Web3 folks, creatives, and
            students in Owerri! This event is designed for us to Unwind from the
            stress of the grind and have fun!.
          </p>

          <OTButton
            title="Buy Tickets"
            bg="orange"
            handleClick={() => {
              window.location.href = "/ticket";
            }}
          />
        </div>
      </div>

      <div className="sm:hidden mx-4 sm:mx-0 sm:h-[594px] h-[695px] p-8 mt-20 rounded-2xl bg-[#FF7F00] shadow-[-7px_7px_1px_#6A0DAD] block  items-center justify-center gap-2">
        <div className="flex-1/2 flex items-center justify-center">
          <img
            src="/yb.webp"
            alt=""
            className="sm:w-[80%] shadow-[7px_7px_1px_#6A0DAD] rounded-2xl"
          />
        </div>

        <div className="flex-1/2">
          <div className="my-4 sm:my-0">
            <OTText title="Volunteer With Us" bg="white_purple" />
          </div>
          <p className="sm:text-[24px] text-[16px] text-white/90 font-semibold mt-[-1rem]">
            Owerri Techies Hangout 2025
          </p>
          <p className="sm:text-[24px] text-[16px] text-white/70">
            Date: 28th November
          </p>

          <p className="sm:text-[24px] text-[16px] text-white/70 sm:mt-8 mt-4 mb-4">
            If you are passionate about promoting this event, enthusiastic about
            events or enjoy working on fun events, then Owerri Techies hangout
            2025 has a variety of opportunities for you to get involved with!
          </p>

          <OTButton
            title="Join the Volunteer Team"
            bg="purple_white"
            handleClick={() => {
              window.location.href = "https://forms.gle/5ToVjQRxfwuUcKhD9";
            }}
          />
        </div>
      </div>

      <div className="hidden h-[594px] p-8 mt-20 rounded-2xl bg-[#FF7F00] shadow-[-7px_7px_1px_#6A0DAD] sm:flex flex-row-reverse items-center justify-center gap-2">
        <div className="flex-1/2 flex items-center justify-center">
          <img
            src="/yb.webp"
            alt=""
            className="w-[80%] shadow-[7px_7px_1px_#6A0DAD] rounded-2xl"
          />
        </div>

        <div className="flex-1/2">
          <OTText title="Volunteer With Us" bg="white_purple" />
          <p className="text-[24px] text-white/80 mt-8 mb-4">
            If you are passionate about promoting this event, enthusiastic about
            events or enjoy working on fun events, then Owerri Techies hangout
            2025 has a variety of opportunities for you to get involved with!
          </p>

          <OTButton
            title="Join the Volunteer Team"
            bg="purple_white"
            handleClick={() =>
              (window.location.href = "https://forms.gle/5ToVjQRxfwuUcKhD9")
            }
          />
        </div>
      </div>
    </div>
  );
};
export default GreatMovement;
