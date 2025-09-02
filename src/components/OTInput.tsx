interface InputProps {
  placeholder: string;
  value?: string;
  type: "text" | "textarea";
  label: string;
}

const OTInput = ({ placeholder, value, type, label }: InputProps) => {
  return (
    <div className="my-4">
      <p className="text-[16px] font-[ClashDisplay] font-medium">{label}</p>

      {type === "text" ? (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          className="w-full text-[18px] h-[54px] px-4 rounded-lg bg-white shadow-[5px_5px_1px_#FF7F00]"
        />
      ) : (
        <textarea
          className="w-full text-[18px]  p-4 rounded-lg bg-white shadow-[5px_5px_1px_#FF7F00]"
          rows={4}
          value={value}
          placeholder={placeholder}
        ></textarea>
      )}
    </div>
  );
};
export default OTInput;
