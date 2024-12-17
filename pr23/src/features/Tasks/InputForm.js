
export default function InputForm({ task, handleTask, addTask, ref}) {
    function onClickInput(event) {
        if(event.key === 'Enter') {
            addTask()
        }
    }
    return (
        <>
            <input ref={ref} value={task.task} onChange={handleTask} onKeyDown={onClickInput} placeholder="Введите задачу"/>
            <button onClick={addTask}>Добавить задачу</button>
        </>
    )
}