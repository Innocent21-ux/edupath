import React from 'react';

function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="flex justify-between items-center px-10 py-6">
        <div className="flex items-center text-blue-700 font-bold text-xl">
          <span className="mr-2">🎓</span> EduPath
        </div>
        <button className="bg-blue-50 text-blue-700 px-6 py-2 rounded-full font-medium hover:bg-blue-100 transition">
          Log In
        </button>
      </header>

      <main className="px-10 py-16 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 pr-10">
          <h1 className="text-5xl font-extrabold leading-tight mb-6 text-slate-900">
            Temukan Jalur Karier dan Jurusan yang Paling Sesuai Untukmu
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Gunakan kekuatan pemetaan AI untuk menganalisis minat, bakat, dan nilai akademis Anda. 
            Kami membantu mengurangi kebingungan dalam memilih masa depan dengan memberikan rekomendasi berbasis data yang tenang dan dapat diandalkan.
          </p>
          {/* Tombol ini sekarang bisa diklik untuk pindah halaman */}
          <button 
            onClick={onStart} 
            className="bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-800 transition"
          >
            Mulai Asesmen Sekarang
          </button>
        </div>
        
        <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="bg-teal-100 w-full h-96 rounded-3xl flex items-center justify-center shadow-xl text-teal-800 font-medium">
            [Ilustrasi Siswa Belajar]
          </div>
        </div>
      </main>

      <section className="px-10 py-20 text-center">
        <h2 className="text-3xl font-bold mb-2">Kenapa Memilih EduPath?</h2>
        <p className="text-slate-500 mb-12">Pendekatan komprehensif untuk masa depan yang lebih jelas.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-left">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 text-2xl">🤖</div>
            <h3 className="text-xl font-bold mb-3">Berbasis AI</h3>
            <p className="text-slate-500 text-sm">Algoritma cerdas kami memproses data kompleks Anda untuk memberikan prediksi dan rekomendasi yang sangat akurat.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-left">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6 text-2xl">🎯</div>
            <h3 className="text-xl font-bold mb-3">Holistic Assessment</h3>
            <p className="text-slate-500 text-sm">Evaluasi menyeluruh yang mencakup nilai rapor, tes kepribadian, dan minat karir untuk gambaran lengkap potensi Anda.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-left">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6 text-2xl">📊</div>
            <h3 className="text-xl font-bold mb-3">Visualisasi Interaktif</h3>
            <p className="text-slate-500 text-sm">Lihat hasil Anda melalui grafik radar dan chart yang bersih dan mudah dipahami, mengubah prediksi abstrak menjadi wawasan konkret.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;