import React, { useState, useEffect } from "react";
import "./QuestionDescriptive.css";

const QuestionDescriptive = ({ question, initialAnswer, onAnswerChange }) => {
    const [answer, setAnswer] = useState(initialAnswer || "");
    const [error, setError] = useState("");

    useEffect(() => {
        // Update local state when initialAnswer prop changes (e.g., navigating between questions)
        setAnswer(initialAnswer || "");
    }, [initialAnswer]);

   const handleChange = (e) => {
        const newValue = e.target.value;

        if (question.id === 1) {
            if (newValue === "") {
            setAnswer("");
            setError("سن نباید خالی باشد.");
            return;
            }

            const num = Number(newValue);

            if (num < 5 || num > 100) {
            setAnswer(newValue); // مقدار نمایش داده بشه
            setError("سن باید در بازه 5 تا 100 سال باشد.");
            return; // ❌ جواب ثبت نشه
            } else {
            setError("");
            setAnswer(newValue);
            onAnswerChange(newValue); // ✅ فقط وقتی معتبره ذخیره کن
            return;
            }
        }

        setError("");
        setAnswer(newValue);
        onAnswerChange(newValue);
    };

    return (
        <div className="QuestionDescriptive">
            <p className="question_info">
                <span className="question_number">{question.id}</span>
                {question.question}
            </p>
            {question.id === 1
                ? (
                     <div className="answer_inprt_container">
                        <input
                        className="question_answer_input"
                        type="number"
                        placeholder="سن"
                        min={5}
                        max={100}
                        value={answer}
                        onChange={handleChange}
                        />
                        {error && <p className="error-text">{error}</p>}
                    </div>
                ) : (
                    <textarea
                        className="question_answer"
                        placeholder="لطفا پاسخ خود را داخل این کادر وارد نمایید"
                        cols={35}
                        value={answer}
                        onChange={handleChange}
                    ></textarea>
                )
            }
        </div>
    );
};

export default QuestionDescriptive;