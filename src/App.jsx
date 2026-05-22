import React, { useState } from 'react';
import LandingPage from './component/LandingPage';
import OnboardingPage from './component/OnBoardingPage';
import AssessmentForm from './component/AssessmentForm';
import PsychometricForm from './component/PsychometricForm'
import ResultPage from './component/ResultPage';
import LoadingPage from './component/LoadingPage';
import AnalysisLoading from './component/LoadingPage';
import Login from './component/Login'; 
import Register from './component/Register';
import UserProfilePage from './component/UserProfilePage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [academicData, setAcademicData] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [behavioralData, setBehavioralData] = useState(null);


  if (currentPage === 'landing') {
    return (
      <LandingPage 
        onStart={() => setCurrentPage('onboarding')} 
        onLoginClick={() => setCurrentPage('login')} 
        onRegisterClick={() => setCurrentPage('register')} 
        onProfileClick={() => setCurrentPage('profile')}   
      />
    );
  }

  if (currentPage === 'login') {
    return (
      <Login 
        onLoginSuccess={() => setCurrentPage('landing')} 
        onNavigateRegister={() => setCurrentPage('register')}
        onBack={() => setCurrentPage('landing')} 
      />
    );
  }

  if (currentPage === 'register') {
    return (
      <Register 
        onRegisterSuccess={() => setCurrentPage('login')} 
        onLoginClick={() => setCurrentPage('login')}
        onBack={() => setCurrentPage('landing')} 
      />
    );
  }

  if (currentPage === 'profile') {
    return (
      <UserProfilePage 
        onBack={() => setCurrentPage('landing')} 
        onLogout={() => setCurrentPage('landing')} 
      />
    );
  }

  if (currentPage === 'onboarding') {
    return <OnboardingPage onNext={() => setCurrentPage('assessment_step1')}
    onBack={() => setCurrentPage('landing')}
    onProfileClick={() => setCurrentPage('profile')} />;
  }

  if (currentPage === 'assessment_step1') {
    return (
      <AssessmentForm 
        onBack={() => setCurrentPage('onboarding')} // Tombol Home menuju beranda
        onProfileClick={() => setCurrentPage('profile')} // Avatar profil 
        onNext={(data) => {
          setAcademicData(data); //Simpan data nilai dari Step 1
          setCurrentPage('assessment_step2');
        }} 
      />
    );
  }

  if (currentPage === 'assessment_step2') {
    return (
      <PsychometricForm
        academicData={academicData}
        onBack={() => setCurrentPage('assessment_step1')}
        onProfileClick={() => setCurrentPage('profile')} // Avatar profil
        onBack={(target) => {
          if (target === 'home') {
            setCurrentPage('landing'); // Jika klik tulisan Home di header
          } else {
            setCurrentPage('assessment_step1'); // Jika klik tombol Kembali di bawah
          }
        }} 
        
        onSubmitSuccess={(apiResponse, payloadStep2) => { 
          setResultData(apiResponse); 
          setBehavioralData(payloadStep2); 
          setCurrentPage('loading'); 

          setTimeout(() => {
            setCurrentPage('result');
          }, 3500);
        }} 
      />
    );
  }

  if (currentPage === 'loading') {
    return <LoadingPage />;
  }

  if (currentPage === 'result') {
    return (
      <ResultPage
        resultData={resultData}
        academicData={academicData}
        behavioralData={behavioralData}
        onRetry={() => {
          setAcademicData(null);
          setResultData(null);
          setBehavioralData(null); 
          setCurrentPage('assessment_step1');
        }}
        onBack={() => setCurrentPage('landing')}
      />
    );
  }

  return null;
}

export default App;