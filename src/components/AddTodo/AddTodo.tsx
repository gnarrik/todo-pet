import type { ChangeEvent, FormEvent, RefObject } from "react";
import { memo, useMemo } from "react";
import IconAddTask from '../../assets/icons/add-plus.svg?react';
import './AddTodo.scss';

type AddTodoProps = {
  newTaskTitle: string,
  setNewTaskTitle: (value: string) => void,
  addTask: () => void,
  inputRef: RefObject<HTMLInputElement | null>,
}

const AddTodo = (props: AddTodoProps) => {
  const {
    newTaskTitle,
    setNewTaskTitle,
    addTask,
    inputRef,
  } = props

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()
    addTask()
  }

  const icon = useMemo(() => <IconAddTask />, [])

  return (
    <form className='add-todo__form' onSubmit={onSubmit}>
      <input
        className='add-todo__input'
        value={newTaskTitle}
        type='text'
        placeholder='Write your task'
        ref={inputRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(event.target.value)}
      />
      <button
        className='add-todo__button'
        type="submit"
        disabled={newTaskTitle.trim().length === 0}
      >
        {icon}
      </button>
    </form>
  )
}

export default memo(AddTodo)