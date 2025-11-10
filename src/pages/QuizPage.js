import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { courses } from "../data/courses";
import { useAppContext } from "../context/AppContext";

function QuizPage() {
  const { id } = useParams();
  const { setQuizScore } = useAppContext();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const found = courses.find((c) => c.id === parseInt(id));
    setCourse(found);
    setTimeout(() => setLoading(false), 800); // simulation du chargement
  }, [id]);

  const handleAnswer = (index) => setSelectedAnswer(index);

  const nextQuestion = () => {
    if (selectedAnswer === course.quiz[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < course.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizScore(score + (selectedAnswer === course.quiz[currentQuestion].answer ? 1 : 0));
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  if (loading) {
    return (
      <div className="text-center mt-5 pt-5 text-secondary">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Chargement du quiz...</p>
      </div>
    );
  }

  if (!course || !course.quiz) {
    return <p className="text-center text-danger mt-5">Cours ou quiz introuvable.</p>;
  }

  const progress = ((currentQuestion + 1) / course.quiz.length) * 100;

  // ✅ Résultat du quiz
  if (showResult) {
    return (
      <div className="container mt-5 pt-5 text-center quiz-result animate-fade">
        <h1 className="text-primary mb-4">Résultat du Quiz</h1>
        <div
          className="card p-4 shadow-lg bg-light border-0 mx-auto"
          style={{ maxWidth: "400px" }}
        >
          <h4>{course.title}</h4>
          <p className="mt-3 fs-5 text-secondary">
            Score : <strong>{score}</strong> / {course.quiz.length}
          </p>
          <div className="progress my-3" style={{ height: "10px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${(score / course.quiz.length) * 100}%` }}
            ></div>
          </div>
          <button className="btn btn-primary mt-3" onClick={restartQuiz}>
            🔁 Rejouer le Quiz
          </button>
        </div>
      </div>
    );
  }

  // ✅ Page du quiz
  return (
    <div className="container mt-5 pt-5 quiz-page animate-slide">
      <div className="card shadow-lg p-4 border-0 bg-light">
        <h2 className="text-primary mb-3">{course.title}</h2>

        <div className="progress mb-4" style={{ height: "10px" }}>
          <div
            className="progress-bar bg-brown"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <h4 className="mb-3 text-dark">
          {course.quiz[currentQuestion].question}
        </h4>

        {course.quiz[currentQuestion].options.map((option, index) => (
          <div key={index} className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="answer"
              id={`option${index}`}
              checked={selectedAnswer === index}
              onChange={() => handleAnswer(index)}
            />
            <label
              className="form-check-label"
              htmlFor={`option${index}`}
              style={{
                cursor: "pointer",
                color: selectedAnswer === index ? "#1E3A8A" : "#333",
                fontWeight: selectedAnswer === index ? "bold" : "normal",
                transition: "0.3s",
              }}
            >
              {option}
            </label>
          </div>
        ))}

        <button
          className="btn btn-primary mt-3 w-100"
          onClick={nextQuestion}
          disabled={selectedAnswer === null}
        >
          {currentQuestion === course.quiz.length - 1
            ? "Voir le Résultat"
            : "Question Suivante"}
        </button>
      </div>
    </div>
  );
}

export default QuizPage;