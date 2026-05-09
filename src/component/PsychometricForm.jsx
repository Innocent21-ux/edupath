import React, { useState } from 'react';

function PsychometricForm({ onBack, onSubmit }) {
  // State untuk menyimpan data inputan form
  const [studyHours, setStudyHours] = useState(10);
  const [absentDays, setAbsentDays] = useState('');
  const [partTimeJob, setPartTimeJob] = useState('No');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Psikometrik:", { studyHours, absentDays, partTimeJob });
    if (onSubmit) onSubmit();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* Navbar Minimalis (Sama seperti Step 1) */}
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
        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer">
          VR
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center py-12 px-4">
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-sm border border-slate-200 p-8 md:p-12">
          
          {/* Progress Bar (Step 2) */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-2 text-sm font-medium">
              <span className="text-slate-600">Step 2 of 2</span>
              <span className="text-blue-600">Psychometrics & Habits</span>
            </div>
            <div className="w-full bg-blue-600 rounded-full h-1.5 relative">
               {/* Progress bar full 100% */}
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h1 className="text-xl font-bold text-slate-800 mb-2">Behavioral Profile</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Help us understand your study habits and daily routine to generate more accurate recommendations.
            </p>
          </div>

          {/* Form Input */}
          <form onSubmit={handleSubmit}>
            
            {/* Range Slider: Study Hours */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-slate-700">Weekly self-study hours</label>
                <span className="text-sm font-bold text-blue-600">{studyHours} hrs</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="40" 
                value={studyHours}
                onChange={(e) => setStudyHours(e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                <span>0</span>
                <span>40+</span>
              </div>
            </div>

            {/* Input Number: Absent Days */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-2">Days absent (Current Semester)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <input 
                  type="number" 
                  min="0"
                  placeholder="e.g. 2"
                  value={absentDays}
                  onChange={(e) => setAbsentDays(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>

            {/* Radio Buttons: Part-time Job */}
            <div className="mb-12">
              <label className="block text-sm font-medium text-slate-700 mb-3">Do you currently hold a part-time job?</label>
              <div className="grid grid-cols-2 gap-4">
                
                {/* Opsi Yes */}
                <button 
                  type="button"
                  onClick={() => setPartTimeJob('Yes')}
                  className={`flex items-center p-3 border rounded-lg transition-all ${
                    partTimeJob === 'Yes' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                    partTimeJob === 'Yes' ? 'border-blue-600' : 'border-slate-300'
                  }`}>
                    {partTimeJob === 'Yes' && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                  </div>
                  <span className={`text-sm font-medium ${partTimeJob === 'Yes' ? 'text-blue-800' : 'text-slate-600'}`}>Yes</span>
                </button>

                {/* Opsi No */}
                <button 
                  type="button"
                  onClick={() => setPartTimeJob('No')}
                  className={`flex items-center p-3 border rounded-lg transition-all ${
                    partTimeJob === 'No' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                    partTimeJob === 'No' ? 'border-blue-600' : 'border-slate-300'
                  }`}>
                    {partTimeJob === 'No' && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                  </div>
                  <span className={`text-sm font-medium ${partTimeJob === 'No' ? 'text-blue-800' : 'text-slate-600'}`}>No</span>
                </button>

              </div>
            </div>

            {/* Action Buttons (Back & Submit) */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button 
                type="button"
                onClick={onBack}
                className="px-6 py-3 border border-slate-300 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition"
              >
                Back
              </button>
              
              <button 
                type="submit"
                className="bg-[#0f763b] hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition flex items-center"
              >
                Kirim & Analisis Data
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}

export default PsychometricForm;