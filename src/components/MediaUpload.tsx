import { useState } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { toast } from "sonner";

export interface PreviewItem {
  file: File;
  url: string;
}

interface MediaUploadProps {
  onUpdateMedia: (media: PreviewItem[] | File[]) => void;
}

export default function MediaUpload({ onUpdateMedia }: MediaUploadProps) {
  const [previews, setPreviews] = useState<PreviewItem[]>([]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const total = previews.length + files.length;

    if (total > 6) {
      toast.error("You can only upload up to 6 images");
      return;
    }

    const newPreviews: PreviewItem[] = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const updatedPreviews = [...previews, ...newPreviews];
    setPreviews(updatedPreviews);
    onUpdateMedia(updatedPreviews);
  };

  const handleAddMoreClick = () => {
    const input = document.getElementById(
      "media-upload-input"
    ) as HTMLInputElement | null;
    input?.click();
  };

  const handleRemove = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    onUpdateMedia(updatedPreviews.map((item) => item.file));
  };

  return (
    <div className="mb-8">
      <h3 className="text-[16px] mb-2 underline">Media upload</h3>

      {previews.length === 0 ? (
        <label
          htmlFor="media-upload-input"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-[200px] cursor-pointer text-center text-sm text-gray-500"
        >
          <div className="flex flex-col items-center">
            <div className="text-2xl w-[56px] h-[56px] flex items-center justify-center rounded-full bg-[#F0F2F5] mb-4">
              <SlCloudUpload size={28} />
            </div>
            <p className="text-[14px]">
              <span className="text-red-700 font-medium">Click to upload</span>{" "}
              or drag and drop
            </p>
            <p className="text-[12px]">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>
          <input
            type="file"
            id="media-upload-input"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFilesChange}
          />
        </label>
      ) : (
        <div className="flex gap-4 flex-wrap">
          {previews.map((item, index) => (
            <div
              key={index}
              className="relative w-[60px] h-[60px] rounded-lg overflow-hidden"
            >
              <img
                src={item.url}
                alt={`preview-${index}`}
                className="object-cover w-full h-full rounded"
              />
              <button
                onClick={() => handleRemove(index)}
                type="button"
                className="absolute top-[-5px] right-[-5px] bg-white text-red-600 border border-gray-300 rounded-full w-5 h-5 text-xs"
              >
                ×
              </button>
            </div>
          ))}

          {previews.length < 6 && (
            <>
              <div
                onClick={handleAddMoreClick}
                className="w-[60px] h-[60px] border border-dashed border-gray-400 flex items-center justify-center cursor-pointer text-xl  rounded-lg"
              >
                +
              </div>
              <input
                type="file"
                id="media-upload-input"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFilesChange}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
