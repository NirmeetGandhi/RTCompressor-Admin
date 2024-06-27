import {FC} from 'react'
import {AddStation} from './AddStation'
import {ListStation} from './ListStation'
const StationPage: FC = () => {
  return (
    <>
      <AddStation />
      <ListStation />
    </>
  )
}

const StationIndex: FC = () => {
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle> */}
      <StationPage />
    </>
  )
}

export {StationIndex}
