import OTButton from "./OTButton";

const OTCard = ({
  bg = "orange",
  imgSrc,
  title,
  paragraph,
  lg,
  buttonText = "Get Tickets",
  handleClick,
}: {
  bg?: "orange" | "purple";
  imgSrc: string;
  title: string;
  paragraph: string;
  lg?: boolean;
  buttonText?: string;
  handleClick?: () => void;
}) => {
  const dimensions =
    lg === true
      ? "sm:w-full w-[360px] sm:h-[950px] h-[670px]"
      : // ? "sm:w-[608.12px] w-[390px] sm:h-[950px] h-[650px]"
        "h-[581px]  sm:w-[380px] w-[340px]";
  const textSize = lg
    ? "sm:text-[61px] text-[40px] leading-[48px] sm:leading-[66px] font-semibold sm:mt-8"
    : "text-[40px] leading-[45px] mt-8";
  const paragraphSize = lg ? "sm:text-[25px]" : "text-[16px]";
  const background =
    bg === "orange"
      ? "bg-[#FF7F00] shadow-[-7px_7px_1px_#6A0DAD]"
      : "bg-[#6A0DAD] shadow-[-7px_7px_1px_#FF7F00]";
  const buttonBg = bg === "orange" ? "purple_white" : "orange";
  return (
    <div
      className={`relative ${dimensions} sm:my-10 my-4 p-6  rounded-2xl ${background} `}
    >
      {/* image */}
      <div className="h-[40%]">
        <img
          src={imgSrc ?? "/akon.svg"}
          className="object-cover w-full h-full"
          alt=""
        />
      </div>

      {/* title */}
      <h1
        className={`${textSize} font-[ClashDisplay] text-white text-glow-purple`}
      >
        {title}
      </h1>

      {/* paragraph */}
      <p className={`${paragraphSize} text-white/70 mt-2`}>{paragraph}</p>

      <div className="absolute bottom-6">
        <OTButton title={buttonText} bg={buttonBg} handleClick={handleClick} />
      </div>
    </div>
  );
};
export default OTCard;
