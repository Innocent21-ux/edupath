import React, { useState } from 'react';

function Register({ onRegisterSuccess, onNavigateLogin }) {
  // Sesuai dengan Request Body di API Contract
  const [formData, setFormData] = useState({
    full_name: '', 
    email: '',
    password: '',
    school_name: '' 
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      // Menggunakan endpoint /auth/register
      const response = await fetch('https://edupath-backend.vercel.app/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      // Cek status success dari response API
      if (!result.success) {
        let errorMessage = 'Terjadi kesalahan sistem.';
        
        // 1. Cek apakah ini error Validasi (400) yang berbentuk Array
        if (result.error?.code === 'VALIDATION_ERROR' && Array.isArray(result.error.details)) {
          // Mengambil semua pesan error validasi dan menggabungkannya dengan koma
          errorMessage = result.error.details.map(err => err.message).join(', ');
        } 
        // 2. Cek apakah ini error Global (401, 429, 500) yang berbentuk Teks String
        else if (typeof result.error?.details === 'string') {
          errorMessage = result.error.details;
        } 
        // 3. Cadangan jika bentuknya format lain
        else if (result.message) {
          errorMessage = result.message;
        }

        throw new Error(errorMessage);
      }
      if (result.data?.full_name) {
        localStorage.setItem('user_name', result.data.full_name);
      }
      if (result.data?.school_name) {
        localStorage.setItem('user_school', result.data.school_name);
      }

      // Jika sukses daftar, arahkan user ke halaman login
      if (onRegisterSuccess) onRegisterSuccess();
      
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden p-8 border border-slate-100">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 text-green-600 rounded-full mb-4 text-2xl">🌱</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Buat Akun Baru</h1>
          <p className="text-sm text-slate-500">Mulai petakan masa depanmu</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-6 border border-red-100 flex items-start">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
            <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-slate-50 focus:bg-white text-sm" placeholder="Contoh: Budi Santoso" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Asal Sekolah</label>
            <input type="text" name="school_name" required value={formData.school_name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-slate-50 focus:bg-white text-sm" placeholder="Contoh: SMA Negeri 1 Jakarta" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-slate-50 focus:bg-white text-sm" placeholder="budi@example.com" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input type="password" name="password" required minLength="8" value={formData.password} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-slate-50 focus:bg-white text-sm" placeholder="Minimal 8 karakter" />
          </div>

          <button type="submit" disabled={isLoading} className={`w-full py-3.5 mt-2 rounded-xl font-bold text-white transition-all shadow-lg ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30'}`}>
            {isLoading ? 'Memproses...' : 'Daftar Akun'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Sudah punya akun?{' '}
          <button onClick={onNavigateLogin} className="text-blue-600 font-bold hover:underline">
            Masuk di sini
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;