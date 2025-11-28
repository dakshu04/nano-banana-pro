"use client";

/* Minimal Icons */
const ConstructionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-amber-500"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.703-.077 1.543.32 3.394-.687 4.14-2.222.748-1.536.03-3.414-1.284-4.225-1.583-.977-1.894-3.023-.748-4.561.428-.574.38-1.374-.155-1.838a1.35 1.35 0 0 0-1.785-.052c-1.468 1.258-3.66 1.267-4.996.19-1.077-.868-2.652-1.042-4.008-.278-1.625.915-2.235 2.87-1.428 4.453.308.604.28 1.32-.078 1.905-.859 1.406-.607 3.343.858 4.67 1.17 1.059 2.047 2.457 2.224 4.025Z" /></svg>
);

export default function HeadShotGenerator() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden bg-white/50">
      
      {/* ---------------------------------------------------------- */}
      {/* BACKGROUND EFFECTS */}
      {/* ---------------------------------------------------------- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-100/40 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-100/40 blur-[100px] rounded-full mix-blend-multiply" />
      </div>

      {/* ---------------------------------------------------------- */}
      {/* FLOATING BANANAS (Subtle & Pro) */}
      {/* ---------------------------------------------------------- */}
      {/* We use opacity-10 to keep it very subtle and professional */}
      <div className="absolute top-10 left-10 animate-float-slow opacity-10 text-6xl select-none pointer-events-none grayscale">
        🍌
      </div>
      <div className="absolute bottom-20 right-20 animate-float-medium opacity-10 text-8xl select-none pointer-events-none grayscale">
        🍌
      </div>
      <div className="absolute top-1/3 right-10 animate-float-fast opacity-5 text-4xl select-none pointer-events-none grayscale">
        🍌
      </div>

      {/* ---------------------------------------------------------- */}
      {/* MAIN CARD */}
      {/* ---------------------------------------------------------- */}
      <div className="relative z-10 max-w-lg w-full px-6">
        <div className="bg-white border border-zinc-200 shadow-2xl shadow-zinc-200/50 rounded-3xl p-10 text-center relative overflow-hidden group">
            
            {/* Top Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-500 opacity-80" />

            {/* Icon */}
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <ConstructionIcon />
            </div>

            {/* Title */}
            <h2 className="text-3xl font-black text-zinc-900 tracking-tight mb-2">
                Under Construction
            </h2>
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-6">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                Coming Soon
            </div>

            {/* Description */}
            <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                We are currently training our AI models to generate studio-quality professional headshots. This feature will be available in the next update.
            </p>

            {/* Progress Bar Visual */}
            <div className="w-full bg-zinc-100 rounded-full h-2 mb-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 w-[85%] rounded-full animate-[shimmer_2s_infinite] relative">
                    <div className="absolute inset-0 bg-white/30 skew-x-12 w-full -translate-x-full animate-[shimmer_2s_infinite]" />
                </div>
            </div>
            <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                <span>Development</span>
                <span>85% Ready</span>
            </div>

        </div>
        
        {/* Footer Note */}
        <p className="text-center text-xs text-zinc-400 mt-6 font-medium">
            NanoBanana AI • Version 2.0-alpha
        </p>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* ANIMATION STYLES */}
      {/* ---------------------------------------------------------- */}
      <style jsx>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes floatMedium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
        }
        .animate-float-slow { animation: floatSlow 8s ease-in-out infinite; }
        .animate-float-medium { animation: floatMedium 6s ease-in-out infinite; }
        .animate-float-fast { animation: floatFast 4s ease-in-out infinite; }
        
        @keyframes shimmer {
            100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}











// "use client";

// import { useState } from "react";

// /* Minimal Icons */
// const UploadIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
// );
// const CameraIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" /></svg>
// );
// const BriefcaseIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.053c-.211 7.833-16.29 7.833-16.5 0m16.5 0H3.75m4.383-8.053a2.18 2.18 0 0 0-1.837 2.175v1.443c0 .598.243 1.171.674 1.586m-2.837-5.204a48.106 48.106 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
// );
// const CoffeeIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
// );
// const PaletteIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" /></svg>
// );
// const CheckIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-emerald-600"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
// );

// export default function HeadShotGenerator() {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [activeStyle, setActiveStyle] = useState("Corporate");
//   const [generatedResult, setGeneratedResult] = useState<string | null>(null);

//   const styles = [
//     { id: "Corporate", icon: <BriefcaseIcon />, label: "Corporate", desc: "Clean suit, studio lighting" },
//     { id: "Casual", icon: <CoffeeIcon />, label: "Casual", desc: "Soft bokeh, natural look" },
//     { id: "Creative", icon: <PaletteIcon />, label: "Creative", desc: "Bold colors, artistic vibe" },
//   ];

//   const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => {
//         setSelectedImage(reader.result as string);
//         setGeneratedResult(null); // Reset result on new upload
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleGenerate = () => {
//     if (!selectedImage) return;
//     setLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//         setLoading(false);
//         setGeneratedResult(selectedImage); // In real app, this would be the API result
//     }, 3000);
//   };

//   return (
//     <div className="h-full flex flex-col">
      
//       {/* Header */}
//       <div className="mb-6 flex items-center justify-between shrink-0">
//         <div>
//             <h3 className="text-xl font-bold text-zinc-900">Headshot Generator</h3>
//             <p className="text-sm text-zinc-500">Studio quality portraits from selfies.</p>
//         </div>
//       </div>

//       {/* Main Grid */}
//       <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        
//         {/* LEFT COLUMN: Controls */}
//         <div className="flex flex-col h-full bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden relative">
            
//             <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
                
//                 {/* 1. Upload Area */}
//                 <div className="mb-8">
//                     <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 block">1. Upload Selfie</label>
//                     <div className="relative group cursor-pointer w-full aspect-[4/3] rounded-xl overflow-hidden bg-white border-2 border-dashed border-zinc-300 hover:border-amber-400 transition-all">
//                         <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                        
//                         {selectedImage ? (
//                             <div className="w-full h-full relative">
//                                 <img src={selectedImage} alt="Upload" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
//                                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                                     <span className="bg-white/90 text-zinc-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">Change Photo</span>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-3">
//                                 <div className="w-10 h-10 bg-zinc-50 text-zinc-400 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:text-amber-500 transition-all">
//                                     <UploadIcon />
//                                 </div>
//                                 <div>
//                                     <p className="font-bold text-zinc-700 text-sm">Click to upload</p>
//                                     <p className="text-xs text-zinc-400 mt-1">Good lighting, clear face</p>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* 2. Style Selector */}
//                 <div>
//                     <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 block">2. Select Style</label>
//                     <div className="space-y-2">
//                         {styles.map((style) => (
//                             <button
//                                 key={style.id}
//                                 onClick={() => setActiveStyle(style.id)}
//                                 className={`w-full p-3 rounded-xl text-left transition-all duration-200 border relative overflow-hidden group
//                                     ${activeStyle === style.id 
//                                         ? "border-amber-400 bg-white shadow-sm ring-1 ring-amber-400/20" 
//                                         : "border-zinc-200 bg-white hover:border-zinc-300"
//                                     }
//                                 `}
//                             >
//                                 <div className="flex items-center gap-3 relative z-10">
//                                     <div className={`p-2 rounded-lg ${activeStyle === style.id ? "bg-amber-50 text-amber-600" : "bg-zinc-50 text-zinc-400"}`}>
//                                         {style.icon}
//                                     </div>
//                                     <div>
//                                         <h4 className={`text-sm font-bold ${activeStyle === style.id ? "text-zinc-900" : "text-zinc-600"}`}>{style.label}</h4>
//                                         <p className="text-xs text-zinc-400">{style.desc}</p>
//                                     </div>
//                                     {activeStyle === style.id && (
//                                         <div className="ml-auto">
//                                             <CheckIcon />
//                                         </div>
//                                     )}
//                                 </div>
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom Action Bar */}
//             <div className="h-20 border-t border-zinc-200 bg-white p-4 flex items-center justify-center shrink-0">
//                 <button
//                     onClick={handleGenerate}
//                     disabled={!selectedImage || loading}
//                     className={`
//                         w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md
//                         ${!selectedImage || loading
//                             ? "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
//                             : "bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-lg"
//                         }
//                     `}
//                 >
//                     {loading ? (
//                         <>
//                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                            Processing...
//                         </>
//                     ) : (
//                          <><CameraIcon /> Generate Headshots</>
//                     )}
//                 </button>
//             </div>
//         </div>

//         {/* RIGHT COLUMN: Preview */}
//         <div className="flex flex-col h-full bg-white rounded-2xl border border-zinc-200 overflow-hidden relative shadow-sm">
             
//              {/* Badge */}
//              <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-sm border border-zinc-200 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
//                 Result
//                 {generatedResult && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />}
//             </div>

//             <div className="flex-1 relative min-h-0 bg-zinc-50/50 flex items-center justify-center">
//                 {generatedResult ? (
//                      <div className="relative w-full h-full p-8 flex items-center justify-center">
//                         {/* Simulating the result - in real app this would be the new image */}
//                         <img src={generatedResult} alt="Generated Headshot" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
//                      </div>
//                 ) : loading ? (
//                     <div className="flex flex-col items-center gap-6">
//                         <div className="relative w-64 h-80 bg-zinc-200 rounded-lg overflow-hidden animate-pulse">
//                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]" />
//                         </div>
//                         <div className="text-center">
//                              <p className="text-zinc-900 text-sm font-bold">AI is adjusting lighting...</p>
//                              <p className="text-zinc-400 text-xs mt-1">Applying {activeStyle} style</p>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="flex flex-col items-center justify-center text-zinc-300 gap-3">
//                         <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-zinc-200 flex items-center justify-center">
//                             <CameraIcon />
//                         </div>
//                         <span className="text-sm font-medium">Your studio photos will appear here</span>
//                     </div>
//                 )}
//             </div>
//         </div>

//       </div>
//     </div>
//   );
// }