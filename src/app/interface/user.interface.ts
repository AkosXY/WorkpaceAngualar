export interface User {
  admin: boolean,
  email: string,
  enabled: boolean,
  id: number,
  name: string,
  phone: string,
  supervisorId: number,
  username: string

}


export interface NewUser {
  username: string,
  phone: string,
  email: string,
  name: string,
  admin: boolean,
  enabled: boolean,
  supervisorId?: number,
  password: string

}


export const NULL_USER: User = {
  admin: false,
  email: "",
  enabled: false,
  id: 0,
  name: "",
  phone: "",
  supervisorId: 0,
  username: ""
};
