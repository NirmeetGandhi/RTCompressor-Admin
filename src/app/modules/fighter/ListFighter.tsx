import Card from 'react-bootstrap/Card'
import {FC, useState} from 'react'
import {KTSVG} from '../../../RTCompressor/helpers'
import {Pagination} from '../pagination'
import {useListView} from '../apps/user-management/users-list/core/ListViewProvider'
import {EditFighterModal} from './EditfighterModal'
import {DeleteFighterModal} from './DeleteFighterModal'

interface Fighter {
  officerName: string
  phoneNumber: string
  email: string
  status: string
}
const ListFighter: FC = () => {
  const {setItemIdForUpdate} = useListView()
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }
  const [fighters, setFighters] = useState<Fighter[]>([
    {
      officerName: 'Suresh',
      phoneNumber: '9999999999',
      email: 'suresh@gmail.com',
      status: 'Available',
    },
    {
      officerName: 'Mukesh',
      phoneNumber: '9999999999',
      email: 'mukesh@gmail.com',
      status: 'Unavailable',
    },
  ])

  const [selectedfighter, setSelectedFighter] = useState<Fighter | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleEditClick = (fighter: Fighter) => {
    setSelectedFighter(fighter)
    setShowEditModal(true)
  }
  const handleDeleteClick = (fighter: Fighter) => {
    setSelectedFighter(fighter)
    setShowDeleteModal(true)
  }

  const handleDeleteModalClose = () => {
    setSelectedFighter(null)
    setShowDeleteModal(false)
  }

  const handleEditModalClose = () => {
    setSelectedFighter(null)
    setShowEditModal(false)
  }

  const handleSave = (updatedFighter: Fighter) => {
    setFighters(fighters.map((f) => (f.email === updatedFighter.email ? updatedFighter : f)))
    handleEditModalClose()
  }
  return (
    <>
      <div style={{marginTop: '30px'}}></div>
      <Card style={{width: '90%', margin: 'auto'}}>
        <Card.Header>
          <div className='d-flex justify-content-between w-100 flex-wrap'>
            <Card.Title>Add Fire Fighter</Card.Title>

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
                  <th className='min-w-100px '>Fighter Name</th>
                  <th className='min-w-100px'>Number</th>
                  <th className='min-w-100px'>Email</th>
                  <th className='min-w-50px'>Status</th>
                  <th className='min-w-50px'>Action</th>
                </tr>
              </thead>
              <tbody>
                {fighters.map((fighter, index) => (
                  <tr key={index}>
                    <td>{fighter.officerName}</td>
                    <td>{fighter.phoneNumber}</td>
                    <td>{fighter.email}</td>
                    <td>
                      <span
                        className={`badge badge-light-${
                          fighter.status === 'Unavailable' ? 'danger' : 'success'
                        }`}
                      >
                        {fighter.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        onClick={() => handleEditClick(fighter)}
                      >
                        <KTSVG
                          path='/media/icons/duotune/art/art005.svg'
                          className='svg-icon-3 svg-icon-info'
                        />
                      </button>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        onClick={() => handleDeleteClick(fighter)}
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
      <EditFighterModal
        show={showEditModal}
        fighter={selectedfighter}
        handleClose={handleEditModalClose}
        handleSave={handleSave}
      />
      <DeleteFighterModal
        show={showDeleteModal}
        fighter={selectedfighter}
        handleClose={handleDeleteModalClose}
      />
    </>
  )
}

export {ListFighter}
