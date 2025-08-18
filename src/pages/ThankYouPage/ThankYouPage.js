import React, { useState, useEffect } from "react";
import './ThankYouPage.css';
import { FaCheckCircle } from "react-icons/fa";
import Button from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";
const ThankYouPage = ()=> {

    const navigate = useNavigate();
    const userName = localStorage.getItem("username");
    const [finishedState, setFinishedState] = useState(null);

    useEffect(()=> {
        const val = localStorage.getItem("finishedTime");
        setFinishedState(val === "true");
    },[]);


    const StartNewSurvey=()=>{
        navigate("/");
    }
    return(
        <div className="ThankYouPage">
            <div className="ThankYouPage--container">
                <FaCheckCircle className="ThankYouPage--icon" />
                <h3 className="ThankYouPage--title">{userName} عزیز متشکریم!</h3>
                <p className="ThankYouPage--text">
                    {finishedState 
                        ? "نظرسنجی با موفقیت به پایان رسید. از پاسخگویی شما سپاسگزاریم."
                        : "زمان شما به پایان رسید. با تشکر از زمانیکه جهت پاسخ به نظر سنجی گذاشتید."
                    }
                </p>
                <Button className="primary--btn" handleClick={StartNewSurvey}>شروع مجدد</Button>
            </div>
        </div>
    );
};

export default ThankYouPage;