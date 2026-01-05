
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { AppStage, UserContext } from './types';
import { 
  generateApologyLetter, 
  generateVirtualGift 
} from './services/geminiService';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.ONBOARDING);
  
  // --- PERSONALIZED COMPLIMENTS ---
  const [generatedCompliments] = useState<string[]>([
    "Sakshi, your smile is the most beautiful thing in the world.",
    "The way you care about the smallest things is so rare.",
    "Your heart is pure gold, even when you're angry.",
    "I love how you look when you're being extra cute.",
    "No one can ever take your place in my life, Sakshiiiii.",
    "You are the strongest and kindest girl I know.",
    "The way you talk makes my whole day better.",
    "I miss our late-night talks so much.",
    "You are my 'pasandida girl' for a reason.",
    "I promise to never let a misunderstanding happen again."
  ]);

  const [context, setContext] = useState<UserContext>({
    girlName: 'Sakshi',
    reason: "Sakshi i never said liier bilkul bhi nhi, Accha sorry na i missunderstood and unintentionally hurt you i am sorry na.. matt ho gussa yarr plzz matt, i am sorry mujhe galtfahmi hui ab itna gussa hogi , mai jhoothi nhi kahna chah raha tha sakshiiiii tujhe bss misunderstanding hogai aur sorry na gussa chhorrr.............Soryyyyyyyyyyyyyyyyyyyyyyyyyy!",
    favoriteThings: '',
    angerLevel: 8
  });

  const [loading, setLoading] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [giftImage, setGiftImage] = useState<string | null>(null);
  const [isForgiven, setIsForgiven] = useState(false);
  const [sakshiResponse, setSakshiResponse] = useState('');

  // IMAGE URLS (Matching user's provided images)
  const shadowImage = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1000"; 
  const hamsterSorryImage = "https://media.tenor.com/v8tT_iX7pAAAAAAC/sorry-sad.gif"; // Crying hamster sticker
  const coupleApologyBackground = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1000"; // Couple background in white/traditional

  const handleStart = () => {
    setStage(AppStage.DASHBOARD);
  };

  const loadLetter = async () => {
    setLoading(true);
    try {
      // We return the raw text the user provided as the letter
      setGeneratedLetter(context.reason);
      setStage(AppStage.LETTER);
    } finally {
      setLoading(false);
    }
  };

  const loadGift = async () => {
    setLoading(true);
    // User wants the "chuja" (chick) generating but specified to use the uploaded image
    // We will show the hamster image first as requested for "Sorry Sakshuuu"
    setGiftImage(hamsterSorryImage);
    setStage(AppStage.VIRTUAL_GIFT);
    setLoading(false);
  };

  return (
    <Layout shadowImage={shadowImage}>
      {stage === AppStage.ONBOARDING && (
        <div className="w-full max-w-sm mx-auto bg-white/95 backdrop-blur-xl p-6 sm:p-10 rounded-[3rem] shadow-2xl border border-white mt-4 sm:mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img src={hamsterSorryImage} alt="Sorry Hamster" className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-rose-100 shadow-lg mb-4" />
              <span className="absolute -top-2 -right-2 text-4xl animate-bounce">🥺</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-gray-800 tracking-tight">For My Sakshiiiiii</h2>
            <p className="text-rose-400 text-sm font-medium italic mt-1">"Please maan jao na..."</p>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-rose-400 uppercase tracking-[0.2em] mb-2 ml-1 text-center">Kitna gussa ho Sakshiiiii? ({context.angerLevel}/10)</label>
              <input
                type="range"
                min="1"
                max="10"
                className="w-full accent-rose-500 h-1.5 bg-rose-100 rounded-lg appearance-none cursor-pointer"
                value={context.angerLevel}
                onChange={e => setContext({ ...context, angerLevel: parseInt(e.target.value) })}
              />
            </div>

            <div className="pt-2">
              <label className="block text-[10px] font-bold text-rose-400 uppercase tracking-[0.2em] mb-2 ml-1 text-center font-bold">
                Sakshi yahan likho, kya kahna hai? ✍️
              </label>
              <textarea
                placeholder="Sakshi will type here..."
                className="w-full bg-rose-50/80 border-2 border-rose-100 focus:border-rose-400 rounded-2xl px-5 py-4 outline-none text-gray-800 min-h-[120px] transition-all resize-none shadow-sm text-base placeholder:text-rose-200"
                value={sakshiResponse}
                onChange={e => setSakshiResponse(e.target.value)}
              />
            </div>

            <button
              onClick={handleStart}
              className="w-full py-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-[2rem] shadow-xl shadow-rose-200 transition-all transform active:scale-95 text-lg"
            >
              Maafiiiii bacchi ✨
            </button>
          </div>
        </div>
      )}

      {stage === AppStage.DASHBOARD && (
        <div className="w-full px-2 mt-4 animate-in fade-in duration-500">
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-cursive text-rose-500">Soryyyyy, Sakshi</h2>
            <p className="text-gray-500 mt-2 font-serif italic text-base">"I never said liier, bilkul bhi nhi..."</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <button onClick={loadLetter} className="bg-white/95 p-6 rounded-[2.5rem] border border-rose-50 shadow-md flex items-center justify-between sm:flex-col sm:justify-center group active:scale-95 transition-transform">
              <span className="text-5xl sm:mb-4 group-hover:rotate-12 transition-transform">💌</span>
              <div className="text-right sm:text-center">
                <span className="block font-bold text-gray-800 text-lg font-serif">Read My Letter</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Dil Ki Baat</span>
              </div>
            </button>

            <button onClick={() => setStage(AppStage.COMPLIMENTS)} className="bg-white/95 p-6 rounded-[2.5rem] border border-rose-50 shadow-md flex items-center justify-between sm:flex-col sm:justify-center group active:scale-95 transition-transform">
              <span className="text-5xl sm:mb-4 group-hover:-translate-y-1 transition-transform">💎</span>
              <div className="text-right sm:text-center">
                <span className="block font-bold text-gray-800 text-lg font-serif">10 Reasons</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Why you're rare</span>
              </div>
            </button>

            <button onClick={loadGift} className="bg-white/95 p-6 rounded-[2.5rem] border border-rose-50 shadow-md flex items-center justify-between sm:flex-col sm:justify-center group active:scale-95 transition-transform">
              <span className="text-5xl sm:mb-4 group-hover:scale-110 transition-transform">🐥</span>
              <div className="text-right sm:text-center">
                <span className="block font-bold text-gray-800 text-lg font-serif">Sorry Sakshuuu</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Special Chuja</span>
              </div>
            </button>
          </div>

          <div className="mt-10 bg-white/60 backdrop-blur-md p-10 rounded-[3rem] border border-white flex flex-col items-center shadow-lg">
             <img src={hamsterSorryImage} alt="Sorry sticker" className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-rose-100 shadow-sm" />
             <p className="text-rose-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">Sakshiiiii, Maan jao na? 🥺</p>
             <button 
               onClick={() => setIsForgiven(!isForgiven)}
               className={`w-full py-5 rounded-2xl font-bold transition-all shadow-xl text-xl ${isForgiven ? 'bg-green-500 text-white scale-105' : 'bg-rose-100 text-rose-500'}`}
             >
               {isForgiven ? "Maan jaa yarrrrrrrr 💖" : "Tap here if you forgive me... 🌹"}
             </button>
          </div>

          {loading && (
            <div className="fixed inset-0 bg-rose-50/90 backdrop-blur-2xl z-50 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 border-8 border-rose-100 border-t-rose-500 rounded-full animate-spin mb-6"></div>
              <p className="text-2xl font-cursive text-rose-600 animate-pulse">Wait, bringing a smile for Sakshiiii...</p>
            </div>
          )}
        </div>
      )}

      {stage === AppStage.LETTER && (
        <div className="w-full max-w-lg mx-auto mt-4 animate-in zoom-in-95 duration-700">
          <div className="bg-white/90 p-8 sm:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden border border-rose-100 backdrop-blur-sm">
             <div className="absolute inset-0 opacity-10 pointer-events-none">
               <img src={shadowImage} alt="Background" className="w-full h-full object-cover" />
             </div>
             <div className="relative z-10">
               <div className="font-cursive text-5xl text-rose-500 mb-10 text-center underline decoration-rose-100 underline-offset-8">My Dearest Sakshi,</div>
               <div className="text-gray-800 leading-[2] whitespace-pre-wrap font-serif text-2xl italic mb-16 text-center px-2">
                 {generatedLetter}
               </div>
               <div className="border-t border-rose-100 pt-10 text-center">
                 <p className="text-[10px] font-bold text-rose-300 uppercase tracking-widest mb-2 italic">Hamesha tumhaara hi hoon</p>
                 <p className="font-cursive text-4xl text-rose-400">Vaibhav</p>
                 <button 
                  onClick={() => setStage(AppStage.DASHBOARD)}
                  className="mt-12 bg-rose-500 text-white px-10 py-4 rounded-full font-bold hover:bg-rose-600 transition-all text-xs uppercase tracking-widest shadow-lg shadow-rose-100"
                 >
                   Back
                 </button>
               </div>
             </div>
          </div>
        </div>
      )}

      {stage === AppStage.COMPLIMENTS && (
        <div className="w-full max-w-lg mx-auto mt-4 relative overflow-hidden rounded-[4rem] shadow-2xl border border-white min-h-[600px]">
          {/* Background Image for 10 Reasons section as requested */}
          <div className="absolute inset-0 z-0">
            <img src={coupleApologyBackground} alt="Couple background" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/80 backdrop-blur-[1px]"></div>
          </div>

          <div className="relative z-10 p-8 sm:p-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-cursive text-rose-500">10 Reasons Why You're My Everything</h2>
              <p className="text-gray-500 italic mt-2 font-medium">For you, Sakshuuu...</p>
            </div>
            <div className="space-y-4">
              {generatedCompliments.map((comp, idx) => (
                <div key={idx} className="bg-white/90 p-5 rounded-[2rem] shadow-sm border border-rose-50 flex items-center gap-6 animate-in slide-in-from-left duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="bg-gradient-to-br from-rose-400 to-pink-500 text-white w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-lg font-bold shadow-lg">
                    {idx + 1}
                  </div>
                  <p className="text-gray-800 font-bold text-base leading-relaxed italic font-serif">{comp}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setStage(AppStage.DASHBOARD)}
              className="mt-12 mx-auto block bg-rose-500 text-white px-14 py-4 rounded-full font-bold shadow-2xl shadow-rose-200 hover:scale-105 transition-all uppercase tracking-widest text-xs"
             >
              Back to Dashboard
             </button>
          </div>
        </div>
      )}

      {stage === AppStage.VIRTUAL_GIFT && (
        <div className="w-full max-w-lg mx-auto mt-4 text-center animate-in zoom-in-95 duration-1000 px-4">
          <h2 className="text-4xl font-cursive text-rose-500 mb-8">Sorry Sakshuuu</h2>
          <div className="relative inline-block w-full">
            <div className="absolute inset-0 bg-rose-400 blur-[100px] opacity-20"></div>
            <div className="relative bg-white p-6 sm:p-10 rounded-[4rem] shadow-2xl border-[12px] border-white overflow-hidden">
              <img src={giftImage || hamsterSorryImage} alt="Sorry Hamster Gift" className="rounded-[3rem] w-full aspect-square object-cover shadow-inner hover:scale-105 transition-transform duration-1000" />
            </div>
          </div>
          <p className="text-rose-400 mt-12 italic font-serif text-3xl leading-relaxed">
            "Sakshuuu, please maan jao na? 🥺"
          </p>
          <button 
            onClick={() => setStage(AppStage.DASHBOARD)}
            className="mt-12 mx-auto block bg-rose-50 text-rose-500 px-14 py-4 rounded-full font-bold hover:bg-rose-100 transition-all text-xs uppercase tracking-widest shadow-sm border border-rose-100"
           >
            Back
           </button>
        </div>
      )}
    </Layout>
  );
};

export default App;
