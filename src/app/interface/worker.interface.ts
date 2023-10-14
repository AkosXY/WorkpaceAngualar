export interface Worker {
    id: number,
    username: string,
    password: string,
    phone: string,
    email: string,
    supervisorId: number,
    name: string,
    admin: boolean,
    enabled: boolean
  }