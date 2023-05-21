import { FC } from "react"
import { IoMdClose } from "react-icons/io"
import axios from "axios"
import classNames from "classnames"
import Badge from "../Badge"
import { IList, TList } from "../@types"
import "./List.scss"

const List: FC<TList> = ({
  items,
  isRemove,
  activeItem,
  onClick,
  onRemove,
  onClickItem,
}) => {
  const handleRemove = (item: IList) => {
    const id = item.id ?? 0
    if (window.confirm("Delete ?")) {
      axios.delete(`http://localhost:3000/lists/${item.id}`).then(() => {
        onRemove && onRemove(id)
      })
    }
  }
  return (
    <ul className="list" onClick={onClick}>
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, {
            active: item.active
              ? item.active
              : activeItem && activeItem.id === item.id,
          })}
          onClick={onClickItem ? (event) => onClickItem(item) : undefined}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color!.name} />}</i>

          <span>
            {item.name} {item.tasks && `(${item.tasks.length})`}
          </span>
          {isRemove && (
            <IoMdClose
              onClick={() => handleRemove(item)}
              className="list__remove-btn"
              size={22}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default List
