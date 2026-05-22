import React, { useState, useEffect } from 'react';
import ai from '../assets/iconAI.png';
import chart from '../assets/iconChart.png';
import target from '../assets/iconTarget.png';
import LandingPageIlustration from '../assets/ilustration1.png';

function LandingPage({ onStart, onLoginClick, onRegisterClick, onProfileClick }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [initials, setInitials] = useState('');

  // status login setiap kali Landing Page dibuka
  useEffect(() => {
    const token = localStorage.getItem('user_token');
    const fullName = localStorage.getItem('user_name');

    if (token) {
      setIsLoggedIn(true);
      
      if (fullName) {
        // Mengambil nama depan 
        const nameParts = fullName.trim().split(' ');
        setFirstName(nameParts[0]);

        // Membuat inisial
        const ini = nameParts.length > 1 
          ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
          : nameParts[0][0].toUpperCase();
        setInitials(ini);
      } else {
        setFirstName('Siswa');
        setInitials('S');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <header className="flex justify-between items-center px-10 py-6">
        <div className="flex items-center text-blue-700 font-bold text-xl">
          <span className="mr-2"></span> EduPath
        </div>
        
        {/* TOMBOL PROFIL */}
        <div className="flex items-center">
          {isLoggedIn ? (
            <button onClick={onProfileClick} className="flex items-center gap-3 hover:bg-slate-200 p-1.5 pr-4 rounded-full transition group">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md group-hover:shadow-lg transition">
                {initials}
              </div>
              <span className="font-bold text-slate-700 hidden md:block">{firstName}</span>
            </button>
          ) : (
            <button onClick={onLoginClick} className="flex items-center gap-2 hover:bg-slate-200 p-2 rounded-full transition text-slate-600 font-medium" title="Log In">
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 px-10 py-16 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 pr-10">
          <h1 className="text-5xl font-extrabold leading-tight mb-6 text-slate-900">
            Temukan Jalur Karier dan Jurusan yang Paling Sesuai Untukmu
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Gunakan kekuatan pemetaan AI untuk menganalisis minat, bakat, dan nilai akademis Anda. 
            Kami membantu mengurangi kebingungan dalam memilih masa depan dengan memberikan rekomendasi berbasis data yang tenang dan dapat diandalkan.
          </p>
          
          {/* HERO SECTION */}
          <div className="flex flex-wrap gap-4">
            {isLoggedIn ? (
              <button 
                onClick={onStart} 
                className="bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-blue-800 transition flex items-center"
              >
                Mulai Asesmen Sekarang
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </button>
            ) : (
              <>
                <button 
                  onClick={onLoginClick} 
                  className="bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-blue-800 transition"
                >
                  Log In
                </button>
                <button 
                  onClick={onRegisterClick} 
                  className="bg-white text-blue-700 border-2 border-blue-700 px-8 py-3.5 rounded-full font-bold shadow-sm hover:bg-blue-50 transition"
                >
                  Register
                </button>
              </>
            )}
          </div>

        </div>
        
        <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center items-center">
          <img 
            src={LandingPageIlustration} 
            alt="Ilustrasi siswa belajar dengan EduPath AI" 
            className="w-full h-auto rounded-3xl object-cover" 
            loading="lazy"
          />
        </div>
      </main>

      <section className="px-10 py-20 text-center">
        <h2 className="text-3xl font-bold mb-2">Kenapa Memilih EduPath?</h2>
        <p className="text-slate-500 mb-12">Pendekatan komprehensif untuk masa depan yang lebih jelas.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-left">
            <div className="w-12 h-12 bg-transparent text-blue-600 rounded-xl flex items-center justify-center mb-6 text-2xl">
              <img 
            src={ai} 
            alt="ai" 
            className="w-full h-auto rounded-3xl object-cover" 
            loading="lazy"/>
            </div>
            <h3 className="text-xl font-bold mb-3">Berbasis AI</h3>
            <p className="text-slate-500 text-sm">Algoritma cerdas kami memproses data kompleks Anda untuk memberikan prediksi dan rekomendasi yang sangat akurat.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-left">
            <div className="w-12 h-12 bg-transparent text-green-600 rounded-xl flex items-center justify-center mb-6 text-2xl">
              <img 
            src={target} 
            alt="target" 
            className="w-full h-auto rounded-3xl object-cover" 
            loading="lazy"/>
              </div>
            <h3 className="text-xl font-bold mb-3">Holistic Assessment</h3>
            <p className="text-slate-500 text-sm">Evaluasi menyeluruh yang mencakup nilai rapor, tes kepribadian, dan minat karir untuk gambaran lengkap potensi Anda.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-left">
            <div className="w-12 h-12 bg-transparent text-orange-600 rounded-xl flex items-center justify-center mb-6 text-2xl">
            <img 
            src={chart} 
            alt="chart" 
            className="w-full h-auto rounded-3xl object-cover" 
            loading="lazy"/>
            </div>
            <h3 className="text-xl font-bold mb-3">Visualisasi Interaktif</h3>
            <p className="text-slate-500 text-sm">Lihat hasil Anda melalui grafik radar dan chart yang bersih dan mudah dipahami, mengubah prediksi abstrak menjadi wawasan konkret.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50 px-10 py-8 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="flex items-center text-blue-700 font-bold mb-4 md:mb-0">EduPath
        </div>
        
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-slate-500 font-medium mb-4 md:mb-0">
          <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
          <a href="#" className="hover:text-blue-600 transition">Help Center</a>
          <a href="#" className="hover:text-blue-600 transition">Contact Us</a>
        </nav>
        
        <div className="text-slate-400 font-medium text-xs md:text-sm text-center">
          © 2026 EduPath. Empowering Future Scholars.
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;