import {KTSVG} from '../../../../helpers'

type Props = {
  className: string
  description: string
  color: string
  icon: string
}

const CardsWidget20 = ({className, description, color, icon}: Props) => (
  <div
    className={`card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end ${className}`}
    style={{
      backgroundColor: color,
    }}
  >
    <div className='card-header pt-5 h-30'>
      <div className='card-title d-flex justify-content-between flex-column'>
        <KTSVG path={icon} className='svg-icon svg-icon-2x me-10 svg-icon-white' />
      </div>
      <span className='fs-3 text-white'>4</span>
    </div>
    <div className='card-body d-flex align-items-end pt-0 h-30'>
      <div className='d-flex align-items-center flex-column mt-3 w-100'>
        <div className='d-flex justify-content-between fw-bold fs-6 text-white w-100 mt-auto mb-2'>
          <span className='fs-3 text-white me-2 lh-1 ls-n2'>{description}</span>
        </div>
      </div>
    </div>
  </div>
)
export {CardsWidget20}
