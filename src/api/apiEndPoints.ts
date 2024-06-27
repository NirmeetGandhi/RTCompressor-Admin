// API END Points
import * as constants from '../utils/constants'
/**---------------Authentication------------------------------ */
export const LOGIN = 'admin/login' + ' ' + constants.POST_RAW
export const LOGOUT = 'admin/logout' + ' ' + constants.POST_RAW

export const CREATEDEPARTMENT = 'admin/firedepartment' + ' ' + constants.POST_FORM
export const GETDEPARTMENTS = 'admin/firedepartments' + ' ' + constants.GET
