import React, { useState, useEffect } from "react";
import "./QuestionPage.css";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Questions from "../../data/questions.json";
import Button from "../../components/common/Button/Button";
import {
  QuestionTest,
  QuestionMultipleChoice,
  QuestionDescriptive,
} from "../../components/questions";

const totalTime = 120;

const QuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const questionId = Number(id);


  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem("quizAnswers");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });


  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    let storedEndTime = localStorage.getItem("quiz_end_time");
    if (!storedEndTime) {
      const endTime = Date.now() + totalTime * 1000;
      localStorage.setItem("quiz_end_time", String(endTime));
      storedEndTime = String(endTime);
    }

    const endTimeNum = Number(storedEndTime);

    const tick = () => {
      const diff = Math.ceil((endTimeNum - Date.now()) / 1000);
      if (diff <= 0) {
        setTimeLeft(0);
        localStorage.removeItem("quiz_end_time");
        localStorage.setItem("finishedItem",false);
        navigate("/thankyou", { state: { timeout: true } });
      } else {
        setTimeLeft(diff);
      }
    };

    tick(); // فوری یک‌بار محاسبه شود
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
  }, [answers]);

  const question = Questions.find((p) => p.id === questionId);
  if (!question) {
    return <div className="question_container">سوالی یافت نشد.</div>;
  }

  const formatTime = (s) => {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };
  const progress = Math.max(0, Math.min(100, (timeLeft / totalTime) * 100));

  const handleAnswerChange = (qid, value, type) => {
    setAnswers((prev) => ({
      ...prev,
      [qid]: type === "multiple-choice" ? value : value,
    }));
  };

  const goPrev = () => {
    if (questionId > 1) navigate(`/questions/${questionId - 1}`);
  };

  const goNext = () => {
    if (questionId < Questions.length) navigate(`/questions/${questionId + 1}`);
  };

  const handleFinishQuiz = () => {
    console.log(answers);
    localStorage.removeItem("quiz_end_time");
    localStorage.setItem('finishedTime',true);
    navigate("/thankyou");
  };

  const renderQuestion = () => {
    const currentAnswer = answers[questionId] ?? null;
    switch (question.type) {
      case "descriptive":
        return (
          <QuestionDescriptive
            question={question}
            initialAnswer={currentAnswer}
            onAnswerChange={(v) =>
              handleAnswerChange(question.id, v, "descriptive")
            }
          />
        );
      case "multiple-choice":
        return (
          <QuestionMultipleChoice
            question={question}
            initialAnswer={currentAnswer || []}
            onAnswerChange={(v) =>
              handleAnswerChange(question.id, v, "multiple-choice")
            }
          />
        );
      case "test":
        return (
          <QuestionTest
            question={question}
            initialAnswer={currentAnswer}
            onAnswerChange={(v) => handleAnswerChange(question.id, v, "test")}
          />
        );
      default:
        return <div>نوع سوال ناشناخته است.</div>;
    }
  };

  return (
    <div className="questionPage">
      <div className="questionPage__top">
        <div className="timer">
          <div className="timer__bar">
            <div
              className="timer__fill"
              style={{ width: `${progress}%` }}
              aria-label="time progress"
            />
          </div>
          <div className="timer__text">{formatTime(timeLeft)}</div>
        </div>
      </div>

      <div className="question_container">
        <AnimatePresence mode="wait">
          <motion.div
            key={questionId}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
          >
            {renderQuestion()}
          </motion.div>
        </AnimatePresence>

        <div className="nav-buttons">
          <Button
            className="goPrev primary--btn"
            handleClick={goPrev}
            disabled={questionId === 1 || timeLeft <= 0}
          >
            قبلی
          </Button>

          <div className="question_numbers--container">
            <div className={`questionNumber ${Number(id) === 1 ? "activeQuestion" : ""}`}>1</div>
            <div className={`questionNumber ${Number(id) === 2 ? "activeQuestion" : ""}`}>2</div>
            <div className={`questionNumber ${Number(id) === 3 ? "activeQuestion" : ""}`}>3</div>
            <div className={`questionNumber ${Number(id) === 4 ? "activeQuestion" : ""}`}>4</div>
            <div className={`questionNumber ${Number(id) === 5 ? "activeQuestion" : ""}`}>5</div>
            <div className={`questionNumber ${Number(id) === 6 ? "activeQuestion" : ""}`}>6</div>
            <div className={`questionNumber ${Number(id) === 7 ? "activeQuestion" : ""}`}>7</div>
            <div className={`questionNumber ${Number(id) === 8 ? "activeQuestion" : ""}`}>8</div>
            <div className={`questionNumber ${Number(id) === 9 ? "activeQuestion" : ""}`}>9</div>
            <div className={`questionNumber ${Number(id) === 10 ? "activeQuestion" : ""}`}>10</div>
          </div>

          {questionId === Questions.length ? (
            <Button
              className="primary--btn"
              handleClick={handleFinishQuiz}
              disabled={timeLeft <= 0}
            >
              اتمام آزمون
            </Button>
          ) : (
            <Button
              className="goNext primary--btn"
              handleClick={goNext}
              disabled={questionId === Questions.length || timeLeft <= 0}
            >
              بعدی
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
