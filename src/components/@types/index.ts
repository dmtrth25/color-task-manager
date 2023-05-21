import { ReactNode } from "react"
export interface Color {
  id: number
  hex: string
  name: string
}

export interface IList {
  icon?: ReactNode
  name: string
  tasks?: ITask[]
  color?: Color | null
  active?: boolean
  className?: string
  id?: number
  colorId?: number
}

export interface ListFormProps {
  colors: Color[]
  onAddItem?: (obj: IListObj) => void
}

export type TypeList = {
  color: Color
  colorId: number
  id: number
  name: string
  tasks: ITask[]
}

export type TaskFormProps<T extends IList> = {
  list: T
  onAddTask: (taskId: number, taskObj: TypeList) => void
}
export interface IListObj {
  color: Color | null
  id: number
  name: string
  colorId?: number
}

export type TypeTask = {
  list: TypeList
  id: number
  text: string
  completed: boolean
  onRemove: (listId: number, id: number) => void
  onEdit: (listId: number, listObj: { id: number; text: string }) => void
  onComplete: (listId: number, id: number, completed: boolean) => void
}

export interface IListTasks<T extends TypeList> {
  list: T
  onEditTitle: (id: number, title: string) => void
  onRemoveTask: (listId: number, id: number) => void
  onEditTask: (listId: number, listObj: { id: number; text: string }) => void
  onAddTask: (taskId: number, taskObj: TypeList) => void
  onCompleteTask: (listId: number, id: number, completed: boolean) => void
  withoutText?: boolean
}

export type TColor = {
  color: string | null
  onClick?: () => void
  className?: boolean | string
}

export interface ITask {
  id: number
  listId: number
  text: string
  completed: boolean
}

export type TList = {
  items: IList[]
  isRemove?: boolean
  activeItem?: IList | null
  onClick?: () => void
  onRemove?: (item: number) => void
  onClickItem?: (item: IList) => void
}

export type TListTasks = {
  lists: IList[];
  onAddTask: (taskId: number, taskObj: ITask) => void;
  onEditTitle: (id: number, title: string) => void;
  onRemoveTask: (listId: number, id: number) => void;
  onEditTask: (listId: number, listObj: { id: number; text: string }) => void;
  onCompleteTask: (listId: number, taskId: number, completed: boolean) => void;
  withoutText: boolean;
}
