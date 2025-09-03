import { useState } from "react";
import OTInput from "../components/OTInput";
import axios from "axios";
import { toast } from "sonner";

const Sponsor = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 3️⃣ Handle submit
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formData.lastName.trim()) {
      toast.error("Last name is required");
      return;
    }
    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!formData.phoneNumber.trim()) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://ot-server-juqv.onrender.com/v1/sponsor",
        formData
      );

      toast.success("email sent");

      setFormData({
        lastName: "",
        firstName: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        additionalInfo: "",
      });
    } catch {
      toast.error("An error occurred, try again");
    } finally {
      setLoading(false);
    }
  };
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
              name="lastName"
              value={formData.lastName}
              label="Last name"
              placeholder="Enter last name"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="flex-1/2">
            <OTInput
              name="firstName"
              label="First name"
              placeholder="Enter first name"
              value={formData.firstName}
              type="text"
              onChange={handleChange}
            />
          </div>
        </div>

        <OTInput
          label="Company Name"
          placeholder="Enter company name"
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />
        <OTInput
          name="email"
          value={formData.email}
          label="Email Address"
          placeholder="Enter company name"
          type="text"
          onChange={handleChange}
        />
        <OTInput
          name="phoneNumber"
          label="Phone Number"
          placeholder="Enter company name"
          type="text"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <OTInput
          name="additionalInfo"
          label="Additional Information"
          placeholder="Comment"
          type="textarea"
          value={formData.additionalInfo}
          onChange={handleChange}
        />

        <button
          className="w-full text-[18px] text-white font-medium h-[54px] px-4 rounded-lg bg-[#6A0DAD] shadow-[4px_4px_1px_#FF7F00] cursor-pointer"
          onClick={handleSubmit}
        >
          {loading ? "Submitting" : "Submit"}
        </button>
      </div>
    </div>
  );
};
export default Sponsor;
