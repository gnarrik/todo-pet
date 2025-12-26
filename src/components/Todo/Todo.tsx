import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Task } from "../../types/Task.ts";
import { useTasksWithStorage } from "../../utils/localstorage.ts";
import AddTodo from "../AddTodo";
import TodoList from "../TodoList";
import './Todo.scss';


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        transition: 'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    transition: 'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    transition: 'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

const Todo = () => {
  
  const [tasks, setTasks] = useTasksWithStorage()
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')
  const [sortBy, setSortBy] = useState<"Newest" | "Oldest">('Newest')
  const [theme, setTheme] = useState<"Light" | "Dark">('Light')


  const inputRef = useRef<HTMLInputElement | null>(null)

  const sortedTasks = useMemo(() => {
    if (sortBy === "Oldest") {
      return [...tasks].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    } else {
      return [...tasks].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }
  }, [tasks, sortBy])

  const addTask = useCallback((): void => {
    setNewTaskTitle((prevTitle) => {
      if (prevTitle.trim().length > 0) {
        const newTask: Task = {
          id: crypto.randomUUID(),
          title: prevTitle,
          isDone: false,
          createdAt: new Date(),
        }
        setTasks((prevTasks: Task[]): Task[] => [...prevTasks, newTask])
        return ''
      }
      return prevTitle
    })
    inputRef.current?.focus()
  }, [])

  const completeEditTask = useCallback((editedTitle: string, editedTaskId: string): void => {
    setTasks(
      (prevTasks) => prevTasks.map((task) => task.id === editedTaskId ? {...task, title: editedTitle} : task)
    )
  }, [])

  const deleteAllTasks = useCallback((): void => {
    const isConfirmed = confirm('Delete all tasks?')
    if (isConfirmed) {
      setTasks([])
    }
  }, [])

  const deleteTask = useCallback((taskId: string): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }, [])

  const toggleTaskComplete = useCallback((taskId: string, isDone: boolean): void => {
    setTasks((prevTasks) => prevTasks.map((task) => task.id === taskId ? {...task, isDone: !isDone}: task))
  }, [])

  useEffect(() => setSortBy('Newest'), [])

  useEffect(() => {
    document.body.setAttribute('data-theme', theme === 'Dark' ? 'dark' : 'light')
  }, [theme])

  const toggleTheme = useCallback(
    (): void => {
      setTheme( (prevTheme) => prevTheme === 'Dark' ? 'Light' : "Dark")
     }, []
  )

  return (
    <div className='todo' data-theme={theme === 'Dark' ? 'dark' : 'light'}>
      <div className="todo__switch-container">
        <MaterialUISwitch 
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
          disabled={tasks.length === 0}
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