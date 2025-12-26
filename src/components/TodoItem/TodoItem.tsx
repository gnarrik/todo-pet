import { memo, useEffect, useMemo, useRef, useState } from 'react';
import IconDeleteTask from '../../assets/icons/delete-task.svg?react';
import IconEditTask from '../../assets/icons/edit-task.svg?react';
import EditTodo from '../EditTodo';
import './TodoItem.scss';


type TodoItemProps = {
  id: string,
  children: string,
  isDone: boolean,
  createdAt: Date,
  toggleTaskComplete: (taskId: string, isDone: boolean) => void,
  deleteTask: (taskId: string) => void,
  completeEditTask: (editedTitle: string, id: string) => void,
}

const TodoItem = (props: TodoItemProps) => {
  
  const {
    id,
    children,
    isDone,
    createdAt,
    toggleTaskComplete,
    deleteTask,
    completeEditTask,
  } = props

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editingTaskTitle, setEditingTaskTitle] = useState<string>(children)
  const editInputRef = useRef<HTMLInputElement | null>(null)
  const todoItemRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setEditingTaskTitle(children)
  }, [children])

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [isEditing])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isEditing && todoItemRef.current && !todoItemRef.current.contains(event.target as Node)) {
        setEditingTaskTitle(children)
        setIsEditing(false)
      }
    }

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing, children])

  const handleSave = () => {
    if (editingTaskTitle.trim().length > 0) {
      completeEditTask(editingTaskTitle, id)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditingTaskTitle(children)
    setIsEditing(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave()
    } else if (event.key === 'Escape') {
      handleCancel()
    }
  }

  const editIcon = useMemo(() => <IconEditTask className='edit-button__icon'/>, [])

  const deleteIcon = useMemo(() => <IconDeleteTask className='delete-button__icon'/>, [])

  return (
    <div 
      className='todo-item' 
      data-date={createdAt} 
      data-editing={isEditing} 
      ref={todoItemRef}
    >
      <label className='todo-item__label'>
        <input
          type="checkbox"
          checked={isDone}
          id={id}
          className='todo-item__checkbox'
          onChange={() => toggleTaskComplete(id, isDone)}
        />
        {
          !isEditing 
          ? children 
          : <EditTodo
              editingTaskTitle={editingTaskTitle}
              setEditingTaskTitle={setEditingTaskTitle}
              handleKeyDown={handleKeyDown}
              editInputRef={editInputRef}
            />
        }
      </label>
      <div className='todo-item__buttons-container'>
        <button 
          className='todo-item__edit-button' 
          onClick={() => {
            if (isEditing) {
              handleSave()
            } else {
              setIsEditing(true)
            }
          }}
        >
          {editIcon}
        </button>
        <button 
          className='todo-item__delete-button'
          onClick={() => deleteTask(id)}
        >
          {deleteIcon}
        </button>
      </div>
    </div>
  )

}

export default memo(TodoItem)