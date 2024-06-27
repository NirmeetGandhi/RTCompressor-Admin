import React, {FC, useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card'
import {Pagination} from '../pagination'
import {EditDepartmentModal} from './EditDepartmentModal'
import {DeleteDepartmentModal} from './DeleteDepartmentModal'
import {KTSVG} from '../../../RTCompressor/helpers'
import APICallService from '../../../api/apiCallService'
import {GETDEPARTMENTS} from '../../../api/apiEndPoints'
interface Department {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  fireDepartmentOfficerName: string
}

interface Props {
  departments: Department[]
  onEdit: (department: Department) => void
  onDelete: (department: Department) => void
}

const ListDepartment: FC<Props> = ({departments, onEdit, onDelete}) => {
  const [department, setDepartments] = useState(null)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const apiService = new APICallService(GETDEPARTMENTS)
        const response = await apiService.callAPI()
        // console.log(response)

        const fireDepartments = response.fireDepartments
        // console.log(fillStations)

        const formattedStations = fireDepartments.map((department: any) => ({
          _id: department._id,
          firstName: department.firstName,
          lastName: department.lastName,
          email: department.email,
          address: department.address,
          phone: department.phone,
          status: department.status.charAt(0).toUpperCase() + department.status.slice(1),
        }))
        setDepartments(formattedStations)
      } catch (error) {
        console.error('Error fetching fighters:', error)
      }
    }
    fetchDepartments()
  }, [])

  const handleEditClick = (department: Department) => {
    setSelectedDepartment(department)
    setShowEditModal(true)
  }

  const handleDeleteClick = (department: Department) => {
    setSelectedDepartment(department)
    setShowDeleteModal(true)
  }

  const handleDeleteModalClose = () => {
    setSelectedDepartment(null)
    setShowDeleteModal(false)
  }

  const handleEditModalClose = () => {
    setSelectedDepartment(null)
    setShowEditModal(false)
  }

  return (
    <>
      <Card style={{width: '90%', margin: 'auto'}}>
        <Card.Body>
          <div className='table-responsive'>
            <table className='table table-striped gy-7 gs-7'>
              <thead>
                <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
                  <th className='min-w-100px'>Department Name</th>
                  <th className='min-w-100px'>In charge Name</th>
                  <th className='min-w-100px'>Email</th>
                  <th className='min-w-100px'>Address</th>
                  <th className='min-w-100px'>Phone</th>
                  <th className='min-w-50px'>Action</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department, index) => (
                  <tr key={index}>
                    <td>{`${department.firstName} ${department.lastName}`}</td>
                    <td>{department.fireDepartmentOfficerName}</td>
                    <td>{department.email}</td>
                    <td>{department.address}</td>
                    <td>{department.phone}</td>
                    <td>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        onClick={() => onEdit(department)}
                      >
                        <KTSVG
                          path='/media/icons/duotune/art/art005.svg'
                          className='svg-icon-3 svg-icon-info'
                        />
                      </button>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        onClick={() => onDelete(department)}
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
      <EditDepartmentModal
        show={showEditModal}
        department={selectedDepartment}
        handleClose={handleEditModalClose}
        handleSave={onEdit}
      />
      <DeleteDepartmentModal
        show={showDeleteModal}
        department={selectedDepartment}
        handleClose={handleDeleteModalClose}
      />
    </>
  )
}

export {ListDepartment}
