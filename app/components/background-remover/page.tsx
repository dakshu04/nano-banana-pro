export default function BackgroundRemover() {
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Background Removal</h2>
            <p className="text-gray-700 mb-4">
              Remove the background from any image instantly.
            </p>

            <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-sm max-w-3xl">
              <label className="block mb-2 font-semibold">Upload Image:</label>
              <input type="file" accept="image/*" className="w-full mb-4" />

              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium">
                Remove Background
              </button>
            </div>
          </>
    )
}