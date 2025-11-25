import { useState } from "react";

export default function FaceSwap() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [targetImage, setTargetImage] = useState<string | null>(null);

  const handleSourceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setSourceImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleTargetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setTargetImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Face Swap (Image-to-Image)</h2>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Upload a photo containing the face you want to extract and upload a
        second image where that face should be placed. Our AI will seamlessly
        blend the face from Image A into Image B.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl bg-white border border-gray-200 p-6 rounded-xl shadow-sm">

        {/* LEFT SIDE — Source Face Image */}
        <div>
          <label className="block mb-2 font-semibold text-gray-800">
            1️⃣ Upload Source Image (Face to Extract)
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleSourceUpload}
            className="w-full mb-4 border border-gray-300 rounded-md px-3 py-2"
          />

          {sourceImage ? (
            <img
              src={sourceImage}
              alt="Source Face"
              className="w-full h-auto rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              No source image uploaded
            </div>
          )}
        </div>

        {/* RIGHT SIDE — Target Image */}
        <div>
          <label className="block mb-2 font-semibold text-gray-800">
            2️⃣ Upload Target Image (Face Will Be Replaced Here)
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleTargetUpload}
            className="w-full mb-4 border border-gray-300 rounded-md px-3 py-2"
          />

          {targetImage ? (
            <img
              src={targetImage}
              alt="Target Image"
              className="w-full h-auto rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              No target image uploaded
            </div>
          )}
        </div>
      </div>

      <button
        disabled={!sourceImage || !targetImage}
        className={`mt-6 px-8 py-3 rounded-lg font-medium text-white ${
          sourceImage && targetImage
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Generate Face Swap
      </button>
    </>
  );
}
