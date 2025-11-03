/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import SModal from "./SModal";
import ProductVariants from "../ProductVariants";
import MediaUpload from "../MediaUpload";
import { useCreateProduct } from "../../_services/product.service";

interface ProductForm {
  name: string;
  category: string;
  description: string;
  price: string;
  stock: string;
  deliveryFee: string;
  deliveryEstimate: string;
  deliveryTerms: string;
}

interface AddProductModalProps {
  closeModal: (value: boolean) => void;
}

const categories: { key: string; name: string }[] = [
  {
    key: "clothing",
    name: "Fashion",
  },
  {
    key: "others",
    name: "Others",
  },
];

const AddProductModal: React.FC<AddProductModalProps> = ({ closeModal }) => {
  const currency = "₦";

  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    deliveryFee: "",
    deliveryEstimate: "",
    deliveryTerms: "",
  });

  const { mutateAsync: createProduct, isPending } = useCreateProduct();

  const [variants, setVariants] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [previewData, setPreviewData] = useState<any>(null);

  const [productType, setProductType] = useState<string>("new");
  const [condition, setCondition] = useState<string>("");
  const [usageDuration, setUsageDuration] = useState<string>("");
  const [reasonForSelling, setReasonForSelling] = useState<string>("");

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildFinalData = () => ({
    ...formData,
    media,
    variants,
    productType,
    condition: productType === "used" ? condition : null,
    usageDuration: productType === "used" ? usageDuration : null,
    reasonForSelling: productType === "used" ? reasonForSelling : null,
  });

  const handleSubmit = () => {
    const finalData = buildFinalData();
    setPreviewData(finalData);
  };

  const handlePublish = async () => {
    const productData = buildFinalData();
    const FD = new FormData();

    FD.append("name", productData.name);
    FD.append("description", productData.description);
    FD.append("price", productData.price);
    FD.append("quantity", productData.stock);
    FD.append("category", productData.category);
    FD.append("delivery[fee]", productData.deliveryFee);
    FD.append("delivery[timeEstimate]", productData.deliveryEstimate);

    if (formData.deliveryTerms) {
      FD.append("delivery[terms]", productData.deliveryTerms);
    }

    if (variants && variants.length > 0) {
      FD.append("variants", JSON.stringify(productData.variants));
    }

    if (media && media.length > 0) {
      productData.media.forEach((mediaObj) => {
        if (mediaObj.file) {
          FD.append("productImages", mediaObj.file);
        }
      });
    }

    FD.append("productType", productData.productType?.toUpperCase());

    try {
      await createProduct(FD);

      for (const [key, value] of FD.entries()) {
        console.log(key, value);
      }

      closeModal(false);
    } catch {
      return;
    }
  };

  return (
    <SModal end>
      {!previewData ? (
        <div className="relative bg-white rounded-lg sm:p-6 pb-6 sm:w-[617px] h-[80vh] overflow-y-auto scrollbar-hide">
          <div className="flex top-[-1.5rem] bg-white py-5 justify-between items-center mb-8">
            <h2 className="text-[24px]">Add a new product</h2>
            <div
              className="cursor-pointer w-[28px] h-[28px] rounded-lg flex items-center justify-center bg-[#F5F5F5] border border-[#D4D4D4]"
              onClick={() => closeModal(false)}
            >
              X
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-6 px-4"
          >
            {/* Basic Info */}
            <div>
              <h3 className="text-[16px] mb-4 underline">Basic Info</h3>

              <label className="text-[10px]">Product name</label>
              <input
                name="name"
                type="text"
                placeholder="e.g. Men’s summer shirt"
                onChange={handleInput}
                value={formData.name}
                className="w-full border h-[40px] sm:px-6 px-2 py-2 border-[#D4D4D4] rounded text-sm"
              />

              <label className="text-[10px] mt-4">Product category</label>
              <select
                name="category"
                onChange={handleInput}
                value={formData.category}
                className="w-full border h-[40px] sm:px-6 px-2 py-2 border-[#D4D4D4] rounded text-[#5C5C5C] text-sm"
              >
                <option value="">Select a product category</option>
                {categories.map((category: any) => (
                  <option key={category.key} value={category.key}>
                    {category.name}
                  </option>
                ))}
              </select>

              <label className="text-[10px] flex justify-between mt-4">
                Description <span>{formData.description.length}/200</span>
              </label>
              <textarea
                name="description"
                placeholder="Write a short, catchy product summary"
                maxLength={200}
                onChange={handleInput}
                value={formData.description}
                className="w-full border h-[113px] sm:px-6 px-2  py-2 border-[#D4D4D4] rounded text-sm text-[#5C5C5C]"
              />
            </div>

            {/* Product Condition */}
            <div>
              <h3 className="text-[16px] mb-4 underline">Product Condition</h3>
              <label className="text-[10px]">
                Is this a new or used product?
              </label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full border h-[40px] sm:px-6 px-2 py-2 border-[#D4D4D4] rounded text-[#5C5C5C] text-sm"
              >
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>

            {productType === "used" && (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px]">
                    Condition of the product
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full border h-[40px] sm:px-6 px-2 py-2 border-[#D4D4D4] rounded text-[#5C5C5C] text-sm"
                  >
                    <option value="">Select condition</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px]">Usage duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 6 months, 2 years"
                    value={usageDuration}
                    onChange={(e) => setUsageDuration(e.target.value)}
                    className="w-full border h-[40px] sm:px-6 px-2 py-2 border-[#D4D4D4] rounded text-sm"
                  />
                </div>

                <div>
                  <label className="text-[10px]">Reason for selling</label>
                  <input
                    type="text"
                    placeholder="e.g. Upgraded, no longer needed"
                    value={reasonForSelling}
                    onChange={(e) => setReasonForSelling(e.target.value)}
                    className="w-full border h-[40px] sm:px-6 px-2  py-2 border-[#D4D4D4] rounded text-sm"
                  />
                </div>
              </div>
            )}

            {/* Pricing & Stock */}
            <div>
              <h3 className="text-[16px] mb-4 underline">
                Pricing & Stock quantity
              </h3>

              <label className="text-[10px]">Price per unit</label>
              <div className="relative">
                <p className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-gray-700">
                  {currency}
                </p>
                <input
                  name="price"
                  type="number"
                  min={1}
                  onChange={handleInput}
                  value={formData.price}
                  className="w-full border h-[40px] px-6 py-2 border-[#D4D4D4] rounded text-sm"
                />
              </div>

              <label className="text-[10px] mt-4">Stock quantity (unit)</label>
              <select
                name="stock"
                onChange={handleInput}
                value={formData.stock}
                className="w-full border h-[40px] sm:px-6 px-2 py-2 border-[#D4D4D4] rounded text-[#5C5C5C] text-sm"
              >
                <option value="">
                  Select quantity of the product available
                </option>
                <option value="1">1 units</option>
                <option value="10">10 units</option>
                <option value="50">50 units</option>
                <option value="100">100 units</option>
              </select>

              {/* Delivery Fee */}
              <label className="text-[10px] mt-4">Delivery fee</label>
              <input
                name="deliveryFee"
                type="text"
                placeholder="e.g. Free delivery"
                onChange={handleInput}
                value={formData.deliveryFee}
                className="w-full border h-[40px] sm:px-6 px-2 py-2 border-[#D4D4D4] rounded text-sm"
              />

              <label className="text-[10px] mt-4">Delivery time estimate</label>
              <select
                name="deliveryEstimate"
                onChange={handleInput}
                value={formData.deliveryEstimate}
                className="w-full border h-[40px] sm:px-6 px-2  py-2 border-[#D4D4D4] rounded text-[#5C5C5C] text-sm"
              >
                <option value="">Select delivery time estimate</option>
                <option value="1-3 days">1–3 days</option>
                <option value="3-5 days">3–5 days</option>
                <option value="1 week">1 week</option>
              </select>

              <label className="text-[10px] flex justify-between mt-4">
                Delivery terms{" "}
                <span className="text-[#5C5C5C]">(Optional)</span>
              </label>
              <textarea
                name="deliveryTerms"
                placeholder="Write a short, catchy product summary"
                maxLength={200}
                onChange={handleInput}
                value={formData.deliveryTerms}
                className="w-full border h-[113px] sm:px-6 px-2  py-2 border-[#D4D4D4] rounded mb-4 text-[#5C5C5C] text-sm"
              />
            </div>

            {/* Media Upload */}
            <MediaUpload onUpdateMedia={setMedia} />

            {/* Variants */}
            <ProductVariants onUpdateVariants={setVariants} />

            {/* Submit */}
            <div className="sticky w-full bottom-[-1.5rem]">
              <button
                type="submit"
                className="bg-[#6A0DAD] text-white w-full py-3 rounded font-medium hover:opacity-95 transition cursor-pointer"
              >
                Review product
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="relative bg-white rounded-lg sm:p-6 pb-6 sm:w-[617px] w-[70vw] h-[80vh] overflow-y-auto scrollbar-hide">
          <div className="flex gap-2 px-4 mt-4">
            <button
              onClick={handlePublish}
              disabled={isPending}
              className="flex-1 bg-[#6A0DAD] text-white py-2 rounded"
            >
              {isPending ? "Creating..." : "Confirm & Create"}
            </button>
          </div>
        </div>
      )}
    </SModal>
  );
};

export default AddProductModal;
