import React, {FC, useState} from 'react'
import Card from 'react-bootstrap/Card'
import {KTSVG} from '../../../RTCompressor/helpers'
import {Pagination} from '../pagination'
import {EditCylinderModal} from './EditCylinderModal'
import {DeleteCylinderModal} from './DeleteCylinderModal'
interface Cylinder {
  quantity: string
  capacity: string
  fillStation: string
}

const ListCylinder: FC = () => {
  const [cylinders, setCylinders] = useState<Cylinder[]>([
    {quantity: '5', capacity: '200', fillStation: '7894563218dfssed'},
    {quantity: '10', capacity: '500', fillStation: '894563218dfssedw'},
    {quantity: '10', capacity: '50 ', fillStation: '894563218dfssedw'},
  ])
  const [selectedCylinder, setSelectedCylinder] = useState<Cylinder | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleEditClick = (cylinder: Cylinder) => {
    setSelectedCylinder(cylinder)
    setShowEditModal(true)
  }

  const handleEditModalClose = () => {
    setSelectedCylinder(null)
    setShowEditModal(false)
  }

  const handleDeleteClick = (cylinder: Cylinder) => {
    setSelectedCylinder(cylinder)
    setShowDeleteModal(true)
  }

  const handleDeleteModalClose = () => {
    setSelectedCylinder(null)
    setShowDeleteModal(false)
  }

  const handleSave = (updatedCylinder: Cylinder) => {
    setCylinders(
      cylinders.map((c) => (c.quantity === updatedCylinder.quantity ? updatedCylinder : c))
    )
    handleEditModalClose()
  }

  return (
    <>
      <div style={{marginTop: '30px'}}></div>
      <Card style={{width: '90%', margin: 'auto'}}>
        <Card.Header>
          <div className='d-flex justify-content-between w-100 flex-wrap'>
            <Card.Title>Show Cylinders</Card.Title>
            <div className='d-flex justify-content-flex-end mt-4'>
              <div className='d-flex align-items-center position-relative me-4'>
                <KTSVG
                  path='/media/icons/duotune/general/gen021.svg'
                  className='svg-icon-3 position-absolute ms-3'
                />
                <input
                  type='text'
                  id='kt_filter_search'
                  className='form-control form-control-white form-control-sm w-150px ps-9'
                  placeholder='Search'
                />
              </div>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div className='table-responsive'>
            <table className='table table-striped gy-7 gs-7'>
              <thead>
                <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
                  <th className='min-w-100px'>Quantity</th>
                  <th className='min-w-100px'>Capacity(in ml)</th>
                  <th className='min-w-100px'>Fill Station</th>
                  <th className='min-w-50px'>Action</th>
                </tr>
              </thead>
              <tbody>
                {cylinders.map((cylinder, index) => (
                  <tr key={index}>
                    <td>{cylinder.quantity}</td>
                    <td>
                      <span
                        className={`badge badge-light-${
                          Number.parseInt(cylinder.capacity) < 300 ? 'danger' : 'success'
                        }`}
                      >
                        {cylinder.capacity}
                      </span>
                    </td>
                    <td>{cylinder.fillStation}</td>
                    <td>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        onClick={() => handleEditClick(cylinder)}
                      >
                        <KTSVG
                          path='/media/icons/duotune/art/art005.svg'
                          className='svg-icon-3 svg-icon-info'
                        />
                      </button>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        onClick={() => handleDeleteClick(cylinder)}
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen027.svg'
                          className='svg-icon-3 svg-icon-danger'
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
        <Pagination />
      </Card>
      <EditCylinderModal
        show={showEditModal}
        handleClose={handleEditModalClose}
        cylinder={selectedCylinder}
        handleSave={handleSave}
      />
      <DeleteCylinderModal
        show={showDeleteModal}
        handleClose={handleDeleteModalClose}
        cylinder={selectedCylinder}
      />
    </>
  )
}

export {ListCylinder}
