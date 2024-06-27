import React, {ChangeEvent, FormEvent, useState} from 'react'
import clsx from 'clsx'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import {FC} from 'react'
import {validateCylinder} from '../../../RTCompressor/helpers/validation-helper/helpers'

const AddCylinderForm: FC = () => {
  const initialState: FormData = {
    quantity: '',
    fillStation: '',
  }
  interface FormData {
    quantity: string
    fillStation: string
  }

  const [data, setFormData] = useState<FormData>({
    quantity: '',
    fillStation: '',
  })

  const [validations, setFormValidations] = useState<any>({
    quantity: false,
    fillStation: false,
  })
  const [errorMessages, setErrorMessages] = useState<any>({
    quantity: '',
    fillStation: '',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(true)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const {name, value} = event.target
    const tempData = {...data, [name]: value}
    setFormData(tempData)

    const validation = validateCylinder(name, value)
    const tempValidations = {...validations, [name]: !validation.isValid}
    const tempErrorMessages = {...errorMessages, [name]: validation.message}
    setFormValidations(tempValidations)
    setErrorMessages(tempErrorMessages)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    setFormValidations(newValidations)
    setErrorMessages(newErrorMessages)

    if (!formValid) {
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setFormData(initialState)
      setFormValidations({
        quantity: false,
        fillStation: false,
      })
      setErrorMessages({
        quantity: '',
        fillStation: '',
      })
    }, 2000)

    console.log('Form submitted with data:', data)
    console.log(errorMessages)
  }

  return (
    <Card style={{width: '90%', margin: 'auto'}}>
      <Card.Header>
        <div className='d-flex justify-content-between w-100 flex-wrap'>
          <Card.Title>Add Cylinder</Card.Title>
          <Form.Check
            type='switch'
            id='custom-switch'
            label='Show'
            className='d-flex align-items-center'
            checked={show}
            onChange={() => setShow(!show)}
          />
        </div>
      </Card.Header>
      {show && (
        <Card.Body>
          <form onSubmit={(e) => handleSubmit(e)} noValidate>
            <div className='row g-5 mb-5'>
              <div className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                <label className='form-label fw-bolder text-gray-900 fs-6 required'>
                  Cylinders Quantity
                </label>
                <i style={{marginLeft: '10px'}} className='fas fa-prescription-bottle-alt'></i>
                <InputGroup hasValidation>
                  <Form.Control
                    type='text'
                    name='quantity'
                    maxLength={3}
                    placeholder='Enter Quantity'
                    value={data.quantity}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    required
                    className={clsx(
                      'form-control mb-3 mb-lg-0',
                      {'is-invalid': validations.quantity},
                      {'is-valid': !validations.quantity && data.quantity !== ''}
                    )}
                  />
                  {validations.quantity ? (
                    <div className='invalid-feedback'>{errorMessages.quantity}</div>
                  ) : (
                    ''
                  )}
                </InputGroup>
              </div>
              <div className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                <label className='form-label fw-bolder text-gray-900 fs-6 required'>
                  Select Fill Station
                </label>
                <i style={{marginLeft: '10px'}} className='far fa-building'></i>
                <Form.Select
                  name='fillStation'
                  value={data.fillStation}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  className={clsx(
                    'form-select mb-3 mb-lg-0',
                    {'is-valid': !validations.fillStation && data.fillStation !== ''},
                    {'is-invalid': validations.fillStation}
                  )}
                  required
                >
                  <option value=''>Select Fill Station</option>
                  <option value='one'>One</option>
                  <option value='two'>Two</option>
                  <option value='three'>Three</option>
                </Form.Select>
                {validations.fillstation ? (
                  <div className='invalid-feedback'>{errorMessages.fillStation}</div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <button type='submit' className='btn btn-primary'>
              {!loading && <span className='indicator-label'>ADD</span>}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </form>
        </Card.Body>
      )}
    </Card>
  )
}

const AddCylinder: FC = () => {
  return (
    <>
      <AddCylinderForm />
    </>
  )
}

export {AddCylinder}
