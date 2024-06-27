import {ILoginData, IDepartmentData} from '../../types'

export const APIJSON = {
  login: ({email, password}: ILoginData) => {
    return {
      email: email,
      password: password,
    }
  },
  addDepartment: ({
    firstName,
    lastName,
    email,
    phone,
    address,
    status,
    fireDepartmentOfficerName,
  }: IDepartmentData) => {
    return {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address,
      status: status,
      fireDepartmentOfficerName: fireDepartmentOfficerName,
    }
  },
}
