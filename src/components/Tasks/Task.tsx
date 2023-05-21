import { AiOutlineCheck } from "react-icons/ai"
import { MdModeEditOutline } from "react-icons/md"
import { TbTrash } from "react-icons/tb"
import { TypeTask } from "../@types"

export const Task = ({
  list,
  id,
  text,
  completed,
  onRemove,
  onEdit,
  onComplete,
}: TypeTask) => {
  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    onComplete(list.id, id, e.target.checked)
  }

  return (
    <div key={id} className="checkbox">
      <input
        onChange={onChangeCheckbox}
        id={`check-${id}`}
        type="checkbox"
        checked={completed}
      />
      <label htmlFor={`check-${id}`}>
        <i>
          <AiOutlineCheck />
        </i>
      </label>
      <p>{text}</p>
      <div className="checkbox-actions">
        <div onClick={() => onEdit(list.id, { id, text })}>
          <MdModeEditOutline />
        </div>
        <div onClick={() => onRemove(list.id, id)}>
          <TbTrash />
        </div>
      </div>
    </div>
  )
}
