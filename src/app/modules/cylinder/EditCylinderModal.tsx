import React, {useEffect, useState, ChangeEvent, FormEvent, FC} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {validateCylinder} from '../../../RTCompressor/helpers/validation-helper/helpers'

interface Cylinder {
  quantity: string
  capacity: string
  fillStation: string
}

interface EditCylinderModalProps {
  show: boolean
  handleClose: () => void
  cylinder: Cylinder | null
  handleSave: (updatedCylinder: Cylinder) => void
}

const EditCylinderModal: FC<EditCylinderModalProps> = ({
  show,
  handleClose,
  cylinder,
  handleSave,
}) => {
  const initialState = {
    quantity: '',
    fillStation: '',
    capacity: '',
  }

  const [data, setData] = useState<Cylinder>(initialState)
  const [validations, setValidations] = useState({
    quantity: false,
    fillStation: false,
  })
  const [errorMessages, setErrorMessages] = useState({
    quantity: '',
    fillStation: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (cylinder) {
      setData(cylinder)
    }
  }, [cylinder])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = event.target
    const tempData = {...data, [name]: value}
    setData(tempData)

    const validation = validateCylinder(name, value)
    setValidations({...validations, [name]: !validation.isValid})
    setErrorMessages({...errorMessages, [name]: validation.message})
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let formValid = true
    const newValidations: any = {}
    const newErrorMessages: any = {}

    Object.entries(data).forEach(([name, value]) => {
      const validation = validateCylinder(name, value)
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
        <Modal.Title>Edit Cylinder</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Label>Cylinders Quantity</Form.Label>
            <Form.Control
              type='text'
              name='quantity'
              value={data.quantity}
              onChange={handleChange}
              isInvalid={validations.quantity}
              required
            />
            {validations.quantity && (
              <Form.Control.Feedback type='invalid'>{errorMessages.quantity}</Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Select Fill Station</Form.Label>
            <Form.Control
              as='select'
              name='fillStation'
              value={data.fillStation}
              onChange={handleChange}
              isInvalid={validations.fillStation}
              required
            >
              <option value=''>Select Fill Station</option>
              <option value='one'>One</option>
              <option value='two'>Two</option>
              <option value='three'>Three</option>
            </Form.Control>
            {validations.fillStation && (
              <Form.Control.Feedback type='invalid'>
                {errorMessages.fillStation}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' type='submit' disabled={loading}>
            {loading ? 'Please wait...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export {EditCylinderModal}
