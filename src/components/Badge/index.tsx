import { FC } from "react"
import classNames from "classnames"
import { TColor } from "../@types"
import "./Badge.scss"

const Badge: FC<TColor> = ({ onClick, color, className }) => (
  <i
    onClick={onClick}
    className={classNames("badge", { [`badge--${color}`]: color }, className)}
  ></i>
)

export default Badge
