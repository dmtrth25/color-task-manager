import axios from "axios"
import { FC, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { TaskFormProps, TypeList } from "../@types"

export const TaskForm: FC<TaskFormProps<TypeList>> = ({ list, onAddTask }) => {
  const [toggleForm, setToggleForm] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onToggleClick = () => {
    setToggleForm(!toggleForm)
    setInputValue("")
  }

  const onAddTaskItem = () => {
    if (!inputValue) {
      alert("Write a text")
      return
    }
    const taskObj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    }
    setIsLoading(true)
    axios
      .post("http://localhost:3000/tasks", taskObj)
      .then(({ data }) => {
        console.log(data)
        onAddTask(list.id, data)
      })
      .catch(() => {
        alert("Error add new task!")
      })
      .finally(() => {
        setIsLoading(false)
        onToggleClick()
      })
  }

  return (
    <div className="tasks__form">
      {!toggleForm ? (
        <div className="tasks__form-new" onClick={onToggleClick}>
          <AiOutlinePlus style={{ color: "#868686" }} size={20} />
          <span>New task</span>
        </div>
      ) : (
        <div className="tasks__form-footer">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Task text"
          />
          <button
            disabled={isLoading}
            onClick={onAddTaskItem}
            className="button"
          >
            {isLoading ? "Adding..." : "Add task"}
          </button>
          <button onClick={onToggleClick} className="button button--grey">
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
