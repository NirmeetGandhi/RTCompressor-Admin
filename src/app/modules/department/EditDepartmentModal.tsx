import {ChangeEvent, FC, useEffect, useState} from 'react'
import {validateDepartment} from '../../../RTCompressor/helpers/validation-helper/helpers'
import {Button, Form, Modal} from 'react-bootstrap'
interface Department {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  fireDepartmentOfficerName: string
}
interface EditDepartmentModalProps {
  show: boolean
  handleClose: () => void
  department: Department | null
  handleSave: (updatedDepartment: Department) => void
}

const EditDepartmentModal: FC<EditDepartmentModalProps> = ({
  show,
  handleClose,
  department,
  handleSave,
}) => {
  const [data, setData] = useState<Department>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    fireDepartmentOfficerName: '',
  })
  const [validations, setValidations] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    status: false,
    fireDepartmentOfficerName: false,
  })

  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    status: '',
    fireDepartmentOfficerName: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (department) {
      setData(department)
    }
  }, [department])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = event.target
    const tempData = {...data, [name]: value}
    setData(tempData)

    const validation = validateDepartment(name, value)
    setValidations({...validations, [name]: !validation.isValid})
    setErrorMessages({...errorMessages, [name]: validation.message})
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let formValid = true
    const newValidations: any = {}
    const newErrorMessages: any = {}

    Object.entries(data).forEach(([name, value]) => {
      const validation = validateDepartment(name, value)
      newValidations[name] = !validation.isValid
      newErrorMessages[name] = validation.message
      if (!validation.isValid) {
        formValid = false
      }
    })

    setValidations(newValidations)
    setErrorMessages(newErrorMessages)

    if (formValid) {
      handleSave(data)
    }
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Department</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Label>Department First Name</Form.Label>
            <Form.Control
              type='text'
              name='firstName'
              placeholder='Enter Officer Name'
              maxLength={20}
              value={data.firstName}
              onChange={handleChange}
              isInvalid={validations.firstName}
              required
            />
            {validations.firstName && (
              <Form.Control.Feedback type='invalid'>
                {errorMessages.firstName}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Department Last Name</Form.Label>
            <Form.Control
              type='text'
              name='lastName'
              placeholder='Enter Officer Name'
              maxLength={20}
              value={data.lastName}
              onChange={handleChange}
              isInvalid={validations.lastName}
              required
            />
            {validations.lastName && (
              <Form.Control.Feedback type='invalid'>{errorMessages.lastName}</Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Department Email</Form.Label>
            <Form.Control
              type='text'
              name='email'
              placeholder='Enter Email'
              maxLength={40}
              value={data.email}
              onChange={handleChange}
              isInvalid={validations.email}
              required
            />
            {validations.email && (
              <Form.Control.Feedback type='invalid'>{errorMessages.email}</Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Department Officer Name</Form.Label>
            <Form.Control
              type='text'
              name='fireDepartmentOfficerName'
              placeholder='Enter Officer Name'
              maxLength={20}
              value={data.fireDepartmentOfficerName}
              onChange={handleChange}
              isInvalid={validations.fireDepartmentOfficerName}
              required
            />
            {validations.fireDepartmentOfficerName && (
              <Form.Control.Feedback type='invalid'>
                {errorMessages.fireDepartmentOfficerName}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type='tel'
              name='phone'
              value={data.phone}
              maxLength={10}
              onChange={handleChange}
              isInvalid={validations.phone}
              required
            />
            <Form.Control.Feedback type='invalid'>{errorMessages.phone}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type='text'
              name='address'
              value={data.address}
              onChange={handleChange}
              isInvalid={validations.address}
              required
            />
            <Form.Control.Feedback type='invalid'>{errorMessages.address}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose} type='submit' disabled={loading}>
            {loading ? 'Please wait...' : 'Submit'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export {EditDepartmentModal}
