import OTButton from "./OTButton";
import OTCard from "./OTCard";
import OTText from "./OTText";

const WhatToExpect = () => {
  return (
    <div className="mt-20 mb-20">
      <div className="text-center">
        <OTText
          title="What to expect at Owerri Techies Hangout 2025"
          bg="purple"
        />
      </div>

      <div className="sm:flex flex items-center gap-6 sm:gap-8 overflow-x-auto sm:overflow-x-visible scrollbar-hide snap-x snap-mandatory p-4">
        <div className="flex-shrink-0">
          <OTCard
            imgSrc="/akon.svg"
            title="Networking Opportunities"
            paragraph="Meet and connect with fellow techies, creatives, Web3 enthusiasts, and students. Build meaningful relationships that could shape your career or startup journey."
            handleClick={() => {
              window.location.href = "/tickets";
            }}
          />
        </div>
        <div className="flex-shrink-0">
          <OTCard
            bg="purple"
            title="Games & Fun Activities"
            paragraph="Unwind with exciting games and interactive sessions designed to help you relax, laugh, and bond with new friends."
            imgSrc="/bruno.svg"
            handleClick={() => {
              window.location.href = "/tickets";
            }}
          />
        </div>

        <div className="flex-shrink-0">
          <OTCard
            imgSrc="/akon.svg"
            title="Collaboration & Community"
            paragraph="Find potential collaborators for your projects, startups, or learning journeys. This is a chance to grow together and push Owerri’s tech scene forward."
            handleClick={() => {
              window.location.href = "/tickets";
            }}
          />
        </div>
      </div>

      <div className="text-center mt-10">
        <OTText title="Sponsors  & Partners" bg="purple" />
      </div>

      <div className="my-20 w-full flex items-center justify-center">
        <img src="/sponsor.svg" alt="" className="w-[80%] sm:w-full" />
      </div>

      <div className="text-center mt-10">
        <OTButton
          title="Collaborate with Us"
          bg="purple"
          handleClick={() => {
            window.location.href = "/sponsors";
          }}
        />
      </div>
    </div>
  );
};
export default WhatToExpect;
