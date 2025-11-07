import { toast } from "sonner";
import OTInput from "./OTInput";
import { useState } from "react";
import axios from "axios";

const Giveaway = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    ticketCode: "",
    hasTicket: "",
    sociallink: "",
    laptopReason: "",
    benefit: "",
    isImoState: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formData.lastName.trim()) return toast.error("Last name is required");
    if (!formData.firstName.trim())
      return toast.error("First name is required");

    if (!formData.email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://ot-server-juqv.onrender.com/v1/giveaway",
        formData
      );

      toast.success("email sent");

      setFormData({
        lastName: "",
        firstName: "",
        sociallink: "",
        email: "",
        ticketCode: "",
        hasTicket: "",
        laptopReason: "",
        benefit: "",
        isImoState: "",
        address: "",
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
          name="email"
          value={formData.email}
          label="Email Address"
          placeholder="Enter email"
          type="text"
          onChange={handleChange}
        />

        <div className="my-4">
          <p className="text-[16px] font-[ClashDisplay] font-medium">
            Have you gotten your ticket?
          </p>

          <select
            name="hasTicket"
            value={formData.hasTicket}
            onChange={handleChange}
            className="w-full text-[18px] h-[54px] px-4 rounded-lg bg-white shadow-[5px_5px_1px_#FF7F00] outline-none"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {formData.hasTicket === "yes" && (
          <>
            <OTInput
              label="Ticket Code"
              placeholder="Pls put in the ticket code..."
              type="text"
              name="ticketCode"
              value={formData.ticketCode}
              onChange={handleChange}
            />

            <OTInput
              name="laptopReason"
              label="Why do you need this laptop?"
              placeholder="Tell us why this laptop matters to you..."
              type="textarea"
              value={formData.laptopReason}
              onChange={handleChange}
            />

            <OTInput
              name="benefit"
              label="How will this laptop help you?"
              placeholder="Share how it’ll help you learn, work, or create"
              type="textarea"
              value={formData.benefit}
              onChange={handleChange}
            />

            <OTInput
              name="sociallink"
              value={formData.sociallink}
              label="Social Media Post Link"
              placeholder="Enter your post link"
              type="text"
              onChange={handleChange}
            />

            <div className="my-4">
              <p className="text-[16px] font-[ClashDisplay] font-medium">
                Are you based in Imo State?
              </p>

              <select
                name="isImoState"
                value={formData.isImoState}
                onChange={handleChange}
                className="w-full text-[18px] h-[54px] px-4 rounded-lg bg-white shadow-[5px_5px_1px_#FF7F00] outline-none"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {formData.isImoState === "yes" && (
              <OTInput
                label="If yes, Address?"
                placeholder="Pls input your home address..."
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            )}

            {formData.hasTicket === "yes" && (
              <button
                className="w-full text-[18px] mt-8 text-white font-medium h-[54px] px-4 rounded-lg bg-[#6A0DAD] shadow-[4px_4px_1px_#FF7F00] cursor-pointer"
                onClick={handleSubmit}
              >
                {loading ? "Submitting" : "Submit"}
              </button>
            )}
          </>
        )}

        {formData.hasTicket === "no" && (
          <p className="text-center text-red-500 font-bold italic">
            You are not eligible for a giveaway is you dont have a ticket.
          </p>
        )}
      </div>
    </div>
  );
};
export default Giveaway;
