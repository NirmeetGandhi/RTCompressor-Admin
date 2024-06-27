import React, {useState, useEffect, ChangeEvent} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {validateOfficer} from '../../../RTCompressor/helpers/validation-helper/helpers'

interface Fighter {
  officerName: string
  phoneNumber: string
  email: string
  status: string
}

interface FighterModalProps {
  show: boolean
  handleClose: () => void
  fighter: Fighter | null
  handleSave: (fighter: Fighter) => void
}

const EditFighterModal: React.FC<FighterModalProps> = ({
  show,
  handleClose,
  fighter,
  handleSave,
}) => {
  const [data, setData] = useState<Fighter>({
    officerName: '',
    phoneNumber: '',
    email: '',
    status: '',
  })

  useEffect(() => {
    if (fighter) {
      setData(fighter)
    }
  }, [fighter])

  const [validations, setValidations] = useState({
    officerName: false,
    phoneNumber: false,
    email: false,
    status: false,
  })
  const [errorMessages, setErrorMessages] = useState({
    officerName: '',
    phoneNumber: '',
    email: '',
    status: '',
  })

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = event.target
    const tempData = {...data, [name]: value}
    setData(tempData)

    const validation = validateOfficer(name, value)
    setValidations({...validations, [name]: !validation.isValid})
    setErrorMessages({...errorMessages, [name]: validation.message})
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let formValid = true
    const newValidations: any = {}
    const newErrorMessages: any = {}

    Object.entries(data).forEach(([name, value]) => {
      const validation = validateOfficer(name, value)
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
        <Modal.Title>Edit Fighter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              name='officerName'
              value={data.officerName}
              onChange={handleChange}
              isInvalid={validations.officerName}
            />
            <Form.Control.Feedback type='invalid'>
              {errorMessages.officerName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Number</Form.Label>
            <Form.Control
              type='tel'
              name='phoneNumber'
              value={data.phoneNumber}
              maxLength={10}
              onChange={handleChange}
              isInvalid={validations.phoneNumber}
            />
            <Form.Control.Feedback type='invalid'>
              {errorMessages.phoneNumber}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={data.email}
              onChange={handleChange}
              isInvalid={validations.email}
            />
            <Form.Control.Feedback type='invalid'>{errorMessages.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as='select'
              name='status'
              value={data.status}
              onChange={handleChange}
              isInvalid={validations.status}
            >
              <option value=''>Select Status</option>
              <option value='Available'>Available</option>
              <option value='Unavailable'>Unavailable</option>
            </Form.Control>
            <Form.Control.Feedback type='invalid'>{errorMessages.status}</Form.Control.Feedback>
          </Form.Group>
          <Button variant='primary' type='submit'>
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export {EditFighterModal}
