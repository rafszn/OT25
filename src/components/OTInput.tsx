interface InputProps {
  placeholder: string;
  value?: string;
  type: "text" | "textarea";
  name?: string;
  label?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const OTInput = ({
  placeholder,
  value,
  type,
  label,
  onChange,
  name,
}: InputProps) => {
  return (
    <div className="my-4">
      <p className="text-[16px] font-[ClashDisplay] font-medium">{label}</p>

      {type === "text" ? (
        <input
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          className="w-full text-[18px] h-[54px] px-4 rounded-lg bg-white shadow-[5px_5px_1px_#FF7F00] outline-none"
          onChange={onChange}
        />
      ) : (
        <textarea
          name={name}
          className="w-full text-[18px]  p-4 rounded-lg bg-white shadow-[5px_5px_1px_#FF7F00] outline-none"
          rows={4}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        ></textarea>
      )}
    </div>
  );
};
export default OTInput;
