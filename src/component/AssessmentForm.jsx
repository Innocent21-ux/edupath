import React, { useState } from 'react';

function AssessmentForm({ onNext, onBack }) {
  const subjects = ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Sejarah', 'Geografi', 'Bahasa Inggris'];

  // State untuk menyimpan nilai inputan
  const [grades, setGrades] = useState(
    subjects.reduce((acc, subject) => {
      acc[subject] = '';
      return acc;
    }, {})
  );

  // State untuk menyimpan pesan error
  const [errors, setErrors] = useState({});

  const handleGradeChange = (subject, value) => {
    // Menyimpan nilai yang diketik
    setGrades((prev) => ({ ...prev, [subject]: value }));

    // Validasi: Harus berupa angka antara 0 - 100
    const numValue = Number(value);
    if (value !== '' && (isNaN(numValue) || numValue < 0 || numValue > 100)) {
      setErrors((prev) => ({ ...prev, [subject]: 'Value must be between 0 and 100' }));
    } else {
      // Menghapus error jika sudah benar
      setErrors((prev) => ({ ...prev, [subject]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Cek apakah masih ada error sebelum lanjut
    const hasErrors = Object.values(errors).some(err => err !== null);
    if (hasErrors) {
      alert("Mohon perbaiki nilai yang salah sebelum melanjutkan.");
      return;
    }

    console.log("Data Nilai:", grades);
    if (onNext) onNext(grades);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Navbar Minimalis */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center text-blue-700 font-bold text-lg">
          <span className="mr-2">🎓</span> EduPath
        </div>
        
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-500">
          <a href="{{ route('LandingPage') }}" className="hover:text-blue-600 transition">Home</a>
          <a href="#" className="text-blue-600 font-semibold">Assessment</a>
          <a href="#" className="hover:text-blue-600 transition">Insights</a>
          <a href="#" className="hover:text-blue-600 transition">Profile</a>
        </nav>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer">
          AL
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4 flex justify-center">
        <div className="bg-white w-full max-w-3xl rounded-xl shadow-sm border border-slate-200 p-8 md:p-12">
          
          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-2 text-sm font-medium text-slate-600">
              <span>Langkah 1 dari 2: Data Akademik</span>
              <span className="text-blue-600">50%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h1 className="text-xl font-bold text-slate-800 mb-2">Penilaian Akademik</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Silakan masukkan nilai rata-rata Anda (0-100) untuk mata pelajaran berikut agar kami dapat menganalisis profil akademik Anda.
            </p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {subjects.map((subject) => {
                const isError = errors[subject];
                
                return (
                  <div key={subject} className="flex flex-col">
                    <label className="text-sm font-medium text-slate-700 mb-2">{subject}</label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="0-100"
                        value={grades[subject]}
                        onChange={(e) => handleGradeChange(subject, e.target.value)}
                        className={`w-full border rounded-lg p-3 outline-none transition-all ${
                          isError 
                            ? 'border-red-400 bg-red-50 text-red-700 focus:ring-2 focus:ring-red-200' 
                            : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        }`}
                      />
                      {/* Error Icon */}
                      {isError && (
                        <svg className="w-5 h-5 text-red-500 absolute right-3 top-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    {/* Error Message Text */}
                    {isError && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{isError}</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-[#0d5abe] hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition flex items-center"
              >
                Selanjutnya
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </form>

        </div>
      </main>
    </div>
  );
}

export default AssessmentForm;