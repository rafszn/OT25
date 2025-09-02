import OTButton from "./OTButton";
import OTText from "./OTText";

const About = () => {
  return (
    <div className="sm:my-20 p-4 sm:p-0">
      <div className="text-center mb-10">
        <OTText title="About Us" bg="purple" />
        <p className="sm:text-[24px] text-[14px] sm:leading-[36px] mb-10">
          Owerri Techies began as a small gathering of passionate developers,
          designers, and innovators who wanted to share ideas and learn from one
          another. What started as informal meetups has grown into a recognized
          community that hosts one of the largest tech events in the region.
          Over the years, we’ve welcomed hundreds of participants, partnered
          with leading sponsors, and created opportunities that continue to
          inspire collaboration and innovation. Today, Owerri Techies stands as
          a hub where talent, creativity, and ambition meet to shape the future
          of technology in Owerri and beyond.
        </p>

        <OTButton title="Join Community" bg="purple" lg />
      </div>

      {/* image gallery */}

      <div className="mb-20 flex items-center justify-center select-none">
        <img src="/image.png" alt="" className="hidden sm:block" />
        <img src="/ab-mobile.svg" className="sm:hidden w-full" alt="" />
      </div>

      <div className="text-center">
        <OTText title="Highlights of our last Hangout" bg="purple" />
      </div>

      <div className="border h-[623px] mt-4">
        <video
          className="w-full h-full rounded-lg shadow-lg"
          src="/path-to-your-video.mp4"
          controls
          autoPlay={false}
          loop={false}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
export default About;
