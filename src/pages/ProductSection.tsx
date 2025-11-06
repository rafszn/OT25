import { useState } from "react";
import AddProductModal from "../components/modals/AddProduct";
import { useGetProducts } from "../_services/product.service";
import { AnimatePresence } from "framer-motion";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
  delivery: {
    fee: number;
  };
  variants: { type: string; values: string[] }[];
  images: { url: string }[];
}

export default function ProductsDashboard() {
  const { data: products, isLoading } = useGetProducts();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="sm:p-6 p-4 bg-white ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#6A0DAD]">Products</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-[#6A0DAD] text-white rounded"
        >
          Create Product
        </button>
      </div>

      <table className="w-full text-left border border-[#6A0DAD]">
        <thead className="bg-[#6A0DAD] text-white whitespace-nowrap">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Qty</th>
            <th className="p-3">Category</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products?.length > 0 &&
            products?.map((product: Product) => (
              <tr key={product._id} className="border-b whitespace-nowrap">
                <td className="p-3">{product.name}</td>
                <td className="p-3">₦{product.price.toLocaleString()}</td>
                <td className="p-3">{product.quantity}</td>
                <td className="p-3">{product.category}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <AnimatePresence mode="wait">
        {isOpen && <AddProductModal closeModal={setIsOpen} />}
      </AnimatePresence>
    </div>
  );
}
