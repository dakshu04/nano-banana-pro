export default function HeadShotGenerator() {
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">AI Headshot Generator</h2>
            <p className="text-gray-700 mb-4">
              Upload your photo and generate studio-quality portraits.
            </p>

            <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-sm max-w-3xl">
              <label className="block mb-2 font-semibold">Upload Face Image:</label>
              <input type="file" accept="image/*" className="w-full mb-4" />

              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-md font-medium">
                Generate Headshots
              </button>
            </div>
          </>
    )
}