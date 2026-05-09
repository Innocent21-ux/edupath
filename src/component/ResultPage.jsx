import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import LandingPage from './LandingPage';

function ResultPage({ onRetry, onBack }) {
  // Data Grafik Radar (Peta Potensi)
  const radarData = [
    { subject: 'Logika & Matematika', A: 95, fullMark: 100 },
    { subject: 'Sains', A: 75, fullMark: 100 },
    { subject: 'Teknologi', A: 85, fullMark: 100 },
    { subject: 'Analisa Data', A: 90, fullMark: 100 },
    { subject: 'Riset', A: 80, fullMark: 100 },
    { subject: 'Pemikiran Komputasional', A: 88, fullMark: 100 },
  ];

  // Data Bar Chart (Tren Karir)
  const barData = [
    { name: 'Data Scientist', value: 95, level: 'Sangat Tinggi' },
    { name: 'AI Engineer', value: 80, level: 'Tinggi' },
    { name: 'Financial Analyst', value: 45, level: 'Stabil' },
  ];

  // Fungsi untuk memicu fitur Save as PDF dari browser
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-16">
      
      {/* Header (Disembunyikan saat dicetak ke PDF dengan class 'print:hidden') */}
      <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-slate-200 print:hidden sticky top-0 z-50">
        <button onClick={onBack} className="text-slate-500 hover:text-blue-600 font-medium flex items-center transition">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Kembali
        </button>
        <div className="text-blue-700 font-bold text-xl">EduPath</div>
        <button 
          onClick={handleDownloadPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Unduh PDF
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-10">
        
        {/* User Info Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Hebat, Vincentius Ananto Galih Rinaldy!</h1>
          <p className="text-slate-600 mt-2 font-medium">Mahasiswa dari Universitas Kebangsaan Republik Indonesia</p>
          <p className="text-slate-600 mt-1">Profilmu lebih condong ke arah <span className="font-bold text-blue-600">Analitis</span>.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Kolom Kiri: Peta Potensi & AI Overview */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Peta Potensi Kognitif */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Peta Potensi Kognitif</h2>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Skor" dataKey="A" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Overview */}
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <h3 className="flex items-center text-blue-700 font-bold mb-3">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path></svg>
                AI Overview
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Vincentius memiliki intuisi analitis yang luar biasa dipadukan dengan pemikiran komputasional yang sangat terstruktur. 
                Ia memiliki ketertarikan alami dalam memecahkan masalah kompleks berbasis data dan sangat teliti terhadap detail. 
                Dengan keunggulan logikanya yang menonjol, Vincentius memiliki potensi yang sangat besar untuk unggul di lingkungan 
                teknis yang serba cepat dan berfokus pada inovasi teknologi.
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Tren Karir 2030 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Tren Karir 2030</h2>
            
            {/* Indikator Growth */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Growth Projection</span>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">⬆ HIGH GROWTH</span>
            </div>

            {/* Bar Chart Sederhana menggunakan div agar lebih mirip desain Anda */}
            <div className="space-y-5">
              {barData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-700">{item.name}</span>
                    <span className="text-blue-600">{item.level}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-blue-300' : 'bg-slate-300'}`} 
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rekomendasi Karir */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Rekomendasi Karir</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">★ 95% Match</div>
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">📊</div>
              <h3 className="font-bold text-slate-800 mb-2">Data Scientist</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">Seorang ahli yang mengubah data mentah menjadi wawasan strategis.</p>
              <div>
                <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase">Jurusan Rekomendasi:</p>
                <div className="flex gap-2">
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">Sains Data</span>
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">Statistika</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center mb-4">⚙️</div>
              <h3 className="font-bold text-slate-800 mb-2">Backend Engineer</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">Fokus pada arsitektur peladen, pengelolaan basis data, dan performa API.</p>
              <div>
                <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase">Jurusan Rekomendasi:</p>
                <div className="flex gap-2">
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">Teknik Informatika</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center mb-4">🎨</div>
              <h3 className="font-bold text-slate-800 mb-2">UI/UX Researcher</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">Menganalisis kebutuhan pengguna untuk merancang antarmuka yang intuitif.</p>
              <div>
                <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase">Jurusan Rekomendasi:</p>
                <div className="flex gap-2">
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">Sistem Informasi</span>
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">Psikologi</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Action Button (Sembunyi saat cetak PDF) */}
        <div className="flex justify-center mt-12 print:hidden">
          <button 
            onClick={onRetry}
            className="flex items-center px-6 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 shadow-sm transition"
          >
            <svg className="w-5 h-5 mr-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Coba Asesmen Ulang
          </button>
        </div>

      </main>
    </div>
  );
}

export default ResultPage;