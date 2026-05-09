import React, { useState } from 'react';

function OnboardingPage({ onNext }) {
  const subjects = ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Sejarah', 'Geografi', 'Bahasa Inggris'];

  // Menyimpan status tercentang (default: true)
  const [checkedItems, setCheckedItems] = useState(
    subjects.reduce((acc, subject) => {
      acc[subject] = true;
      return acc;
    }, {})
  );

  // Mengubah status true/false
  const handleToggle = (subject) => {
    setCheckedItems((prev) => ({
      ...prev,
      [subject]: !prev[subject],
    }));
  };

  const handleSubmit = () => {
    console.log("Data yang disubmit:", checkedItems);
    if (onNext) onNext();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-12 px-4 font-sans" 
         style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 0)', backgroundSize: '20px 20px' }}>
      
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-xl overflow-hidden">
        
        <div className="relative bg-slate-200 h-48 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-[#d9c5b2] to-[#e6d5c3] opacity-80"></div>
          <div className="relative z-10 flex flex-col items-center mt-6">
             <div className="bg-white p-3 rounded-full shadow-md mb-2">
                <span className="text-blue-700 text-2xl">🎓</span>
             </div>
             <h1 className="text-2xl font-bold text-slate-800">Selamat Datang di EduPath</h1>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <p className="text-center text-slate-600 mb-8 leading-relaxed">
            Mari kita temukan jalur karir yang paling tepat untukmu. Untuk memulai 
            analisis yang akurat, pastikan kamu telah menyiapkan dokumen berikut.
          </p>

          <div className="border border-slate-200 rounded-xl p-6 mb-6">
            <h2 className="flex items-center text-lg font-bold text-slate-800 mb-5">
              <span className="text-blue-600 mr-2">✓=</span> Siapkan Nilai Rapor
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {subjects.map((subject, index) => {
                const isChecked = checkedItems[subject];
                
                return (
                  <div 
                    key={index} 
                    className="flex items-start cursor-pointer group select-none"
                    onClick={() => handleToggle(subject)}
                  >
                    <div className={`w-5 h-5 rounded-[4px] mt-0.5 mr-3 flex items-center justify-center border transition-colors ${
                      isChecked 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'bg-white border-slate-300 text-transparent group-hover:border-blue-400'
                    }`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    
                    <div>
                      <p className={`font-semibold text-sm transition-colors ${isChecked ? 'text-slate-800' : 'text-slate-500'}`}>
                        {subject}
                      </p>
                      <p className="text-xs text-slate-400">Semester 1 - 5</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#eff6ff] border border-blue-100 rounded-xl p-5 flex items-start mb-8">
            <div className="text-blue-600 mt-0.5 mr-3">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-900 mb-1">Privasi Terjamin</h3>
              <p className="text-xs text-blue-800/80 leading-relaxed">
                Data nilaimu hanya digunakan untuk keperluan analisis AI dan tidak akan dibagikan kepada pihak ketiga. Proses ini sepenuhnya aman dan rahasia.
              </p>
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full bg-[#0d5abe] hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-md transition flex justify-center items-center"
          >
            Saya Siap, Mulai Isi Data 
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;