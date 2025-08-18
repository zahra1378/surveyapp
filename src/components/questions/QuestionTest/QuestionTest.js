import React, { useState, useEffect } from "react";
import "./QuestionTest.css";

const QuestionTest = ({ question, initialAnswer, onAnswerChange }) => {
    const [selectedOption, setSelectedOption] = useState(initialAnswer || "");

    useEffect(() => {
        // Update local state when initialAnswer prop changes
        setSelectedOption(initialAnswer || "");
    }, [initialAnswer]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setSelectedOption(newValue);
        onAnswerChange(newValue);
    };

    return (
        <div className="QuestionTest">
            <p className="question_info">
                <span className="question_number">{question.id}</span>
                {question.question}
            </p>
            <div className="question--options">
                {question.options.map((item, index) => (
                    <label key={index} className="question--label__option">
                        <input
                            type="radio"
                            className="question--radio__option"
                            name={`q-${question.id}`}
                            value={item} // Change value to item itself for easier storage
                            checked={selectedOption === item}
                            onChange={handleChange}
                        />
                        {item}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default QuestionTest;