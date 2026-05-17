import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid
} from 'recharts';

// Menerima prop resultData (dari API), academicData (Step 1), dan behavioralData (Step 2)
function ResultPage({ onRetry, onBack, resultData, academicData, behavioralData }) {
  
  const finalData = resultData?.data;

  // Data User & AI Summary
  const fullName = finalData?.user_details?.full_name || "Siswa";
  const schoolName = finalData?.user_details?.school_name || "Sekolah Tidak Diketahui";
  const aiSummary = finalData?.ai_summary || "AI sedang memproses ringkasan potensi Anda...";

  // 1. DATA RADAR CHART 
  const radarData = [
    { subject: 'Math', A: Number(academicData?.['Matematika']) || 0, fullMark: 100 },
    { subject: 'Physics', A: Number(academicData?.['Fisika']) || 0, fullMark: 100 },
    { subject: 'Chemistry', A: Number(academicData?.['Kimia']) || 0, fullMark: 100 },
    { subject: 'Biology', A: Number(academicData?.['Biologi']) || 0, fullMark: 100 },
    { subject: 'History', A: Number(academicData?.['Sejarah']) || 0, fullMark: 100 },
    { subject: 'Geography', A: Number(academicData?.['Geografi']) || 0, fullMark: 100 },
    { subject: 'English', A: Number(academicData?.['Bahasa Inggris']) || 0, fullMark: 100 }
  ];

  // 2. DATA PROFIL NILAI (Bar Chart)
  const barProfileData = [...radarData].reverse();

  // 3. KALKULASI SKOR RATA-RATA (Untuk Ringkasan Nilai)
  const calculateAverage = (list) => {
    const scores = list.map(key => Number(academicData?.[key]) || 0);
    if (scores.length === 0) return "0.0";
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  };
  
  const sainsScore = calculateAverage(['Matematika', 'Fisika', 'Kimia', 'Biologi']);
  const sosialScore = calculateAverage(['Sejarah', 'Geografi', 'Bahasa Inggris']);
  const overallScore = ((parseFloat(sainsScore) + parseFloat(sosialScore)) / 2).toFixed(1);

  // 4. DATA REKOMENDASI KARIR
  const careers = finalData?.career_matches || [];

  const handleDownloadPDF = () => {
    window.print();
  };

  if (!finalData) return <div className="min-h-screen flex items-center justify-center text-blue-600 font-bold">Memuat Hasil Analisis AI...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-16">
      
      {/* Header Print Hidden */}
      <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-slate-200 print:hidden sticky top-0 z-50">
        <button onClick={onBack} className="text-slate-500 hover:text-blue-600 font-medium flex items-center transition">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Kembali
        </button>
        <div className="text-blue-700 font-bold text-xl">EduPath</div>
        <button onClick={handleDownloadPDF} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Unduh PDF
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-10">
        
        {/* Informasi Pengguna Dinamis */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Hebat, {fullName}!</h1>
          <p className="text-slate-600 mt-2 font-medium">Siswa dari {schoolName}</p>
        </div>

        {/* GRAFIK RADAR & AI SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                 <span className="text-xl mr-2">🕸️</span> Profil Kemampuan (Radar)
              </h2>
              <div className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#cbd5e1" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <Radar 
                      name="Skor" 
                      dataKey="A" 
                      stroke="#1d4ed8" 
                      strokeWidth={2}
                      fill="#3b82f6" 
                      fillOpacity={0.15} 
                      activeDot={{ r: 4, fill: '#1d4ed8' }} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
             <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 h-full">
                <h3 className="flex items-center text-blue-700 font-bold mb-3">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path></svg>
                  AI Overview
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{aiSummary}</p>
             </div>
          </div>
        </div>

        {/* GRAFIK BAR (PROFIL NILAI) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <span className="text-xl mr-2">📊</span> Profil Nilai
          </h2>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barProfileData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis dataKey="subject" type="category" tick={{ fill: '#475569', fontSize: 12 }} width={80} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="A" radius={[0, 4, 4, 0]} barSize={25}>
                  {barProfileData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={['English', 'Geography', 'History'].includes(entry.subject) ? '#ea580c' : '#2563eb'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAGIAN LIST REKOMENDASI JURUSAN & PROFIL */}
        <div className="max-w-4xl mx-auto">
          
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="mr-2">🎯</span> Rekomendasi Jurusan
          </h2>
          
          <div className="space-y-4 mb-10">
            {careers.map((career, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center hover:border-blue-300 transition">
                <div className="flex items-center">
                  <span className="text-slate-400 font-bold text-lg mr-6">#{index + 1}</span>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg flex items-center">
                      {career.career_details.career_name}
                      <span className="ml-2 text-sm">
                        {index === 0 ? '🛡️' : index === 1 ? '💻' : '💼'}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                      Confidence: {(career.confidence_score * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="text-blue-600">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
              </div>
            ))}
          </div>

          {/* RINGKASAN NILAI */}
          <div className="grid grid-cols-3 gap-8 py-8 border-t border-b border-slate-200 mb-10">
            <div className="text-center">
              <p className="text-slate-400 text-xs font-bold uppercase mb-2">Sains</p>
              <p className="text-4xl font-light text-slate-800">{sainsScore}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-xs font-bold uppercase mb-2">Sosial</p>
              <p className="text-4xl font-light text-slate-800">{sosialScore}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-xs font-bold uppercase mb-2">Overall</p>
              <p className="text-4xl font-bold text-blue-600">{overallScore}</p>
            </div>
          </div>

          {/* PROFIL BELAJAR */}
          <div className="mb-12">
             <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center">
               <span className="mr-2">🚀</span> Profil Belajar
             </h2>
             <div className="grid grid-cols-3 gap-4 text-left">
               <div>
                 <p className="text-slate-400 text-xs font-bold uppercase mb-3">Jam Belajar</p>
                 <p className="text-2xl font-medium text-slate-700">
                   {/* MEMBACA DARI VARIABEL PAYLOAD YANG TEPAT */}
                   {behavioralData?.weekly_self_study_hours || 40} jam
                 </p>
               </div>
               <div>
                 <p className="text-slate-400 text-xs font-bold uppercase mb-3">Absensi</p>
                 <p className="text-2xl font-medium text-slate-700">
                   {/* MEMBACA DARI VARIABEL PAYLOAD YANG TEPAT */}
                   {behavioralData?.absence_days || 8} hari
                 </p>
               </div>
               <div>
                 <p className="text-slate-400 text-xs font-bold uppercase mb-3">Ekstrakurikuler</p>
                 <p className="text-2xl font-medium text-slate-700">
                   {/* KONVERSI BOOLEAN KE TEKS */}
                   {behavioralData?.extracurricular ? 'Ya' : 'Tidak'}
                 </p>
               </div>
             </div>
          </div>
          
          <div className="flex justify-center print:hidden">
            <button 
              onClick={onRetry}
              className="px-8 py-3 bg-white border border-slate-300 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm"
            >
              Ulangi Asesmen
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default ResultPage;