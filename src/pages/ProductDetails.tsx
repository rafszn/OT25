import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { useGetSingleProduct } from "../_services/product.service";
import { useState } from "react";
import type { Product } from "./ProductSection";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetSingleProduct(id ?? "") as {
    data: Product;
    isLoading: boolean;
  };

  const { name, description, images, price } = product ?? {};
  const productId = product?._id;

  const [isOn, setIsOn] = useState(true);
  const [number, setNumber] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  // const { mutateAsync: AddToCart, isPending } = useAddToCart();

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
  };

  const imageUrl = product?.images[number]?.url || "/shirt.png";
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
    const payload = {
      productId: productId,
      quantity,
      pickup: isOn,
      selectedVariants: selectedVariants ?? {},
    };

    console.log(payload);
    try {
      // await AddToCart({
      //   productId: product?._id,
      //   quantity,
      //   pickup: isOn,
      //   selectedVariants: selectedVariants ?? {},
      // });
    } catch {
      return;
    }
  }

  const handleVariantSelect = (type: string, value: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [type.toLowerCase()]: value.toLowerCase(),
    }));
  };

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <Container>
      <div className="product_detail sm:p-0 px-4">
        <div className="sm:flex sm:gap-6 sm:my-20 my-10 items-center ">
          {/* images */}
          <div className="flex-1/2 flex sm:flex-row flex-col-reverse   gap-2 sm:h-[529px] h-[483px]">
            <div className="flex-[0.3] flex items-center sm:flex-col flex-row gap-2 gap-y-[0.9rem]">
              {images
                .slice(0, 3)
                .map((image: { url: string }, index: number) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Product image ${index + 1}`}
                    title={number === index ? "in view" : ""}
                    className={
                      number === index
                        ? "active border-3 border-red-700 cursor-pointer sm:h-[167px] h-[111px] sm:w-[167px] w-[111px] object-cover rounded-lg"
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
                ₦{price.toLocaleString()}
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

              {totalQuantity > 0 && (
                <div className="switch sm:mt-8 mt-6 flex items-center sm:gap-3 gap-[0.3rem]">
                  <label className="red-switch-container">
                    <input
                      type="checkbox"
                      checked={isOn}
                      onChange={handleToggle}
                      className="red-switch-input"
                    />
                    <span
                      className={`red-switch-slider ${isOn ? "on" : ""}`}
                    ></span>
                  </label>

                  <p className="sm:text-[16px] text-[10px]">
                    Pickup package at the event
                  </p>
                </div>
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
    </Container>
  );
};
export default ProductDetails;

{
  /* <div className="flex flex-wrap">
                <p className="sm:h-[44px] h-[41px] flex items-center px-6  rounded-[5rem] m-2 text-[14px] cursor-pointer  bg-black text-white">
                  Small
                </p>
                <p className="sm:h-[44px] h-[41px] flex items-center px-6 bg-[#F0F0F0] rounded-[5rem] m-2 text-[14px] cursor-pointer">
                  Medium
                </p>{" "}
                <p className="sm:h-[44px] h-[41px] flex items-center px-6 bg-[#F0F0F0] rounded-[5rem] m-2 text-[14px] cursor-pointer">
                  Large
                </p>{" "}
                <p className="sm:h-[44px] h-[41px] flex items-center px-6 bg-[#F0F0F0] rounded-[5rem] m-2 text-[14px] cursor-pointer">
                  X-Large
                </p>{" "}
                <p className="sm:h-[44px] h-[41px] flex items-center px-6 bg-[#F0F0F0] rounded-[5rem] m-2 text-[14px] cursor-pointer">
                  XX-Large
                </p>
              </div> */
}
