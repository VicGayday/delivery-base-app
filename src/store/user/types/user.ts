export interface User {
  user: string
  name: string
  role: string
}

export enum OrderStatus {
  New = "Новый",
  Completed = "Выполнен",
}

export interface UserSchema {
  authData?: User
}
