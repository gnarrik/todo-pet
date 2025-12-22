import {useState} from "react";
import TodoItem from "../TodoItem";

interface Task {
  id: string,
  title: string,
  isDone: boolean,
  createdAt: Date,
}

const TodoList = () => {
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: 'Погладить кота',
      isDone: true,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Погладить собаку',
      isDone: false,
      createdAt: new Date(),
    },
  ])


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {tasks.map(({id, title, isDone, createdAt}: Task) => (
        <TodoItem
          id={id} isDone={isDone} createdAt={createdAt} key={id}
        >
          {title}
        </TodoItem>
      ))}
    </div>
  )
}

export default TodoList