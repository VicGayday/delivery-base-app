export enum EventSortField {
  DATE = "date",
  ADDRESS = "address",
}

export type SortOrder = "asc" | "desc"

export interface Event {
  id: number
  name: string
  address: string
  date: string
  status: string
  comment: string
}
export interface EventBD {
  id: number
  name: string
  address: string
  date: number
  status: string
  comment: string
}
