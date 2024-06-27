import {ListCylinder} from './ListCylinder'
import {AddCylinder} from './AddCylinder'
import {FC} from 'react'

const CylinderPage: FC = () => {
  return (
    <>
      <AddCylinder />
      <ListCylinder />
    </>
  )
}

const CylinderIndex: FC = () => {
  // const intl = useIntl()
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle> */}
      <CylinderPage />
    </>
  )
}

export {CylinderIndex}
