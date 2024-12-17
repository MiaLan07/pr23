import {useState} from "react";
import {Header} from "./Elemets_Todo/header";
import {Inputzadach} from "./Elemets_Todo/inputzadach";
import {TaskList} from "./Elemets_Todo/tasklist";
import "./App.css"

export function App() {
    const [todo, setTodo] = useState("")
    const [tasks, setTasks] = useState([])
    const [done, setDone] = useState("")

    let copiTasks = tasks

    const dobavTask = () => {
        if (todo === '' || todo === ' ') {
            alert("Введите задачу")
            return
        }
        const taskTodo = {
            id: Math.random(),
            value: todo,
            status: false
        }
        let newzadach = [
            taskTodo, ...tasks
        ]
        setTasks(newzadach)
        setTodo("")
    }

    const deleteTask = (id) => {
        let del = tasks.filter(e => e.id !== id)
        setTasks(del)
    }

    const complitedTask = (id) => {
        let complited = tasks.map(
            e => e.id === id
                ? {
                    ...e,
                    status: !e.status
                }
                : {
                    ...e
                }
        )
        setTasks(complited)
    }

    switch (done) {
        case "All":
            copiTasks = tasks
            break;
        case "Activs":
            copiTasks = tasks.filter(e => e.status === false)
            break;
        case "compliteds":
            copiTasks = tasks.filter(e => e.status === true)
            break;
        default:
            break;
    }

    const zadachi = copiTasks.map(
        e => <TaskList
            id={e.id}
            value={e.value}
            status={e.status}
            deleteTask={deleteTask}
            complitedTask={complitedTask}/>
    )



    return (
        <> < div className = "content" > <Header/>
        <Inputzadach dobavTask={dobavTask} todo={todo} setTodo={setTodo}/>
        <div className="zadachis">{zadachi}</div>
        <div className="filter">
            <button onClick={() => setDone("All")}>Все</button>
            <button onClick={() => setDone("Activs")}>Активные</button>
            <button onClick={() => setDone("compliteds")}>Выполнениые</button>
        </div>
    </div>
</>
    )
}