import React, { useState, useEffect } from 'react';
import icon from '../assets/education.png'; 

function OnboardingPage({ onNext, onBack, onProfileClick }) {
  const subjects = ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Sejarah', 'Geografi', 'Bahasa Inggris'];

  const [checkedItems, setCheckedItems] = useState(
    subjects.reduce((acc, subject) => {
      acc[subject] = true;
      return acc;
    }, {})
  );

  // State untuk inisial profil
  const [initials, setInitials] = useState('U');

  // Mengambil nama dari localStorage untuk dijadikan inisial (misal: Ivan Kolap -> IK)
  useEffect(() => {
    const fullName = localStorage.getItem('user_name');
    if (fullName) {
      const nameParts = fullName.trim().split(' ');
      const ini = nameParts.length > 1 
        ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
        : nameParts[0][0].toUpperCase();
      setInitials(ini);
    }
  }, []);

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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* HEADER NAVIGASI */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center w-full">
        <div className="flex items-center text-blue-700 font-bold text-lg">
          <span className="mr-2"></span> EduPath
        </div>
        
        {/* Menu Tengah: Hanya Home */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-500">
          <button onClick={onBack} className="text-blue-600 font-bold text-lg hover:text-blue-700 transition">
            Home
          </button>
        </nav>

        {/* Logo Avatar Profil */}
        <div 
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold shadow-sm cursor-pointer hover:bg-slate-800 transition"
          title="Lihat Profil"
        >
          {initials}
        </div>
      </header>

      {/* KONTEN UTAMA */}
      <main className="flex-1 flex justify-center items-center py-12 px-4">
        <div className="bg-white max-w-3xl w-full rounded-2xl shadow-xl overflow-hidden mt-0">
          
          <div className="relative bg-slate-200 h-48 flex items-center justify-center">
            <div className="absolute inset-0 bg-linear-to-r from-[#325afa] to-[#e6d5c3] opacity-80"></div>
            <div className="relative z-10 flex flex-col items-center mt-6">
               <div className="bg-white p-3 rounded-full shadow-md mb-2">
                  <img 
                    src={icon} 
                    alt="EduPath Illustration" 
                    className="w-10 h-10"
                  />
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
                <span className="text-blue-600 mr-2">✓</span> Siapkan Nilai Rapor
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
                      <div className={`w-5 h-5 rounded-sm mt-0.5 mr-3 flex items-center justify-center border transition-colors ${
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
      </main>

      {/* CSS untuk Animasi */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loadingBar {
          0% { width: 0%; left: 0%; }
          50% { width: 40%; left: 30%; }
          100% { width: 100%; left: 0%; }
        }
        .animate-loadingBar {
          animation: loadingBar 2s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

    </div>
  );
}

export default OnboardingPage;