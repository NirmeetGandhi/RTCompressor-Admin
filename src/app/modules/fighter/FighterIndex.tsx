import {FC} from 'react'
import {AddFighter} from './AddFighter'
import {ListFighter} from './ListFighter'
// const FireFighterPage: FC = () => {
//   return (
//     <>
//       <AddFighter />
//       <ListFighter />
//     </>
//   )
// }

const FighterIndex: FC = () => {
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle> */}
      <AddFighter />
      <ListFighter />
    </>
  )
}

export {FighterIndex}
