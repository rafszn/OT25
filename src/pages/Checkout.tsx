import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { RiLoader2Fill } from "react-icons/ri";
import { useNavigate, useSearchParams } from "react-router-dom";
import Confetti from "react-confetti";
import OTButton from "../components/OTButton";

const verify = async (reference: string) => {
  const res = await axios.get(
    `https://ot-server-juqv.onrender.com/v1/checkout/callback?reference=${reference}`
  );
  return res.data;
};
const Checkout = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth - 50,
        height: window.innerHeight,
      });
    };
    handleResize(); // set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(window.innerWidth);

  // const { mutate: verifyPayment } = useVerifyPayment({
  //   onSuccess: (data) => {
  //     setLoading(false);
  //     if (data.paymentStatus !== "success") {
  //       setSuccess(false);
  //       return;
  //     }
  //     setLoading(false);
  //     setSuccess(true);
  //   },
  //   onError: (error) => {
  //     const msg =
  //       error?.response?.data?.message || "Payment verification failed.";
  //     console.error("Payment verification error:", msg);
  //     setLoading(false);
  //     setSuccess(false);
  //   },
  // });

  useEffect(() => {
    const handleVerify = async (ref: string) => {
      try {
        const res = await verify(ref);
        setLoading(false);
        if (res.paymentStatus !== "success") {
          setSuccess(false);
          return;
        }
        setLoading(false);
        setSuccess(true);
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;

        const msg =
          error?.response?.data?.message || "Payment verification failed.";
        console.error("Payment verification error:", msg);
        setLoading(false);
        setSuccess(false);
      }
    };
    if (reference) {
      handleVerify(reference);
    } else {
      setLoading(false);
      setSuccess(false);
    }
  }, [reference]);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen ">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <RiLoader2Fill className="animate-spin w-12 h-12 text-[#9f0101] mx-auto" />
            <h1 className="text-xl font-semibold mt-4">
              Processing your payment...
            </h1>
            <p className="text-gray-500 mt-2">
              Please wait while we confirm your transaction with Paystack.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Do not close this page. This usually takes less than 10 seconds.
            </p>
          </div>
        </div>
      ) : success ? (
        <div className="w-full">
          <Confetti width={windowSize.width} height={windowSize.height} />

          <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center relative">
              <h1 className="sm:text-2xl font-bold text-gray-700 ">
                🎉 Payment Success!
              </h1>
              <p className="text-[12px] sm:text-base text-gray-500 mt-2">
                Your will recieve an email with your ticket(s).
              </p>
              <div className="mt-4">
                <OTButton
                  title="Back to home"
                  bg="purple"
                  handleClick={() => navigate("/")}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <h1 className="text-2xl font-bold text-red-600">
              ❌ Payment Failed
            </h1>
            <p className="text-gray-500 mt-2">
              Unfortunately, we couldn't verify your payment. Please try again.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Checkout;
