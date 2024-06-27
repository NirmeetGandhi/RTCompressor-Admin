import Card from 'react-bootstrap/Card'
import {FC, useState} from 'react'
import {KTSVG} from '../../../RTCompressor/helpers'
import {Pagination} from '../pagination'
import {EditStationModal} from './EditStationModal'
import {DeleteStationModal} from './DeleteStationModal'

interface Station {
  address: string
  status: string
  phoneNumber: string
}

const ListStation: FC = () => {
  const [stations, setStations] = useState<Station[]>([
    {address: 'Solitair Connect', status: 'Open', phoneNumber: '9999999999'},
    {address: 'Saket-2 , baroda', status: 'Close', phoneNumber: '7894561230'},
  ])
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleEditClick = (station: Station) => {
    setSelectedStation(station)
    setShowEditModal(true)
  }
  const handleDeleteClick = (station: Station) => {
    setSelectedStation(station)
    setShowDeleteModal(true)
  }
  const handleDeleteModalClose = () => {
    setSelectedStation(null)
    setShowDeleteModal(false)
  }
  const handleEditModalClose = () => {
    setSelectedStation(null)
    setShowEditModal(false)
  }

  const handleSave = (updatedStation: Station) => {
    setStations(
      stations.map((s) => (s.phoneNumber === updatedStation.phoneNumber ? updatedStation : s))
    )
    handleEditModalClose()
  }

  return (
    <>
      <div style={{marginTop: '30px'}}></div>
      <Card style={{width: '90%', margin: 'auto'}}>
        <Card.Header>
          <div className='d-flex justify-content-between w-100 flex-wrap'>
            <Card.Title>Show Stations</Card.Title>
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
                  <th className='min-w-100px'>Address</th>
                  <th className='min-w-100px'>phoneNumber</th>
                  <th className='min-w-100px'>Status</th>
                  <th className='min-w-50px'>Action</th>
                </tr>
              </thead>
              <tbody>
                {stations.map((station, index) => (
                  <tr key={index}>
                    <td>{station.address}</td>
                    <td>{station.phoneNumber}</td>
                    <td>
                      <span
                        className={`badge badge-light-${
                          station.status === 'Close' ? 'danger' : 'success'
                        }`}
                      >
                        {station.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        onClick={() => handleEditClick(station)}
                      >
                        <KTSVG
                          path='/media/icons/duotune/art/art005.svg'
                          className='svg-icon-3 svg-icon-info'
                        />
                      </button>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        onClick={() => handleDeleteClick(station)}
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
      <EditStationModal
        show={showEditModal}
        station={selectedStation}
        handleClose={handleEditModalClose}
        handleSave={handleSave}
      />
      <DeleteStationModal
        show={showDeleteModal}
        handleClose={handleDeleteModalClose}
        station={selectedStation}
      />
    </>
  )
}

export {ListStation}
