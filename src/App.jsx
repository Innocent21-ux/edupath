import React, { useState } from 'react';
import LandingPage from './component/LandingPage';
import OnboardingPage from './component/OnboardingPage';
import AssessmentForm from './component/AssessmentForm';
import PsychometricForm from './component/PsychometricForm'
import ResultPage from './component/ResultPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  if (currentPage === 'landing') {
    return <LandingPage onStart={() => setCurrentPage('onboarding')} />;
  }

  if (currentPage === 'onboarding') {
    return <OnboardingPage onNext={() => setCurrentPage('assessment_step1')} />;
  }

  if (currentPage === 'assessment_step1') {
    return (
      <AssessmentForm onBack={() => setCurrentPage('onboarding')} 
        onNext={() => setCurrentPage('assessment_step2')} 
      />
    );
  }

  if (currentPage === 'assessment_step2') {
    return (
      <PsychometricForm onBack={() => setCurrentPage('assessment_step1')} 
        onSubmit={() => setCurrentPage('result')} 
      />
    );
  }

  if (currentPage === 'result') {
    return (
      <ResultPage 
        // Mengarahkan tombol Coba Ulang kembali ke Step 1 (Sesuai permintaan Anda)
        onRetry={() => setCurrentPage('assessment_step1')}
        // Mengarahkan tombol Kembali
        onBack={() => setCurrentPage('landing')}
      />
    );
  }

  return null;
}

export default App;