import React, {ChangeEvent, useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {validateStation} from '../../../RTCompressor/helpers/validation-helper/helpers'

interface Station {
  phoneNumber: string
  address: string
  status: string
}

interface EditStationModalProps {
  show: boolean
  handleClose: () => void
  station: Station | null
  handleSave: (updatedStation: Station) => void
}

const EditStationModal: React.FC<EditStationModalProps> = ({
  show,
  handleClose,
  station,
  handleSave,
}) => {
  const [data, setData] = useState<Station>({phoneNumber: '', address: '', status: ''})

  const [validations, setValidations] = useState({
    phoneNumber: false,
    address: false,
    status: false,
  })

  const [errorMessages, setErrorMessages] = useState({
    phoneNumber: '',
    address: '',
    status: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (station) {
      setData(station)
    }
  }, [station])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = event.target
    const tempData = {...data, [name]: value}
    setData(tempData)

    const validation = validateStation(name, value)
    setValidations({...validations, [name]: !validation.isValid})
    setErrorMessages({...errorMessages, [name]: validation.message})
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let formValid = true
    const newValidations: any = {}

    const newErrorMessages: any = {}

    Object.entries(data).forEach(([name, value]) => {
      const validation = validateStation(name, value)
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
        <Modal.Title>Edit Station</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type='tel'
              name='phoneNumber'
              value={data.phoneNumber}
              maxLength={10}
              onChange={handleChange}
              isInvalid={validations.phoneNumber}
              required
            />
            {validations.phoneNumber && (
              <Form.Control.Feedback type='invalid'>
                {errorMessages.phoneNumber}
              </Form.Control.Feedback>
            )}
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
            {validations.address && (
              <Form.Control.Feedback type='invalid'>{errorMessages.address}</Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as='select'
              name='status'
              value={data.status}
              onChange={handleChange}
              isInvalid={validations.status}
              required
            >
              <option value=''>Select Status</option>
              <option value='open'>Open</option>
              <option value='Close'>Close</option>
            </Form.Control>
            {validations.status && (
              <Form.Control.Feedback type='invalid'>{errorMessages.status}</Form.Control.Feedback>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' type='submit' disabled={loading}>
            {loading ? 'Please wait...' : 'Submit'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export {EditStationModal}
