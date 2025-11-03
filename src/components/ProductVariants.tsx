import { useState } from "react";
import { TbTrash } from "react-icons/tb";

const VARIANT_OPTIONS: Record<string, string[]> = {
  Colour: [
    "Red",
    "Yellow",
    "Green",
    "Black",
    "White",
    "Purple",
    "Orange",
    "Grey",
  ],
  Size: ["XS", "S", "M", "L", "XL"],
  Material: ["Cotton", "Linen", "Silk", "Denim"],
};

export interface VariantItem {
  type: string;
  values: string[];
}

interface ProductVariantsProps {
  onUpdateVariants: (variants: VariantItem[]) => void;
}

export default function ProductVariants({
  onUpdateVariants,
}: ProductVariantsProps) {
  const [variants, setVariants] = useState<VariantItem[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [customValue, setCustomValue] = useState<string>("");
  const [showVariantForm, setShowVariantForm] = useState<boolean>(false);

  const handleAddVariant = () => {
    if (!selectedType || selectedValues.length === 0) return;

    const existing = variants.find((v) => v.type === selectedType);
    if (existing) {
      existing.values = [...new Set([...existing.values, ...selectedValues])];
      setVariants([...variants]);
      onUpdateVariants([...variants]);
    } else {
      const updated = [
        ...variants,
        { type: selectedType, values: selectedValues },
      ];
      setVariants(updated);
      onUpdateVariants(updated);
    }

    setSelectedType("");
    setSelectedValues([]);
    setCustomValue("");
  };

  const handleRemoveVariant = (type: string) => {
    const updated = variants.filter((v) => v.type !== type);
    setVariants(updated);
    onUpdateVariants(updated);
  };

  const handleAddCustomValue = () => {
    if (customValue && !selectedValues.includes(customValue)) {
      setSelectedValues([...selectedValues, customValue]);
      setCustomValue("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] underline">Product variants</h3>
        <button
          className="cursor-pointer h-[34px] bg-[#F5F5F5] px-4 border border-[#D4D4D4] rounded-lg flex items-center justify-center text-sm"
          type="button"
          onClick={() => setShowVariantForm(!showVariantForm)}
        >
          Add variant
        </button>
      </div>

      {showVariantForm && (
        <div className="space-y-3 rounded">
          <div>
            <label className="block mb-1 text-[10px]">Variant type</label>
            <select
              className="w-full border h-[40px] sm:px-6 px-2 py-2 border-[#D4D4D4] rounded text-[#5C5C5C] text-sm"
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setSelectedValues([]);
              }}
            >
              <option value="">Select variant to add</option>
              {Object.keys(VARIANT_OPTIONS).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {selectedType && (
            <>
              <div>
                <label className="block mb-1 text-sm underline">
                  Variant value
                </label>
                <div className="flex flex-wrap gap-2 mb-4 mt-4 p-4 shadow-sm rounded-2xl">
                  {VARIANT_OPTIONS[selectedType].map((val) => (
                    <div
                      key={val}
                      className="flex items-center gap-2 text-sm w-full mb-2"
                    >
                      <input
                        type="checkbox"
                        value={val}
                        className="accent-[#6A0DAD] text-sm"
                        checked={selectedValues.includes(val)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setSelectedValues((prev) =>
                            checked
                              ? [...prev, val]
                              : prev.filter((v) => v !== val)
                          );
                        }}
                      />
                      {val}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add custom variant value"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    className="border border-[#D4D4D4] text-[10px] px-3 py-1 rounded w-[150px]"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomValue}
                    className="bg-gray-100 px-3 text-[10px] py-1 rounded hover:bg-gray-200"
                  >
                    Add
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddVariant}
                type="button"
                className="mt-3 px-4 py-2 bg-[#6A0DAD] text-white rounded"
              >
                Save Variant
              </button>
            </>
          )}
        </div>
      )}

      {variants.length > 0 && (
        <div className="space-y-4">
          {variants.map((variant) => (
            <div
              key={variant.type}
              className="flex items-start justify-between gap-4"
            >
              <div>
                <p className="font-medium text-[12px]">{variant.type}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {variant.values.map((val) => (
                    <span
                      key={val}
                      className="bg-gray-200 px-2 py-1 text-[10px] text-[#5C5C5C] rounded"
                    >
                      {val}
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveVariant(variant.type)}
                className="hover:underline"
              >
                <TbTrash
                  size={18}
                  className="hover:text-[#6A0DAD] cursor-pointer"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
