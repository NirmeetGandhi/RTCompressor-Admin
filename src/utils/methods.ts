import moment from 'moment'
const Method={
  convertDateToDDMMYYYY: (date: string) => {
    return moment(date).local().format('DD/MM/YYYY ')
  },
  convertDateToDDMMYYYYHHMM: (date: string) => {
    return moment(date).local().format('DD/MM/YYYY hh:mm ')
  },
  convertDateToDDMMYYYYHHMMAMPM: (date: string) => {
    return moment(date).local().format('DD/MM/YYYY hh:mm A')
  },
  convertDateToDDMMYYYYHOURS: (date: string) => {
    return moment(date).local().format('DD/MM/YYYY [,] HH:mm ')
  },
   checkisSameOrAfter: (date1: string, date2: string) => {
    return moment(date2).isSameOrAfter(date1)
  },
  dayDifference: (date1: string, date2: string) => {
    return moment(date2).diff(date1, "days")
  }
}
export default Method
