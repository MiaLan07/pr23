import { useState } from "react"

export default function Task({ task, completeTask, redactTask, deleteTask }) {
    const [editText, setEditText] = useState(task.task)
    return (
        <div className={task.completed ? 'completed task' : 'task'}>
            <a onClick={() => completeTask(task)}>{task.completed ? 'Выполнено' : 'Выполнить'}</a>
            {task.editable ? (
                <>
                    <input value={editText} onChange={(e) => setEditText(e.target.value)}></input>
                    <button onClick={() => redactTask(task, false, editText)}>Закончить редактирование</button>
                </>)
                :(<>
                
                    <p>{task.task}</p>
                    <button onClick={() => redactTask(task, true)}>Редактировать</button>
                    <button onClick={() => deleteTask(task)} className='delBtn'>Удалить</button>
            </>)}
            
        </div>
    )
}