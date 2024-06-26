import React, { useState, useEffect } from 'react';
import './Home.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";

const Home = () => {
    const [time, setTime] = useState(getFormattedTime());
    const [message, setMessage] = useState('');
    //const [goal, setGoal] = useState('');
    const [goalEntered, setGoalEntered] = useState(false);
    const [task, setTask] = useState({ text: '', completed: false });
    const [showDropdown, setShowDropdown] = useState(false); 
    const [name, setName] = useState(" ");
    
    

    //console.log(name);
    // localStorage.setItem('name',name);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(getFormattedTime());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setMessage(getMessage());
    }, []);

    function getFormattedTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    function getMessage() {
        const timeNow = new Date().getHours();
        if (timeNow >= 5 && timeNow < 11) {
            return 'Good Morning';
        } else if (timeNow >= 11 && timeNow < 14) {
            return 'Good Afternoon';
        } else if (timeNow >= 14 && timeNow < 16) {
            return 'Good Evening';
        } else {
            return 'Good Night';
        }
    }

    function handleGoalChange(event) {
        const enteredGoal = event.target.value;
        setTask({text:enteredGoal,completed:false})
        //setGoal(enteredGoal);
    }
    
    function handleGoalSubmit(event) {
        //event.preventDefault();
        // const goal = event.target.value;
        // console.log(goal)
        console.log(task.goal)
        //setTask({ text: goal , completed: false });
        setGoalEntered(true);
        //setGoal('');
        toast.info("Task added!");
        
    }

    function handleTaskCompletion() {
        setTask({ ...task, completed: !task.completed });
        if (!task.completed) {
            toast.success("Task completed!");
            // setTimeout(() => {
            //     setGoalEntered(false);
            // }, 2000);
        }
    }

    function toggleDropdown() {
        setShowDropdown(!showDropdown); 
    }

    function editTask() {
        setShowDropdown(false);
        //setGoal(task.text); 
        setGoalEntered(false);     
    }

    function deleteTask() {
        setShowDropdown(false);
        setGoalEntered(false); 
        setTask({text:'',completed:false})
        toast.warn("Task deleted!");

    }

    const handleChangeName = (e) => {
        setName(e.target.value);
        //localStorage.setItem('name',name)
    };

    const handleSubmitName = (e) => {
        e.preventDefault(); 
        //localStorage.clear();
        setName(e.target.value)
        localStorage.setItem('name', name);
        //navigate('/home'); 

    };

    const editName = () =>  {
        localStorage.clear();
        setName('');
    }

    return (
        <section>
            {(localStorage.getItem('name') === null) ? 
            <form onSubmit={handleSubmitName} className='form-input'> 
                <h1 className='greet'>Welcome</h1>
                <h1 className="info">Enter Your name?</h1>
                <input type="text" className='input-name' value={name} onChange={handleChangeName}/>
            </form> 
            : 
            <>
                <ToastContainer position="top-center" autoClose={3000} />
                <button className='edit-name tooltip' onClick={editName}><IoSettings/><span class="tooltiptext">Edit Name</span></button>
                <div className='time-container'>
                    <h1 className='time'>{time}</h1>
                    <h2>{message}, {localStorage.getItem('name')}</h2>
                    {goalEntered ? (
                        <div className='task'>
                            <label className={task.completed ? 'completed' : ''}>
                                <input type="checkbox" checked={task.completed} onChange={handleTaskCompletion} />
                                {task.completed ? <del>{task.text}</del> : task.text}
                            </label>
                            <div className="dropdown">
                                <button className="dropbtn" onClick={toggleDropdown}><BsThreeDotsVertical /></button>
                                {showDropdown && (
                                    <div className="dropdown-content">
                                        <button onClick={editTask}>Edit</button>
                                        <button onClick={deleteTask}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleGoalSubmit}>
                            <label htmlFor="todo">What is your main goal today?</label>
                            <input type='text' className='input'  value={task.text} onChange={handleGoalChange} />
                        </form>
                    )}
                </div>
            </>}
        </section>
    );
};

export default Home;
