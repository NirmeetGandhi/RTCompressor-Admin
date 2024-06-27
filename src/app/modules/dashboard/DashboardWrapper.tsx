/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
// import {useIntl} from 'react-intl'
// import {toAbsoluteUrl} from '../../../RTCompressor/helpers'
// import {PageTitle} from '../../../RTCompressor/layout/core'
import {
  // ListsWidget2,
  // ListsWidget3,
  // ListsWidget4,
  // ListsWidget6,
  // TablesWidget5,
  // TablesWidget10,
  // MixedWidget8,
  // CardsWidget7,
  // CardsWidget17,
  CardsWidget20,
  // ListsWidget26,
  // EngageWidget10,
} from '../../../RTCompressor/partials/widgets'

const DashboardPage: FC = () => (
  <>
    <div className='row g-5 g-xl-10'>
      <div className='col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
        <CardsWidget20
          className='mb-5 card-rounded-top'
          description='Cylinders'
          color='#85C0E7'
          icon='/media/icons/duotune/art/gas-cylinder.svg'
        />
      </div>
      <div className='col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
        <CardsWidget20
          className='mb-5'
          description='Fire Departments'
          color='#F89271'
          icon='/media/icons/duotune/art/department.svg'
        />
      </div>
      <div className='col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
        <CardsWidget20
          className='mb-5'
          description='Fill Stations'
          color='#F8E871'
          icon='/media/icons/duotune/art/fillstation.svg'
        />
      </div>
      <div className='col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
        <CardsWidget20
          className='mb-5'
          description='Fire Fighters'
          color='#884533'
          icon='/media/icons/duotune/art/fighter.svg'
        />
      </div>
    </div>
  </>
)

const DashboardWrapper: FC = () => {
  // const intl = useIntl()
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle> */}
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
