interface TodoItemProps {
  id: string,
  children: string,
  isDone: boolean,
  createdAt: Date,
}

const TodoItem = (props: TodoItemProps) => {
  const {
    id,
    children,
    isDone,
  } = props


  return (
    <label>
      <input
        type="checkbox"
        checked={isDone}
        id={id}
      />
      {children}
    </label>
  )

}

export default TodoItem