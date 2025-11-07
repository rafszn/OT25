import OTCard from "./OTCard";
import OTText from "./OTText";

const LearnConnect = () => {
  return (
    <div className="mt-20 mb-20">
      <div className="text-center px-4">
        <OTText title="Learn. Connect. Win big!" bg="purple" />
      </div>

      <p className="text-center sm:text-[24px] text-[16px] mt-3 px-4">
        It’s all happening at Owerri Techies Hangout! Come vibe with fellow
        creatives, grab cool prizes, and unlock awesome opportunities!
      </p>

      <div className="sm:flex flex items-center gap-6 sm:gap-8 overflow-x-auto sm:overflow-x-visible scrollbar-hide snap-x snap-mandatory p-4 sm:p-0">
        <div className="flex-shrink-0 sm:flex-shrink">
          <OTCard
            imgSrc="/laptop.webp"
            title="Laptop Giveaway!"
            paragraph="Show up, have fun, and you might just leave with a brand-new laptop — because great ideas deserve great tools!"
            lg
            buttonText="Enter the Giveaway"
            handleClick={() => {
              window.location.href = "/giveaway";
            }}
          />
        </div>

        <div className="flex-shrink-0 sm:flex-shrink">
          <OTCard
            bg="purple"
            title="Scholarships for Grabs!"
            paragraph="Learn, grow, and level up your tech skills with exclusive scholarship offers just for our amazing hangout crew!"
            imgSrc="/scholarship.jpg"
            lg
            buttonText="Apply for a Scholarship"
            handleClick={() => {
              window.location.href = "/scholarship";
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default LearnConnect;
