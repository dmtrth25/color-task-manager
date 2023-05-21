import { FC } from "react"
import { Link } from "react-router-dom"
import { GrEdit } from "react-icons/gr"
import axios from "axios"

import { TaskForm } from "./TaskForm"
import { Task } from "./Task"
import { IListTasks, ITask, TypeList } from "../@types"
import "./Tasks.scss"

const Tasks: FC<IListTasks<TypeList>> = ({
  list,
  onEditTask,
  onRemoveTask,
  onEditTitle,
  onAddTask,
  onCompleteTask,
  withoutText,
}) => {
  if (!list) {
    return null
  }

  const onEdit = () => {
    const newName = window.prompt("New name", list.name)
    if (newName) {
      onEditTitle(list.id, newName)
      axios
        .patch(`http://localhost:3000/lists/${list.id}`, {
          name: newName,
        })
        .catch(() => alert("Error update"))
    }
  }

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 className="tasks__title" style={{ color: list.color.hex }}>
          {list.name}
          <i>
            <GrEdit size={20} onClick={onEdit} />
          </i>
        </h2>
      </Link>
      <div className="tasks__items">
        {!withoutText && list.tasks && !list.tasks.length && (
          <h2>No tasks...</h2>
        )}
        {list.tasks &&
          list.tasks.map((task: ITask) => (
            <Task
              key={task.id}
              list={list}
              onRemove={onRemoveTask}
              onEdit={onEditTask}
              onComplete={onCompleteTask}
              {...task}
            />
          ))}
      </div>
      <TaskForm key={list.id} list={list} onAddTask={onAddTask} />
    </div>
  )
}

export default Tasks
