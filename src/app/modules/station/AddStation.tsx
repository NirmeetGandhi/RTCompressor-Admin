import React from 'react'
import {useState, ChangeEvent, FormEvent} from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import clsx from 'clsx'
import {FC} from 'react'
import {validateStation} from '../../../RTCompressor/helpers/validation-helper/helpers'
import {EditStationModal} from './EditStationModal'

const AddStationForm: FC = () => {
  interface FormData {
    phoneNumber: string
    status: string
    address: string
  }

  const initialState: FormData = {
    phoneNumber: '',
    status: '',
    address: '',
  }

  const [data, setFormData] = useState<FormData>(initialState)
  const [validations, setFormValidations] = useState<any>({
    phoneNumber: false,
    status: false,
    address: false,
  })
  const [errorMessages, setErrorMessages] = useState<any>({
    phoneNumber: '',
    status: '',
    address: '',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(true)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const {name, value} = event.target
    const tempData = {...data, [name]: value}
    setFormData(tempData)

    const validation = validateStation(name, value)
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
      const validation = validateStation(name, value)
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
        phoneNumber: false,
        status: false,
        address: false,
      })
      setErrorMessages({
        phoneNumber: '',
        status: '',
        address: '',
      })
    }, 2000)

    console.log('Form submitted with data:', data)
  }

  return (
    <>
      <Card style={{width: '90%', margin: 'auto'}}>
        <Card.Header>
          <div className='d-flex justify-content-between w-100 flex-wrap'>
            <Card.Title>Add Station</Card.Title>
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
                  <label className='form-label fw-bolder text-gray-900 fs-6 required'>Number</label>
                  <i style={{marginLeft: '10px'}} className='fas fa-mobile-alt'></i>
                  <InputGroup hasValidation>
                    <Form.Control
                      type='text'
                      maxLength={10}
                      placeholder='Phone Number'
                      name='phoneNumber'
                      value={data.phoneNumber}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                      onKeyDown={(e) => {
                        if (!(e.key >= '0' && e.key <= '9') && e.key !== 'Backspace') {
                          e.preventDefault()
                        }
                      }}
                      className={clsx(
                        'form-control mb-3 mb-lg-0',
                        {'is-invalid': validations.phoneNumber},
                        {'is-valid': !validations.phoneNumber && data.phoneNumber !== ''}
                      )}
                      required
                    />
                    {validations.phoneNumber ? (
                      <div className='invalid-feedback'>{errorMessages.phoneNumber}</div>
                    ) : (
                      ''
                    )}
                  </InputGroup>
                </div>
                <div className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                  <label className='form-label fw-bolder text-gray-900 fs-6 required'>
                    Select Status
                  </label>
                  <i style={{marginLeft: '10px'}} className='fas fa-circle-notch'></i>
                  <Form.Select
                    name='status'
                    value={data.status}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    className={clsx(
                      'form-select mb-3 mb-lg-0',
                      {'is-invalid': validations.status},
                      {'is-valid': !validations.status && data.status !== ''}
                    )}
                    required
                  >
                    <option value=''>Select Status</option>
                    <option value='Open'>Open</option>
                    <option value='Close'>Close</option>
                  </Form.Select>
                  {validations.status ? (
                    <div className='invalid-feedback'>{errorMessages.status}</div>
                  ) : (
                    ''
                  )}
                </div>
                <div className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                  <label className='form-label fw-bolder text-gray-900 fs-6 required'>
                    Address
                  </label>
                  <i style={{marginLeft: '10px'}} className='fab fa-sourcetree'></i>
                  <InputGroup hasValidation>
                    <Form.Control
                      as='textarea'
                      placeholder='Address'
                      name='address'
                      value={data.address}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                      className={clsx(
                        'form-control mb-3 mb-lg-0',
                        {'is-invalid': validations.address},
                        {'is-valid': !validations.address && data.address !== ''}
                      )}
                      required
                    />
                    {validations.address ? (
                      <div className='invalid-feedback'>{errorMessages.address}</div>
                    ) : (
                      ''
                    )}
                  </InputGroup>
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
    </>
  )
}

const AddStation: FC = () => {
  return (
    <>
      <AddStationForm />
    </>
  )
}

export {AddStation}
