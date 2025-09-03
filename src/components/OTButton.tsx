type styleProps = {
  bgColor: string;
  textColor: string;
  outlineColor: string;
} | null;

interface ChildrenProps {
  title: string;
  bg?: "white" | "orange" | "purple" | "purple_white";
  lg?: boolean;
  handleClick?: () => void;
}

const OTButton = ({
  title,
  bg = "white",
  lg = false,
  handleClick,
}: ChildrenProps) => {
  const style: styleProps =
    bg === "white"
      ? {
          bgColor: "bg-white",
          outlineColor: "shadow-[4px_4px_1px_#FF7F00]",
          textColor: "text-[#6A0DAD]",
        }
      : bg === "orange"
      ? {
          bgColor: "bg-[#FF7F00]",
          outlineColor: "shadow-[4px_4px_1px_#ffffff]",
          textColor: "text-white",
        }
      : bg === "purple"
      ? {
          bgColor: "bg-[#6A0DAD]",
          outlineColor: "shadow-[4px_4px_1px_#FF7F00]",
          textColor: "text-white",
        }
      : bg === "purple_white"
      ? {
          bgColor: "bg-[#6A0DAD]",
          outlineColor: "shadow-[4px_4px_1px_#ffffff]",
          textColor: "text-white",
        }
      : null;

  const width = lg ? "w-[260px]" : "";
  return (
    <button
      className={`h-[50px] ${width} px-8 rounded-xl ${style?.bgColor} ${style?.textColor} ${style?.outlineColor} cursor-pointer sm:text-[20px] text-[16px] font-semibold`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
export default OTButton;
