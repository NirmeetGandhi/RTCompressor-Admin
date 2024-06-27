import {FC} from 'react'
import {Form} from 'react-bootstrap'

const Pagination: FC = () => {
  return (
    <>
      <div className='container'>
        <div className='row mb-3 justify-content-between'>
          <div className='col col-auto d-flex align-items-center'>
            <label className='ms-2'>Rows Per Page:</label>
            <Form.Select aria-label='Default select example' className='ms-2 w-auto'>
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Form.Select>
          </div>
          <div className='col col-auto d-flex justify-content-end mt-2  flex-sm-row'>
            <button className='btn btn-primary me-2 mb-2 mb-sm-0 ms-sm-0'>Prev</button>
            <button className='btn btn-primary me-2 mb-2 mb-sm-0'>Next</button>
          </div>
        </div>
      </div>
    </>
  )
}
export {Pagination}
