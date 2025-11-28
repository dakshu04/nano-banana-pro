// "use client";
// import { useState } from "react";

// export default function HeadShotGenerator() {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [activeStyle, setActiveStyle] = useState("Corporate");

//   const styles = [
//     { id: "Corporate", emoji: "👔", label: "Corporate" },
//     { id: "Casual", emoji: "☕", label: "Casual" },
//     { id: "Creative", emoji: "🎨", label: "Creative" },
//   ];

//   const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => setSelectedImage(reader.result as string);
//     reader.readAsDataURL(file);
//   };

//   const handleGenerate = () => {
//     if (!selectedImage) return;
//     setLoading(true);
//     // Simulate generation
//     setTimeout(() => setLoading(false), 3000);
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto">
      
//       {/* HEADER */}
//       <div className="mb-10 text-center lg:text-left">
//         <h2 className="text-3xl font-black text-stone-800 tracking-tight">
//            AI Professional Headshots
//         </h2>
//         <p className="text-stone-500 mt-2 text-lg">
//            Upload a selfie and get studio-quality portraits in seconds.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
//         {/* LEFT COLUMN: CONTROLS (5 Cols) */}
//         <div className="lg:col-span-5 space-y-8">
            
//             {/* 1. UPLOAD CARD */}
//             <div className="bg-[#FFFDF7] border border-stone-200 p-1 rounded-3xl shadow-sm">
//                 <label className="block group cursor-pointer relative w-full aspect-[4/3] rounded-[1.3rem] overflow-hidden bg-white border-2 border-dashed border-stone-300 hover:border-yellow-400 transition-all">
                    
//                     <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                    
//                     {selectedImage ? (
//                         <div className="w-full h-full relative">
//                             <img src={selectedImage} alt="Upload" className="w-full h-full object-cover" />
//                             <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                                 <span className="bg-white/90 text-stone-800 font-bold px-4 py-2 rounded-full shadow-lg">Change Photo</span>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
//                             <div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" /></svg>
//                             </div>
//                             <div>
//                                 <p className="font-bold text-stone-700 text-lg">Upload Selfie</p>
//                                 <p className="text-sm text-stone-400">JPG or PNG</p>
//                             </div>
//                         </div>
//                     )}
//                 </label>
//             </div>

//             {/* 2. STYLE SELECTOR */}
//             <div>
//                 <label className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3 block">Select Style</label>
//                 <div className="grid grid-cols-3 gap-3">
//                     {styles.map((style) => (
//                         <button
//                             key={style.id}
//                             onClick={() => setActiveStyle(style.id)}
//                             className={`py-3 rounded-xl font-medium text-sm transition-all duration-200 border-2 flex flex-col items-center gap-1
//                                 ${activeStyle === style.id 
//                                     ? "border-yellow-400 bg-yellow-50 text-stone-800 shadow-md transform scale-105" 
//                                     : "border-transparent bg-white text-stone-500 hover:bg-stone-50"
//                                 }
//                             `}
//                         >
//                             <span className="text-xl">{style.emoji}</span>
//                             {style.label}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* 3. ACTION BUTTON */}
//             <button
//                 onClick={handleGenerate}
//                 disabled={!selectedImage || loading}
//                 className={`w-full py-4 px-6 rounded-2xl font-bold text-lg text-stone-900 shadow-xl shadow-orange-100 transition-all duration-300
//                 ${!selectedImage || loading
//                     ? "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
//                     : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-orange-200 hover:scale-[1.02] active:scale-[0.98]"
//                 }`}
//             >
//                 {loading ? "Developing Photos..." : "Generate Headshots ✨"}
//             </button>
//         </div>


//         {/* RIGHT COLUMN: PREVIEW (7 Cols) */}
//         <div className="lg:col-span-7">
//             <div className="bg-white border border-stone-100 rounded-[2rem] p-8 shadow-2xl shadow-stone-200/50 min-h-[500px] flex flex-col">
                
//                 <div className="flex items-center justify-between mb-6">
//                     <h3 className="font-bold text-stone-800 text-lg">Studio Results</h3>
//                     <div className="flex gap-1">
//                         <div className="w-3 h-3 rounded-full bg-red-400"/>
//                         <div className="w-3 h-3 rounded-full bg-yellow-400"/>
//                         <div className="w-3 h-3 rounded-full bg-green-400"/>
//                     </div>
//                 </div>

//                 {/* EMPTY / LOADING / RESULT STATE */}
//                 <div className="flex-1 rounded-2xl bg-stone-50 border-2 border-dashed border-stone-200 flex items-center justify-center relative overflow-hidden">
                    
//                     {loading && (
//                         <div className="absolute inset-0 bg-stone-900/5 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
//                             <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"/>
//                             <p className="mt-4 font-bold text-stone-600 animate-pulse">AI is adjusting lighting...</p>
//                         </div>
//                     )}

//                     <div className="text-center p-8">
//                          <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
//                             <span className="text-4xl grayscale opacity-30">📸</span>
//                          </div>
//                          <p className="text-stone-400 font-medium">
//                             {loading ? "Generating..." : "Your professional photos will appear here"}
//                          </p>
//                     </div>

//                 </div>

//             </div>
//         </div>

//       </div>
//     </div>
//   );
// }

"use client";

export default function HeadShotGenerator() {
  return (
    <div className="relative flex items-center justify-center min-h-[600px] md:min-h-[700px]">
      
      {/* BACKGROUND AURA */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-yellow-300/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-orange-300/30 blur-[140px] rounded-full" />
      </div>

      {/* FLOATING BANANAS */}
      <div className="absolute top-12 left-10 animate-float-slow opacity-60 text-4xl select-none pointer-events-none">
        🍌
      </div>
      <div className="absolute bottom-16 right-14 animate-float-medium opacity-60 text-5xl select-none pointer-events-none">
        🍌
      </div>
      <div className="absolute bottom-8 left-1/3 animate-float-fast opacity-40 text-3xl select-none pointer-events-none">
        🍌
      </div>

      {/* MAIN CARD */}
      <div className="
        relative z-10 bg-white/70 backdrop-blur-xl border border-white/60 
        shadow-2xl shadow-yellow-200/40 rounded-[2rem] p-10 
        max-w-xl text-center animate-fade-in
      ">
        
        {/* ICON */}
        <div className="text-6xl drop-shadow-lg mb-4 animate-pop">
          🚧
        </div>

        {/* TITLE */}
        <h2 className="
          text-4xl md:text-5xl font-black tracking-tight 
          bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-600
        ">
          Coming Soon
        </h2>

        {/* SUBTITLE */}
        <p className="text-stone-600 text-lg mt-4 leading-relaxed">
          Our <span className="font-bold text-stone-800">AI Headshot Generator</span>  
          is almost ready!  
          Expect stunning studio-quality portraits powered by advanced AI magic.
        </p>

        {/* LOADING BAR */}
        <div className="mt-10 w-full bg-stone-200 rounded-full h-3 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full animate-progress" />
        </div>

        {/* ETA TEXT */}
        <p className="text-sm text-stone-400 mt-3 tracking-wide">
          Estimated Release: <span className="font-semibold text-stone-600">Soon</span> ✨
        </p>

      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes floatSlow {
          0% { transform: translateY(0px) }
          50% { transform: translateY(-20px) }
          100% { transform: translateY(0px) }
        }
        @keyframes floatMedium {
          0% { transform: translateY(0px) }
          50% { transform: translateY(-25px) }
          100% { transform: translateY(0px) }
        }
        @keyframes floatFast {
          0% { transform: translateY(0px) }
          50% { transform: translateY(-15px) }
          100% { transform: translateY(0px) }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) }
          to { opacity: 1; transform: translateY(0) }
        }
        @keyframes pop {
          0% { transform: scale(0.9); opacity: 0.5 }
          100% { transform: scale(1); opacity: 1 }
        }
        @keyframes progress {
          0% { width: 0% }
          100% { width: 100% }
        }
        .animate-float-slow { animation: floatSlow 6s ease-in-out infinite; }
        .animate-float-medium { animation: floatMedium 5s ease-in-out infinite; }
        .animate-float-fast { animation: floatFast 4s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-pop { animation: pop 0.6s ease-out; }
        .animate-progress { animation: progress 2.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
