import React, { useState } from 'react';
import "./Form.css";
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [name, setName] = useState(" ");
    const navigate = useNavigate();

    const handleChangeName = (e) => {
        setName(e.target.value);
        localStorage.setItem('name',name)
    };

    const handleSubmitName = (e) => {
        e.preventDefault(); 
        //localStorage.clear();
        localStorage.setItem('name', name);
        navigate('/home'); 
    };

    return (
        <section>
            <form onSubmit={handleSubmitName} className='form-input'> 
                <h1 className='greet'>Welcome</h1>
                <h1 className="info">Enter Your name?</h1>
                <input type="text" className='input-name' value={name} onChange={handleChangeName}/>
            </form>
        </section>
    );
};

export default Form;
