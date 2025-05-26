import { useState } from 'react';
import Header from './components/Header';
import ProfileSection from './components/ProfileSection';
import QuizSection from './components/QuizSection';
import ResultSection from './components/ResultSection';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setShowQuiz(true);
    setShowResult(false);
    setScore(0);
  };

  const finishQuiz = (finalScore) => {
    setScore(finalScore);
    setShowQuiz(false);
    setShowResult(true);
  };

  return (
    <div className="app">
      <Header />
      {!showQuiz && !showResult && (
        <ProfileSection onStartQuiz={startQuiz} />
      )}
      {showQuiz && (
        <QuizSection onFinish={finishQuiz} />
      )}
      {showResult && (
        <ResultSection score={score} onRestart={startQuiz} />
      )}
    </div>
  );
}

export default App;