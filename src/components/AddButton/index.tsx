import { FC, useState, useEffect } from "react"
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai"
import axios from "axios"

import Badge from "../Badge"
import { List } from "../../components"
import { ListFormProps } from "../@types"
import "./AddButton.scss"

const AddButton: FC<ListFormProps> = ({ colors, onAddItem }) => {
  const [selected, setSelected] = useState(3)
  const [inputValue, setInputValue] = useState("")
  const [isShow, setIsShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (Array.isArray(colors) && colors.length > 0) {
      setSelected(colors[0].id)
    }
  }, [colors])

  const onCloseHandler = () => {
    setIsShow(false)
    setInputValue("")
    setSelected(colors[0].id)
  }

  const handleAddItem = () => {
    if (!inputValue) {
      alert("Write the title")
      return
    }
    setIsLoading(true)
    axios
      .post("http://localhost:3000/lists", {
        name: inputValue,
        colorId: selected,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selected)[0]
        const newObj = { ...data, color, tasks: [] }
        onAddItem?.(newObj)
      })
      .catch(() => alert("Error send data!"))
      .finally(() => {
        setIsLoading(false)
        onCloseHandler()
      })
  }

  return (
    <div className="add-list">
      <List
        onClick={() => setIsShow(true)}
        items={[
          {
            className: "list__plus-button",
            icon: <AiOutlinePlus style={{ color: "#868686" }} size={20} />,
            color: null,
            name: "New list",
          },
        ]}
      />
      {isShow && (
        <div className="add-list__form">
          <AiFillCloseCircle
            onClick={onCloseHandler}
            className="add-list__form-close"
            size={20}
          />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Folder name"
          />
          <div className="add-list__form-colors">
            {colors.map((color) => (
              <Badge
                key={color.id}
                onClick={() => setSelected(color.id)}
                color={color.name}
                className={selected === color.id && "active"}
              />
            ))}
          </div>
          <button onClick={handleAddItem} className="button">
            {isLoading ? "Loading..." : "Add folder"}
          </button>
        </div>
      )}
    </div>
  )
}

export default AddButton
