import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { useGetSingleProduct } from "../_services/product.service";
import { useEffect, useState } from "react";
import type { Product } from "./ProductSection";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import OTInput from "../components/OTInput";
import { useCheckoutShop } from "../_services/checkout.service";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetSingleProduct(id ?? "") as {
    data: Product;
    isLoading: boolean;
  };

  const [payLoad, setPayLoad] = useState<{
    productId: string;
    quantity: number;
    selectedVariants: Record<string, string>;
    deliveryFee: number;
    price: number;
  } | null>(null);

  const { name, description, images, price } = product ?? {};
  const productId = product?._id;

  const [number, setNumber] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  const imageUrl = product?.images?.[number]?.url || "/shirt.png";
  const totalQuantity = product?.quantity;

  const increaseQuantity = () => {
    if (quantity < totalQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1);
    }
  };

  async function handleAddToCart() {
    if (quantity === 0) {
      toast.error("Please select at least one item to proceed.");
      return;
    }

    const payload = {
      productId: productId,
      quantity,
      price: price,
      deliveryFee: product?.delivery?.fee || 0,
      selectedVariants: selectedVariants ?? {},
    };

    setPayLoad(payload);
  }

  const handleVariantSelect = (type: string, value: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [type?.toLowerCase()]: value.toLowerCase(),
    }));
  };

  if (isLoading && !product) {
    return <>Loading...</>;
  }
  return (
    <Container>
      <div className="product_detail sm:p-0 px-4">
        <div className="sm:flex sm:gap-6 sm:my-20 my-10 items-center ">
          {/* images */}
          <div className="flex-1/2 flex sm:flex-row flex-col-reverse  gap-2 sm:h-[529px] h-[483px]">
            <div className="flex-[0.3] flex items-center sm:flex-col justify-center flex-row gap-2 gap-y-[0.9rem]">
              {images &&
                images.length > 0 &&
                images
                  .slice(0, 3)
                  .map((image: { url: string }, index: number) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`Product image ${index + 1}`}
                      title={number === index ? "in view" : ""}
                      className={
                        number === index
                          ? "active border-2 cursor-pointer sm:h-[167px] h-[111px] sm:w-[167px] w-[111px] object-cover rounded-lg"
                          : "cursor-pointer sm:h-[167px] h-[111px] sm:w-[167px] w-[111px] object-cover rounded-lg"
                      }
                      onClick={() => setNumber(index)}
                    />
                  ))}
            </div>

            <div className="flex-[0.7]">
              <img
                src={imageUrl}
                className="sm:h-[529px] h-[358px] w-full object-cover rounded-lg"
                alt=""
              />
            </div>
          </div>

          {/* details */}
          <div className="flex-1/2 sm:h-[529px] sm:mt-0 mt-5 flex items-center">
            <div className="w-full">
              <h1 className="sm:text-[48px] text-[28px] truncate font-[ClashDisplay] font-bold capitalize">
                {name}
              </h1>

              <p className="sm:text-[32px] text-[20px] font-bold sm:mt-6 mt-3">
                ₦{price?.toLocaleString()}
              </p>
              <p className="text-[16px] mt-2 font-light">{description}</p>

              <hr className="text-[#F0F0F0] sm:my-6 my-3" />

              {product?.variants?.map((variant) => {
                return (
                  <div key={variant.type} className="mb-2">
                    <p className="font-medium text-[12px] sm:text-[20px] capitalize">
                      {variant.type === "Colour"
                        ? "available colors"
                        : variant.type === "size"
                        ? "size"
                        : variant.type.toLowerCase()}
                    </p>

                    <div className="flex gap-2 flex-wrap">
                      {variant.values.map((value) => {
                        const lowerValue = value.toLowerCase();

                        if (variant.type.toLowerCase() === "colour") {
                          return (
                            <div
                              key={value}
                              className={`color border cursor-pointer ${
                                selectedVariants[
                                  variant.type.toLowerCase()
                                ]?.toLowerCase() === lowerValue
                                  ? "!ring-2 !ring-red-600 ring-offset-2 ring-offset-white"
                                  : ""
                              }`}
                              style={{
                                backgroundColor: lowerValue,
                                border:
                                  lowerValue === "white" ||
                                  lowerValue === "#ffffff" ||
                                  lowerValue === "rgb(255, 255, 255)"
                                    ? "1px solid #ccc"
                                    : "none",
                              }}
                              title={lowerValue}
                              onClick={() =>
                                handleVariantSelect(variant.type, lowerValue)
                              }
                            />
                          );
                        }

                        return (
                          <div
                            key={value}
                            className={`sm:h-[44px] h-[41px] flex items-center px-6 rounded-[5rem] m-2 text-[14px] cursor-pointer ${
                              selectedVariants[
                                variant.type.toLowerCase()
                              ]?.toLowerCase() === lowerValue
                                ? "!bg-black text-white"
                                : "bg-[#F0F0F0] text-black"
                            }`}
                            onClick={() =>
                              handleVariantSelect(variant.type, lowerValue)
                            }
                          >
                            {value}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* <p className="font-light">Choose size</p> */}

              {totalQuantity > 0 && quantity >= totalQuantity && (
                <p className="warning-text pt-3 text-[#9f0101]">
                  Only {totalQuantity} items left in stock!
                </p>
              )}

              {totalQuantity === 0 && (
                <p className="warning-text pt-3 text-[#9f0101] text-xl">
                  this item is out of stock!
                </p>
              )}

              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="border border-[#6A0DAD] rounded-lg sm:h-[38px] h-[37px] sm:w-[104px] w-[100px] flex items-center justify-between sm:p-2 p-[2px] px-1 self-end mr-[2px] sm:mr-0">
                  <p
                    className="sm:w-[18px] sm:h-[18px] w-[14px] h-[14px] rounded bg-white/20 flex items-center justify-center cursor-pointer"
                    onClick={decreaseQuantity}
                  >
                    -
                  </p>
                  <p className="sm:text-lg text-[14px]">{quantity}</p>
                  <p
                    className="sm:w-[18px] sm:h-[18px] w-[14px] h-[14px] bg-[#6A0DAD] text-white rounded flex items-center justify-center cursor-pointer"
                    onClick={increaseQuantity}
                  >
                    +
                  </p>
                </div>

                <button
                  className="sm:h-[50px] h-[37px] ${width} ml-[-3px] mt-2 px-8 rounded-xl bg-[#6A0DAD] text-white shadow-[4px_4px_1px_#FF7F00] cursor-pointer sm:text-[20px] text-[16px] font-semibold w-full"
                  onClick={handleAddToCart}
                >
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* others */}

        <h1 className="text-glow-orange-purple sm:text-[60px] text-[34px] font-bold text-center my-10">
          You might also like
        </h1>
      </div>

      <AnimatePresence mode="wait">
        {payLoad && (
          <CheckoutModal
            isOpen={!!payLoad}
            onClose={() => setPayLoad(null)}
            payload={payLoad}
          />
        )}
      </AnimatePresence>
    </Container>
  );
};
export default ProductDetails;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  payload: {
    productId: string;
    price: number;
    quantity: number;
    selectedVariants: Record<string, string>;
    deliveryFee: number;
  };
}

const CheckoutModal: React.FC<ModalProps> = ({ isOpen, onClose, payload }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pickupOnEventDay, setPickupOnEventDay] = useState(false);

  const CUTOFF = new Date("2025-11-21");
  const now = new Date();
  const isAfterCutoff = now > CUTOFF;

  useEffect(() => {
    if (isAfterCutoff) {
      setPickupOnEventDay(true);
    }
  }, [isAfterCutoff]);

  const { mutateAsync: checkoutShop, isPending: loading } = useCheckoutShop();

  if (!isOpen) return null;

  const subTotal = payload.price * payload.quantity;
  const total = pickupOnEventDay ? subTotal : subTotal + payload.deliveryFee;

  const handleToggle = () => {
    if (isAfterCutoff) return;
    const newValue = !pickupOnEventDay;
    setPickupOnEventDay(newValue);
  };

  const handlePay = async () => {
    if (
      !address.trim() ||
      !phone.trim() ||
      !state.trim() ||
      !city.trim() ||
      !firstName.trim() ||
      !lastName.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      address,
      phone,
      state,
      city,
      pickupOnEventDay,
      product: {
        productId: payload.productId,
        quantity: payload.quantity,
        selectedVariants: payload.selectedVariants,
      },
    };

    await checkoutShop(data);
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[0.3rem] z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl p-6 w-[90%] h-[70vh] overflow-scroll max-w-[800px] shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          backgroundImage: "url('/left.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="sm:text-[30px] text-[20px] font-bold mb-4 font-[ClashDisplay]">
          Checkout Information
        </h2>

        <div className="p-4  rounded-2xl bg-[#F9F9F9]">
          <h2 className="sm:text-[24px] text-[15px] font-mediuma font-[ClashDisplay]">
            Delivery Information
          </h2>
          <form className="space-y-3">
            <div className="grid sm:grid-cols-2 sm:gap-4">
              <OTInput
                label="First Name"
                placeholder="First Name"
                value={firstName}
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <OTInput
                label="Last Name"
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <OTInput
              label="Valid Email"
              placeholder="A valid email address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <OTInput
              label="Contact Address"
              placeholder="Enter address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <OTInput
              label="Phone Number"
              placeholder="Enter phone number"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="grid sm:grid-cols-2 sm:gap-4">
              <OTInput
                label="State of Residence"
                placeholder="Enter State"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <OTInput
                label="City"
                placeholder="Enter city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="switch sm:mt-8 mt-6 flex items-center sm:gap-3 gap-[0.3rem]">
              <label className="red-switch-container">
                <input
                  type="checkbox"
                  checked={pickupOnEventDay}
                  onChange={handleToggle}
                  className="red-switch-input disabled:cursor-not-allowed"
                  disabled={isAfterCutoff}
                />
                <span
                  className={`red-switch-slider ${
                    pickupOnEventDay ? "on" : ""
                  }`}
                ></span>
              </label>

              {pickupOnEventDay ? (
                <p className="sm:text-[16px] text-[10px]">
                  Merchandise delivered to you on day of event
                </p>
              ) : (
                <p className="sm:text-[16px] text-[10px]">
                  Merchandise delivered to you{" "}
                  <span className="italic">(one week after purchase)</span>
                </p>
              )}
            </div>

            <p className="text-[#FF8D28] text-[14px] italic mt-4">
              All purchases made after 21st Nov, will be received on the day of
              the event!
            </p>

            <div className="mt-14">
              <h1 className="font-[ClashDisplay] sm:text-[24px] text-[15px]">
                Order Summary
              </h1>

              <div className="flex items-center justify-between my-2">
                <p>Subtotal</p>
                <p className="font-bold">₦{subTotal.toLocaleString()}</p>
              </div>

              <div className="flex items-center justify-between my-2">
                <p>Delivery</p>
                <p className="font-bold">
                  ₦
                  {pickupOnEventDay ? 0 : payload.deliveryFee?.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between my-8">
                <p className="font-bold">Total</p>
                <p className="font-bold">₦{total.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePay}
                className="px-4 py-2 bg-[#6A0DAD] text-white rounded cursor-pointer shadow-[4px_4px_1px_#FF7F00]"
              >
                {loading ? "Processing..." : "Proceed"}
              </button>
            </div>
            <i className="text-[10px]">secured by paystack</i>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};
