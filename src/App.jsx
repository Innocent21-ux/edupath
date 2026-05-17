import React, { useState } from 'react';
import LandingPage from './component/LandingPage';
import OnboardingPage from './component/OnboardingPage';
import AssessmentForm from './component/AssessmentForm';
import PsychometricForm from './component/PsychometricForm'
import ResultPage from './component/ResultPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  
  // State untuk menyimpan aliran data
  const [academicData, setAcademicData] = useState(null);
  const [resultData, setResultData] = useState(null);
  
  // TAMBAHAN BARU: State untuk menyimpan data kebiasaan dari Step 2
  const [behavioralData, setBehavioralData] = useState(null);

  if (currentPage === 'landing') {
    return <LandingPage onStart={() => setCurrentPage('onboarding')} />;
  }

  if (currentPage === 'onboarding') {
    return <OnboardingPage onNext={() => setCurrentPage('assessment_step1')} />;
  }

  if (currentPage === 'assessment_step1') {
    return (
      <AssessmentForm 
        onBack={() => setCurrentPage('onboarding')} 
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
        academicData={academicData} //Lempar data Step 1 ke Step 2
        onBack={() => setCurrentPage('assessment_step1')} 
        
        // UPDATE: Sekarang menerima 2 data (Balasan API dan Data Inputan Form)
        onSubmitSuccess={(apiResponse, payloadStep2) => { 
          setResultData(apiResponse); //Simpan balasan dari Postman/Backend
          setBehavioralData(payloadStep2); //Simpan data jam belajar/absen dari UI
          setCurrentPage('result');
        }} 
      />
    );
  }

  if (currentPage === 'result') {
    return (
      <ResultPage
        resultData={resultData} // sdata Postman ke halaman Hasil
        academicData={academicData} // data nilai rapor
        behavioralData={behavioralData} // data kebiasaan
        onRetry={() => {
          // Reset semua data jika user mengulang
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