import type { ChangeEvent } from 'react'
import './EditTodo.scss'

type EditTodoProps = {
	editingTaskTitle: string,
	setEditingTaskTitle: (value: string) => void,
	handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void,
	editInputRef: React.RefObject<HTMLInputElement | null>
}

const EditTodo = (props: EditTodoProps) => {
	const {
		editingTaskTitle,
		setEditingTaskTitle,
		handleKeyDown,
		editInputRef
	} = props
	

	return(
		<input 
      type="text"
      className='todo-item__edit-input' 
      value={editingTaskTitle} 
      onChange={(event: ChangeEvent<HTMLInputElement>) => setEditingTaskTitle(event.target.value)}
      onKeyDown={handleKeyDown}
      ref={editInputRef}
    />
	)
}

export default EditTodo