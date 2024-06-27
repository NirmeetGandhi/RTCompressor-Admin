import React, {useEffect, useState, ChangeEvent} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

interface Department {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  fireDepartmentOfficerName: string
}

interface ViewDepartmentModalProps {
  show: boolean
  handleClose: () => void
  department: Department | null
}

const DeleteDepartmentModal: React.FC<ViewDepartmentModalProps> = ({
  show,
  handleClose,
  department,
}) => {
  const [data, setData] = useState<Department>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    fireDepartmentOfficerName: '',
  })

  useEffect(() => {
    if (department) {
      setData(department)
    }
  }, [department])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <i className='fas fa-compact-disc'></i>
            <Form.Label className='ms-2'>
              Department Name : {`${data.firstName} ${data.lastName}`}
            </Form.Label>
          </Form.Group>

          {/* <Form.Group className='mb-3'>
            <i
              className='
fas fa-building'
            ></i>
            <Form.Label className='ms-2'>Email : {data.email}</Form.Label>
          </Form.Group> */}
        </Form>
      </Modal.Body>
      <span className='ms-8' style={{color: 'red'}}>
        There is no rollback if you choose to delete
      </span>
      <Modal.Footer>
        <Button variant='danger' onClick={handleClose}>
          Delete
        </Button>
        <Button variant='primary' onClick={handleClose}>
          Abort
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export {DeleteDepartmentModal}
