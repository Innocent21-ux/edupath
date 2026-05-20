import React, { useState, useEffect } from 'react';

function UserProfilePage({ onBack, onLogout }) { 
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    school_name: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const token = localStorage.getItem('user_token');
      if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');

      const response = await fetch('https://edupath-backend.vercel.app/api/v1/profiles/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Gagal mengambil data profil.');
      }

      setProfileData(result.data);
      setFormData({
        full_name: result.data.full_name || '',
        school_name: result.data.school_name || ''
      });

    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const token = localStorage.getItem('user_token');
      const response = await fetch('https://edupath-backend.vercel.app/api/v1/profiles/me', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!result.success) {
        let errorMessage = 'Gagal memperbarui profil.';
        if (result.error?.code === 'VALIDATION_ERROR' && Array.isArray(result.error.details)) {
          errorMessage = result.error.details.map(err => err.message).join(', ');
        } else if (typeof result.error?.details === 'string') {
          errorMessage = result.error.details;
        } else if (result.message) {
          errorMessage = result.message;
        }
        throw new Error(errorMessage);
      }

      setProfileData(result.data);
      setIsEditing(false);
      setSuccessMsg('Profil berhasil diperbarui!');
      
      if (result.data.full_name) localStorage.setItem('user_name', result.data.full_name);
      if (result.data.school_name) localStorage.setItem('user_school', result.data.school_name);

      setTimeout(() => setSuccessMsg(''), 3000);

    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // FUNGSI BARU: LOGOUT
  const handleLogout = () => {
    // 1. Hapus semua jejak akun dari memori browser
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_school');
    
    // 2. Arahkan kembali ke Landing Page
    if (onLogout) onLogout();
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  if (isLoading) {
    return <div className="min-h-screen bg-slate-50 flex justify-center items-center font-bold text-blue-600">Memuat Profil...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center text-blue-700 font-bold text-lg">
          <span className="mr-2">🎓</span> EduPath
        </div>
        <button onClick={onBack} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition">
          Tutup
        </button>
      </header>

      <main className="flex-1 flex justify-center py-10 px-4">
        <div className="bg-white w-full max-w-xl rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 relative">
            <div className="absolute -bottom-10 left-8">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl font-extrabold text-blue-600 shadow-md border-4 border-white">
                {getInitials(profileData?.full_name)}
              </div>
            </div>
          </div>

          <div className="pt-14 px-8 pb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{profileData?.full_name || 'Nama Tidak Tersedia'}</h1>
                <p className="text-sm text-slate-500 font-medium">{profileData?.email || 'Email Tidak Tersedia'}</p>
              </div>
              
              {profileData?.is_assessment_completed ? (
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center">
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Asesmen Selesai
                </span>
              ) : (
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center">
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Belum Asesmen
                </span>
              )}
            </div>

            {errorMsg && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-6 border border-red-100">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="bg-green-50 text-green-700 text-sm p-3 rounded-xl mb-6 border border-green-100 font-medium">
                {successMsg}
              </div>
            )}

            {!isEditing ? (
              <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Asal Sekolah</p>
                  <p className="font-semibold text-slate-700">{profileData?.school_name || '-'}</p>
                </div>
                
                {/* BAGIAN TOMBOL BAWAH DIPERBARUI */}
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center flex-wrap gap-4">
                  <button 
                    onClick={handleLogout}
                    className="px-5 py-2.5 bg-white border border-red-200 text-red-600 text-sm font-bold rounded-xl hover:bg-red-50 hover:border-red-300 transition flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Keluar Akun
                  </button>

                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 transition"
                  >
                    Edit Profil
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                  <input 
                    type="text" name="full_name" required value={formData.full_name} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-slate-50 focus:bg-white text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Asal Sekolah</label>
                  <input 
                    type="text" name="school_name" required value={formData.school_name} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-slate-50 focus:bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-1">Email (Tidak bisa diubah)</label>
                  <input type="text" disabled value={profileData?.email} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 text-sm cursor-not-allowed" />
                </div>

                <div className="pt-6 flex justify-end gap-3 border-t border-slate-100 mt-6">
                  <button 
                    type="button" onClick={() => setIsEditing(false)} disabled={isSaving}
                    className="px-6 py-2.5 text-slate-500 text-sm font-bold rounded-xl hover:bg-slate-100 transition"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" disabled={isSaving}
                    className={`px-6 py-2.5 text-white text-sm font-bold rounded-xl shadow-md transition ${isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

export default UserProfilePage;