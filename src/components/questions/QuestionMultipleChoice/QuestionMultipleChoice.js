import React, { useState, useEffect } from "react";
import "./QuestionMultipleChoice.css";

const QuestionMultipleChoice = ({ question, initialAnswer, onAnswerChange }) => {
    // initialAnswer is expected to be an array of selected options
    const [selectedOptions, setSelectedOptions] = useState(initialAnswer);

    useEffect(() => {
        // Update local state when initialAnswer prop changes
        setSelectedOptions(initialAnswer || []);
    }, [initialAnswer]);

    const handleChange = (e) => {
        const value = e.target.value;
        let newSelectedOptions;
        if (e.target.checked) {
            newSelectedOptions = [...selectedOptions, value];
        } else {
            newSelectedOptions = selectedOptions.filter((option) => option !== value);
        }
        setSelectedOptions(newSelectedOptions);
        onAnswerChange(newSelectedOptions);
    };

    return (
        <div className="QuestionMultipleChoice">
            <p className="question_info">
                <span className="question_number">{question.id}</span>
                {question.question}
            </p>
            <div className="question--options">
                {question.options.map((item, index) => (
                    <label key={index} className="question--label__option">
                        <input
                            type="checkbox"
                            className="question--radio__option"
                            name={`q-${question.id}`}
                            value={item}
                            checked={selectedOptions.includes(item)}
                            onChange={handleChange}
                        />
                        {item}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default QuestionMultipleChoice;