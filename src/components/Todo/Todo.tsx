import useTasks from "../../utils/useTasks";
import AddTodo from "../AddTodo";
import TodoList from "../TodoList";
import CustomSwitch from "./CustomSwitch";
import './Todo.scss';




const Todo = () => {

  const {
		theme,
		sortedTasks,
		toggleTheme,
		newTaskTitle,
		setNewTaskTitle,
		inputRef,
		sortBy,
		setSortBy,
		addTask,
		completeEditTask,
		toggleTaskComplete,
		deleteTask,
		deleteAllTasks,
	} = useTasks()

  return (
    <div className='todo' data-theme={theme === 'Dark' ? 'dark' : 'light'}>
      <div className="todo__switch-container">
        <CustomSwitch 
          onChange={toggleTheme}
          defaultChecked={false}
          checked={theme === 'Dark' ? true : false}
        />
      </div>
      <h1 className='todo__title'>To Do App</h1>
      <AddTodo
        newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle}
        addTask={addTask}
        inputRef={inputRef}
      />
      <div className="todo__controls">
        <select
          className="todo__sort-select"
          value={sortBy}
          disabled={sortedTasks.length === 0}
          onChange={(event) => {
            const value = event.target.value
            if (value === "Newest" || value === "Oldest") {
              setSortBy(value)
            } 
          }
        }
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>  
        <button 
          className="delete-all-tasks"
          onClick={deleteAllTasks}
          disabled={sortedTasks.length === 0}
        >
            Delete All
        </button>
      </div>
      <TodoList 
        tasks={sortedTasks} 
        toggleTaskComplete={toggleTaskComplete}
        deleteTask={deleteTask}
        completeEditTask={completeEditTask}
      />
    </div>
  )
}

export default Todo