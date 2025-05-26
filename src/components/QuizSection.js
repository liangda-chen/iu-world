import { useState, useEffect, useCallback } from 'react';
import { getRandomQuestions } from '../data/quizData';
import iuQuiz from '../assets/iu-quiz.jpg';

export default function QuizSection({ onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isTimeout, setIsTimeout] = useState(false);

  // 初始化時隨機選取10題
  useEffect(() => {
    setQuestions(getRandomQuestions());
  }, []);

  const handleOptionSelect = useCallback(
    (option) => {
      if (questions.length === 0) return;

      setSelectedOption(option);
      setShowFeedback(true);

      const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }

      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setSelectedOption(null);
        } else {
          const finalScore = isCorrect ? score + 1 : score;
          onFinish(finalScore);
        }
      }, 1500);
    },
    [questions, currentQuestionIndex, score, onFinish]
  );

  // 倒計時效果
  useEffect(() => {
    if (questions.length === 0) return;

    if (timeLeft > 0 && !showFeedback && !isTimeout) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback && !isTimeout) {
      setIsTimeout(true);
      handleOptionSelect('');
    }
  }, [timeLeft, showFeedback, isTimeout, questions, handleOptionSelect]);

  // 切換題目時重置計時器
  useEffect(() => {
    if (questions.length === 0) return;
    setTimeLeft(10);
    setIsTimeout(false);
    setShowFeedback(false);
  }, [currentQuestionIndex, questions]);

  if (questions.length === 0) {
    return <div className="loading">題目準備中...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <section className="quiz-section">
      <h2>IU知識測驗 (10題隨機測驗)</h2>
      <img src={iuQuiz} alt="IU Quiz" className="quiz-image" />
      <div className="quiz-progress">
        問題 {currentQuestionIndex + 1}/{questions.length}
        <div className={`timer ${timeLeft <= 3 ? 'warning' : ''}`}>
          剩餘時間: {timeLeft}秒
        </div>
      </div>
      <div className="question-container">
        <h3>{currentQuestion.question}</h3>
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && handleOptionSelect(option)}
              className={`option-button ${
                selectedOption === option
                  ? option === currentQuestion.correctAnswer
                    ? 'correct'
                    : 'incorrect'
                  : ''
              } ${showFeedback || isTimeout ? 'disabled' : ''}`}
              disabled={showFeedback || isTimeout}
            >
              {option}
            </button>
          ))}
        </div>
        {showFeedback && (
          <div className={`feedback ${isTimeout ? 'timeout' : ''}`}>
            {isTimeout ? (
              '⏰ 時間到！正確答案是: ' + currentQuestion.correctAnswer
            ) : selectedOption === currentQuestion.correctAnswer ? (
              '✓ 答對了！'
            ) : (
              `✗ 答錯了！正確答案是: ${currentQuestion.correctAnswer}`
            )}
          </div>
        )}
      </div>
    </section>
  );
}
