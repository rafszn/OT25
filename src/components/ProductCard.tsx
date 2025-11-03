import { useNavigate } from "react-router-dom";
import type { Product } from "../pages/ProductSection";

const ProductCard = ({ product }: { product: Product }) => {
  const {
    _id,
    name,
    price,
    description,
    images: [first],
  } = product;
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };
  return (
    <div className="sm:w-[295px] w-[170px] sm:h-[504px] h-[333px] cursor-pointer">
      <div className="sm:w-[295px] w-[170px] sm:h-[298px] h-[172px]">
        <img
          src={first.url}
          className="w-[170px] sm:w-[295px] sm:h-[298px] h-[172px] object-cover rounded-lg"
          alt={name}
        />
      </div>
      <h1 className="font-[ClashDisplay] mt-3 font-bold sm:text-[23px] text-[16px] truncate capitalize">
        {name}
      </h1>

      <p className="sm:text-[18px] text-[12px] font-light mb-2">
        {description}
      </p>

      <p className="font-bold sm:text-[23px] text-[16px]">
        ₦{price?.toLocaleString()}
      </p>

      <button
        className="h-[50px] ${width} ml-[-3px] mt-2 px-8 rounded-xl bg-[#6A0DAD] text-white shadow-[4px_4px_1px_#FF7F00] cursor-pointer sm:text-[20px] text-[16px] font-semibold w-full"
        onClick={() => handleNavigate(_id)}
      >
        Buy now
      </button>
    </div>
  );
};
export default ProductCard;
