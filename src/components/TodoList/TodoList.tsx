import { memo } from 'react';
import type { Task } from '../../types/Task.ts';
import TodoItem from "../TodoItem";
import './TodoList.scss';


type TodoListProps = {
  tasks: Task[],
  toggleTaskComplete: (taskId: string, isDone: boolean) => void,
  deleteTask: (taskId: string) => void,
  completeEditTask: (editedTitle: string, id: string) => void,
}

const TodoList = (props: TodoListProps) => {
  

  const {
    tasks,
    toggleTaskComplete,
    deleteTask,
    completeEditTask,
    // sortBy,
  } = props


  return (
    <div className="todo-list">
      {tasks.map(({id, title, isDone, createdAt}: Task) => (
        <TodoItem
          id={id} 
          isDone={isDone} 
          createdAt={createdAt} 
          key={id}
          toggleTaskComplete={toggleTaskComplete}
          deleteTask={deleteTask}
          completeEditTask={completeEditTask}
        >
          {title}
        </TodoItem>
      ))}
    </div>
  )
}

export default memo(TodoList)