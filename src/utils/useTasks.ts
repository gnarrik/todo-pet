import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Task } from '../types/Task';
import { useTasksWithStorage, useThemeFromStorage } from './localstorage';

const useTasks = () => {
	const [tasks, setTasks] = useTasksWithStorage()
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')
  const [sortBy, setSortBy] = useState<"Newest" | "Oldest">('Newest')
  const [theme, setTheme] = useThemeFromStorage()
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
  
  const toggleTheme = useCallback(
    (): void => {
      setTheme( (prevTheme) => prevTheme === 'Dark' ? 'Light' : "Dark")
     }, []
  )

  useEffect(() => setSortBy('Newest'), [])

  useEffect(() => {
    document.body.setAttribute('data-theme', theme === 'Dark' ? 'dark' : 'light')
  }, [theme])

	return ({
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
	} as const)
}

export default useTasks