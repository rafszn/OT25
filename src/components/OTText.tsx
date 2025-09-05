const OTText = ({
  bg = "purple",
  title,
}: {
  bg: "purple" | "white_purple" | "white_orange";
  title: string;
}) => {
  const style =
    bg === "purple"
      ? "text-[#6A0DAD] text-glow-orange"
      : bg === "white_purple"
      ? "text-white text-glow-purple"
      : "text-white text-glow-orange";
  return (
    <h1
      className={`sm:px-0 sm:text-[60px] text-[40px] font-[ClashDisplay] font-bold ${style} sm:leading-[70px] leading-[45px] sm:mb-4`}
    >
      {title}
    </h1>
  );
};
export default OTText;
