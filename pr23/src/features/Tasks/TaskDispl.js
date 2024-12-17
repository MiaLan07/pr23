import Task from '../../shared/ui/Task'


export default function TaskDispl( { tasks, completeTask, redactTask, deleteTask } ) {
    return (
        <ul className='tasks'>
            {tasks.map((task, ind) => (
                    <Task task={task} completeTask={completeTask} redactTask={redactTask} deleteTask={deleteTask} key={ind}></Task>
            ))}
        </ul>
    )
}