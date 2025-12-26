import { useEffect, useState } from "react"
import type { Task } from "../types/Task"

const localStorageKey = 'tasks'
const defaultTasks: Task[] = [
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
]

const getTasksFromStorage = (): Task[] => {
  const rawTasks = localStorage.getItem(localStorageKey)
  if (!rawTasks) {
    return defaultTasks
  }
  try {
    const parsedRawTasks: Task[] = JSON.parse(rawTasks)

    if (!Array.isArray(parsedRawTasks)) {
      return defaultTasks
    }

    const parsedTasks: Task[] = parsedRawTasks.map((task) => {
      return {
        ...task,
        createdAt: new Date(task.createdAt)
      }
    })
    return parsedTasks
  } catch {
    return defaultTasks
  }
}

export const useTasksWithStorage = () => {
  const [tasks, setTasks] = useState<Task[]>(() => getTasksFromStorage())

  useEffect((): void => {
    localStorage.setItem(localStorageKey, JSON.stringify(tasks))
  }, [tasks])

  return [tasks, setTasks] as const
}
