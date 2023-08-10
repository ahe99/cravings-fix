export type Roles = 'CUSTOMER' | 'ADMIN'

export type User = {
  email: string
  username: string
  password: string
  role: Roles
}
