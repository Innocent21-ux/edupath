import React, { useState } from 'react';

function Login({ onLoginSuccess, onNavigateRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      // Menggunakan endpoint /auth/login
      const response = await fetch('https://edupath-backend.vercel.app/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

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

      // Mengambil token dari data.access_token sesuai kontrak API
      const token = result.data?.access_token; 
      const userData = result.data?.user;
      
      if (token) {
        localStorage.setItem('user_token', token); // Menyimpan JWT ke memori browser

        if (userData?.full_name) {
          localStorage.setItem('user_name', userData.full_name);
        }
        if (userData?.school_name) {
          localStorage.setItem('user_school', userData.school_name);
        }
        if (onLoginSuccess) onLoginSuccess();
      } else {
        throw new Error('Gagal mendapatkan akses token dari server.');
      }
      
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
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-full mb-4 text-2xl">🎓</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Masuk ke EduPath</h1>
          <p className="text-sm text-slate-500">Lanjutkan perjalanan pendidikanmu</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-6 border border-red-100 flex items-start">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-slate-700 bg-slate-50 focus:bg-white"
              placeholder="Masukkan email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-slate-700 bg-slate-50 focus:bg-white"
              placeholder="Masukkan password"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-lg ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30'}`}
          >
            {isLoading ? 'Memeriksa...' : 'Masuk Sekarang'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-8">
          Belum punya akun?{' '}
          <button onClick={onNavigateRegister} className="text-blue-600 font-bold hover:underline">
            Daftar di sini
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;