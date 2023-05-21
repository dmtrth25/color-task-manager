import { useState, useEffect } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { AiOutlineUnorderedList } from "react-icons/ai"
import axios from "axios"

import { List, AddButton, Tasks } from "./components"
import { Color, IList, IListObj, ITask, TListTasks } from "./components/@types"

const App = () => {
  const [lists, setLists] = useState<IList[]>([])
  const [colors, setColors] = useState<Color[]>([])
  const [activeItem, setActiveItem] = useState<IList | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  console.log(lists)

  useEffect(() => {
    const listId = location.pathname.split("/")[2]
    if (lists) {
      const list = lists.find((list) => list.id === Number(listId))
      setActiveItem(list || null)
    }
  })

  useEffect(() => {
    axios
      .get("http://localhost:3000/lists?_expand=color&_embed=tasks")
      .then(({ data }) => setLists(data))
    axios
      .get("http://localhost:3000/colors")
      .then(({ data }) => setColors(data))
      .catch(() => {
        alert("Error to get data!")
      })
  }, [])

  const onAddItem = (obj: IListObj) => {
    const newList = [...lists, obj]
    setLists(newList)
  }

  const onAddTask = (taskId: number, taskObj: ITask) => {
    const newList = lists.map((item) => {
      if (item.id === taskId) {
        item.tasks = item.tasks ? [...item.tasks, taskObj] : [taskObj]
      }
      return item
    })
    setLists(newList)
  }

  const onRemoveItem = (id: number) => {
    const newArray = lists.filter((list) => list.id !== id)
    setLists(newArray)
  }

  const onEditTitle = (id: number, title: string) => {
    const newList = lists.map((list) => {
      if (list.id === id) {
        list.name = title
      }
      return list
    })
    setLists(newList)
  }

  const onEditTask = (
    listId: number,
    listObj: { id: number; text: string }
  ) => {
    const newTaskText = window.prompt("Task text", listObj.text)

    if (!newTaskText) {
      return
    }

    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks?.map((task) => {
          if (task.id === listObj.id) {
            task.text = newTaskText
          }
          return task
        })
      }
      return list
    })
    setLists(newList)
    axios
      .patch(`http://localhost:3000/tasks/${listObj.id}`, {
        text: newTaskText,
      })
      .catch(() => alert("Error update"))
  }

  const onRemoveTask = (listId: number, id: number) => {
    if (window.confirm("Are you sure to remove ?")) {
      const newList = lists.map((list) => {
        if (list.id === listId) {
          list.tasks = list.tasks?.filter((task) => task.id !== id)
        }
        return list
      })
      setLists(newList)
      axios
        .delete(`http://localhost:3000/tasks/${id}`)
        .catch(() => alert("Error delete"))
    }
  }

  const onCompleteTask = (listId: number, id: number, completed: boolean) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks?.map((task) => {
          if (task.id === id) {
            task.completed = completed
          }
          return task
        })
      }
      return list
    })
    setLists(newList)
    axios
      .patch(`http://localhost:3000/tasks/${id}`, {
        completed,
      })
      .catch(() => alert("Error task update"))
  }

  const TasksList = ({
    lists,
    onAddTask,
    onEditTitle,
    onRemoveTask,
    onEditTask,
    onCompleteTask,
    withoutText,
  }: TListTasks) => {
    return (
      <>
        {lists &&
          lists.map((list: IList) => (
            <Tasks
              key={list.id}
              list={list}
              withoutText
              onAddTask={onAddTask}
              onEditTitle={onEditTitle}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
            />
          ))}
      </>
    )
  }

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          onClickItem={(item) => navigate("/")}
          items={[
            {
              active: !activeItem,
              icon: <AiOutlineUnorderedList size={20} />,
              color: null,
              name: "All list",
            },
          ]}
        />
        <List
          items={lists}
          isRemove
          onRemove={(id) => onRemoveItem(id)}
          onClickItem={(item) => navigate(`/lists/${item.id}`)}
          activeItem={activeItem}
        />
        <AddButton onAddItem={onAddItem} colors={colors} />
      </div>
      <div className="todo__tasks">
        <Routes>
          <Route
            path="/"
            element={
              <TasksList
                lists={lists}
                onAddTask={onAddTask}
                onEditTitle={onEditTitle}
                onRemoveTask={onRemoveTask}
                onEditTask={onEditTask}
                onCompleteTask={onCompleteTask}
                withoutText
              />
            }
          />
          <Route
            path="/lists/:id"
            element={
              <Tasks
                list={activeItem}
                onAddTask={onAddTask}
                onEditTitle={onEditTitle}
                onRemoveTask={onRemoveTask}
                onEditTask={onEditTask}
                onCompleteTask={onCompleteTask}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
