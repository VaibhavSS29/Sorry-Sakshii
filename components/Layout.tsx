
import React from 'react';

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const Layout: React.FC<{ children: React.ReactNode; shadowImage?: string }> = ({ children, shadowImage }) => {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col items-center pb-12 transition-colors duration-1000 bg-[#fff5f7]">
      {/* Dynamic Background Shadow (The Couple Image) */}
      {shadowImage && (
        <div 
          className="fixed inset-0 pointer-events-none opacity-5 sm:opacity-10 z-0 transition-opacity duration-1000"
          style={{ backgroundImage: `url(${shadowImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      )}

      {/* Background Hearts */}
      <div className="fixed inset-0 pointer-events-none opacity-10 sm:opacity-20 z-0">
        <HeartIcon className="absolute top-10 left-[-20px] w-20 text-rose-300 animate-pulse" />
        <HeartIcon className="absolute bottom-20 right-[-10px] w-24 text-pink-300 animate-bounce" />
        <HeartIcon className="absolute top-1/3 left-1/4 w-16 text-rose-200 animate-float" />
        <HeartIcon className="absolute top-2/3 right-1/4 w-14 text-pink-200 animate-float" />
      </div>

      <header className="w-full max-w-4xl px-4 py-6 sm:py-10 flex justify-between items-center z-10">
        <h1 className="text-2xl sm:text-3xl font-serif text-rose-600 font-bold tracking-tight drop-shadow-sm">
          Sakshi<span className="text-pink-400">.</span>
        </h1>
        <div className="bg-white/80 backdrop-blur-md px-5 py-2 rounded-full border border-pink-100 shadow-sm text-rose-500 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-rose-400 rounded-full animate-ping"></span>
          Sorry Bacchi 🌹
        </div>
      </header>

      <main className="w-full max-w-lg px-4 z-10 flex-grow pb-10">
        {children}
      </main>

      <footer className="w-full py-6 text-rose-300 text-[10px] font-bold text-center z-10 opacity-60 uppercase tracking-[0.3em]">
        With Love, Vaibhav &bull; For Sakshiiiii
      </footer>
    </div>
  );
};
