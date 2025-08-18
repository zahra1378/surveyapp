import React, { useState, useEffect } from "react";
import './WelcomePage.css';
import Button from '../../components/common/Button/Button';
import { useNavigate } from "react-router-dom";

const WelcomePage = ()=> {
    const [name, setName] = useState("");   
    const navigate = useNavigate();
    const [error, setError] = useState("");
    

    useEffect(() => {
        localStorage.setItem('quizAnswers', []);
    }, []);
    const submitForm = (event)=>{
        event.preventDefault();

        if(!name.trim()) {
            setError("لطفا نام خود را وارد کنید.");
            return;
        }

        if(name.trim().length < 8) {
            setError("نام باید حداقل ۸ کاراکتر باشد.");
            return;
        }
        setError("");
        localStorage.setItem("username", name.trim());
        localStorage.setItem("finishedTime",'');
        navigate("/questions/1");
    }
    return(
        <div className="WelcomePage">
            <form className="WelcomePage--form" onSubmit={submitForm}>
                <h3 className="WelcomePage__title">به نظرسنجی رایکا خوش آمدید</h3>
                <p className="WelcomePage__text"> شما ۲ دقیقه برای پاسخ به سوالات فرصت دارید.<br/>برای شروع، لطفا نام خود را وارد کنید.</p>
                <input 
                    type="text" 
                    className="form--name__inp" 
                    placeholder="نام و نام خانوادگی" 
                    value={name}
                    onChange={(e)=> setName(e.target.value)} 
                />
                {error && <p className="error-text">{error}</p>}
                <Button className="primary--btn form_btn" type="submit" >شروع نظرسنجی</Button>
            </form>
        </div>
    );
};

export default WelcomePage;