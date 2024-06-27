const emailCheck = (value: string) => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  if (!emailRegex.test(value)) {
    return false
  }
  return true
}

const phoneCheck = (value: string) => {
  const phoneNumberRegex = /^\d+$/
  if (!phoneNumberRegex.test(value)) {
    return false
  }
  return true
}

// const nameCheck = (value: string) => {
//   const nameRegex = /^\d/
//   if (!nameRegex.test(value)) {
//     return false
//   }
//   return true
// }

const validateOfficer = (name: string, value: string) => {
  switch (name) {
    case 'officerName':
      if (value.trim() === '') {
        return {isValid: false, message: 'Name is required'}
      }
      return {isValid: true, message: ''}
    case 'phoneNumber':
      if (value.trim() === '') {
        return {isValid: false, message: 'Number is required'}
      }
      if (!phoneCheck(value)) {
        return {isValid: false, message: 'Not a valid contact'}
      }
      if (value.length !== 10) {
        return {isValid: false, message: 'Number must be 10 digits long'}
      }
      return {isValid: true, message: ''}
    case 'email':
      if (value.trim() === '') {
        return {isValid: false, message: 'Email is required'}
      }
      if (!emailCheck(value)) {
        return {isValid: false, message: 'Not a valid email address'}
      }
      return {isValid: true, message: ''}
    case 'status':
      if (value.trim() === '') {
        return {isValid: false, message: 'Status is required'}
      }
      return {isValid: true, message: ''}
    default:
      return {isValid: true, message: ''}
  }
}

const validateStation = (name: string, value: string) => {
  switch (name) {
    case 'phoneNumber':
      if (value.trim() === '') {
        return {isValid: false, message: 'Number is required'}
      }
      if (!phoneCheck(value)) {
        return {isValid: false, message: 'Not a valid contact'}
      }
      if (value.length !== 10) {
        return {isValid: false, message: 'Number must be 10 digits long'}
      }
      return {isValid: true, message: ''}
    case 'address':
      if (value.trim() === '') {
        return {isValid: false, message: 'Location is required'}
      }
      if (value.length > 500) {
        return {isValid: false, message: 'Max characters allowed are 500'}
      }
      return {isValid: true, message: ''}
    case 'status':
      if (value.trim() === '') {
        return {isValid: false, message: 'Status is required'}
      }
      return {isValid: true, message: ''}
    default:
      return {isValid: true, message: ''}
  }
}

const validateCylinder = (name: string, value: any) => {
  switch (name) {
    case 'fillStation':
      if (value.trim() === '') {
        return {isValid: false, message: 'Fill station is required'}
      }
      return {isValid: true, message: ''}

    case 'quantity':
      if (value.trim() === '') {
        return {isValid: false, message: 'Quantity is required'}
      } else if (!/^\d+$/.test(value) || value < 1 || value > 999) {
        return {isValid: false, message: 'Quantity must be a number between 1 and 999'}
      }
      return {isValid: true, message: ''}
    default:
      return {isValid: true, message: ''}
  }
}
const validateDepartment = (name: string, value: any) => {
  switch (name) {
    case 'firstName':
      if (value.trim() === '') {
        return {isValid: false, message: 'First Name is required'}
      }
      return {isValid: true, message: ''}
    case 'fireDepartmentOfficerName':
      if (value.trim() === '') {
        return {isValid: false, message: 'Officer Name is required'}
      }
      return {isValid: true, message: ''}
    case 'lastName':
      if (value.trim() === '') {
        return {isValid: false, message: 'Last Name is required'}
      }
      return {isValid: true, message: ''}
    case 'phone':
      if (value.trim() === '') {
        return {isValid: false, message: 'Number is required'}
      }
      if (!phoneCheck(value)) {
        return {isValid: false, message: 'Not a valid contact'}
      }
      if (value.length !== 10) {
        return {isValid: false, message: 'Number must be 10 digits long'}
      }
      return {isValid: true, message: ''}
    case 'email':
      if (value.trim() === '') {
        return {isValid: false, message: 'Email is required'}
      }
      if (!emailCheck(value)) {
        return {isValid: false, message: 'Not a valid email address'}
      }
      return {isValid: true, message: ''}
    case 'address':
      if (value.trim() === '') {
        return {isValid: false, message: 'Location is required'}
      }
      if (value.length > 500) {
        return {isValid: false, message: 'Max characters allowed are 500'}
      }
      return {isValid: true, message: ''}
    case 'status':
      if (value.trim() === '') {
        return {isValid: false, message: 'Status is required'}
      }
      return {isValid: true, message: ''}
    default:
      return {isValid: true, message: ''}
  }
}

export {validateOfficer, validateStation, validateCylinder, validateDepartment}
