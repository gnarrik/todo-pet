import { useEffect, useState } from "react"
import type { Task } from "../types/Task"

const localStorageTasksKey = 'tasks'
const localStorageThemeKey = 'theme'
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
  const rawTasks = localStorage.getItem(localStorageTasksKey)
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

const getThemeFromStorage = (): "Light" | "Dark" => {
	const parsedTheme = localStorage.getItem(localStorageThemeKey)
	if (parsedTheme === "Light" || parsedTheme === "Dark") {
		return parsedTheme
	} else {
		return "Light"
	}
}

export const useThemeFromStorage = () => {
	const [theme, setTheme] = useState<"Light" | "Dark">(() => getThemeFromStorage())

	useEffect((): void => {
		localStorage.setItem(localStorageThemeKey, theme)
	}, [theme])

	return [theme, setTheme] as const
}

export const useTasksWithStorage = () => {
  const [tasks, setTasks] = useState<Task[]>(() => getTasksFromStorage())

  useEffect((): void => {
    localStorage.setItem(localStorageTasksKey, JSON.stringify(tasks))
  }, [tasks])

  return [tasks, setTasks] as const
}
