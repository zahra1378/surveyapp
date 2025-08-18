import React, { useState, useEffect } from "react";
import "./QuestionDescriptive.css";

const QuestionDescriptive = ({ question, initialAnswer, onAnswerChange }) => {
    const [answer, setAnswer] = useState(initialAnswer || "");

    useEffect(() => {
        // Update local state when initialAnswer prop changes (e.g., navigating between questions)
        setAnswer(initialAnswer || "");
    }, [initialAnswer]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setAnswer(newValue);
        onAnswerChange(newValue);
    };

    return (
        <div className="QuestionDescriptive">
            <p className="question_info">
                <span className="question_number">{question.id}</span>
                {question.question}
            </p>
            <textarea
                className="question_answer"
                placeholder="لطفا پاسخ خود را داخل این کادر وارد نمایید"
                cols={35}
                value={answer}
                onChange={handleChange}
            ></textarea>
        </div>
    );
};

export default QuestionDescriptive;