import OTInput from "../components/OTInput";

const Sponsor = () => {
  return (
    <div className="my-10">
      <div
        className="form sm:mx-25 bg-zinc-100 rounded-lg sm:p-10 p-4"
        style={{
          backgroundImage: "url('/left.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* input and label*/}
        <div className="sm:flex w-full sm:items-center gap-4">
          <div className="flex-1/2">
            <OTInput
              label="Last name"
              placeholder="Enter last name"
              type="text"
            />
          </div>
          <div className="flex-1/2">
            <OTInput
              label="First name"
              placeholder="Enter first name"
              type="text"
            />
          </div>
        </div>

        <OTInput
          label="Company Name"
          placeholder="Enter company name"
          type="text"
        />
        <OTInput
          label="Email Address"
          placeholder="Enter company name"
          type="text"
        />
        <OTInput
          label="Phone Number"
          placeholder="Enter company name"
          type="text"
        />
        <OTInput
          label="Additional Information"
          placeholder="Comment"
          type="textarea"
        />

        <button className="w-full text-[18px] text-white font-medium h-[54px] px-4 rounded-lg bg-[#6A0DAD] shadow-[4px_4px_1px_#FF7F00] cursor-pointer">
          Submit
        </button>
      </div>
    </div>
  );
};
export default Sponsor;
