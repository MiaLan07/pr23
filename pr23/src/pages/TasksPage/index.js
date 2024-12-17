import React, { useEffect, useState, useRef } from 'react'
import TaskDispl from '../../features/Tasks/TaskDispl'
import InputForm from '../../features/Tasks/InputForm'


export default function TaskPage() {
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState({task: '', completed: false, editable: false})
    const inputRef = useRef(null)
    const countAdded = useRef(0)

    function handleTask(event) {
        setTask(prevTask => { return {...prevTask, task: event.target.value}})
    }

    function addTask() {
        if(task.task !== '' && proverka(task)) {
            setTasks((prevTasks) => [...prevTasks, task])
            setTask(prevTask => {return {...prevTask, task: ''}})
            inputRef.current.focus()
            countAdded.current += 1
        } else if(!proverka(task)) {
            alert("Уже есть задача с таким названием!")
            inputRef.current.focus()
        } else {
            alert("Пустую задачу не добавлю! :р")
            inputRef.current.focus()
        }
    }

    function completeTask(taska) {
        setTasks((prevTasks) => {
            return [...prevTasks].map((t) => {
                if(t.task === taska.task && t.completed === taska.completed) {
                    return {...t, completed: !t.completed}
                }
                return t
            })
        })
    }

    function redactTask(taska, redact = false, editText = '') {
        if(redact) {
            setTasks((prevTasks) => {
                const updTask = [...prevTasks]
                return updTask.map((t) => {
                    if(t.task === taska.task && t.editable === taska.editable) {
                        return {...t, editable: !t.editable}
                    }
                    return t
                })
            })
        } else{
            setTasks((prevTasks) => {
                return [...prevTasks].map((t) => {
                    if(t.task === taska.task) {
                        return {...t, task: editText, editable: false}
                    }
                    return t;
                })
            })
        }
    }

    function deleteTask(taska) {
        if(window.confirm('Вы уверены что хотите удалить задачу?')) {
            setTasks((prevTasks) => {
                const updTask = prevTasks.filter((t) => !(t.task === taska.task && t.completed === taska.completed))
                return updTask
            })
        }
    }

    function dispCompleted() {
        setTasks((prevTasks) => {
            return [...prevTasks].sort((a,b) => b.completed - a.completed)
        })
    }

    function dispNotComplet() {
        setTasks((prevTasks) => {
            return [...prevTasks].sort((a,b) => a.completed - b.completed)
        })
    }

    function proverka(taska) {
        let exist = tasks.some(task => task.task === taska.task)
        return (!exist)
    }

    

    return (
        <>
            <h1>Задачи!</h1>
            <p>Всего задач было добавлено: {countAdded.current}</p>
            <InputForm task={task} handleTask={handleTask} addTask={addTask} ref={inputRef}></InputForm>
            <button onClick={dispCompleted}>Выполненные</button>
            <button onClick={dispNotComplet}>Не выполненные</button>
            <TaskDispl tasks={tasks} completeTask={completeTask} redactTask={redactTask} deleteTask={deleteTask}></TaskDispl>
            
        </>
    )
}