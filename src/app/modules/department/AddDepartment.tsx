import React, {useState, ChangeEvent, FormEvent, FC} from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import clsx from 'clsx'
import {validateDepartment} from '../../../RTCompressor/helpers/validation-helper/helpers'
import {InputGroup} from 'react-bootstrap'
import APICallService from '../../../api/apiCallService'
import {APIJSON} from '../../../api/apiJSON/auth'
import {success} from '../../../Global/toast'
import {CREATEDEPARTMENT} from '../../../api/apiEndPoints'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  status: '',
  fireDepartmentOfficerName: '',
}

const AddDepartment: FC<{onAdd: (newDepartment: any) => void}> = ({onAdd}) => {
  const [show, setShow] = useState<boolean>(true)
  const [data, setFormData] = useState(initialState)
  const [validations, setFormValidations] = useState<any>({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    status: false,
    fireDepartmentOfficerName: false,
  })
  const [errorMessages, setErrorMessages] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    status: '',
    fireDepartmentOfficerName: '',
  })
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const {name, value} = event.target
    const tempData = {...data, [name]: value}
    setFormData(tempData)

    const validation = validateDepartment(name, value)
    const tempValidations = {...validations, [name]: !validation.isValid}
    const tempErrorMessages = {...errorMessages, [name]: validation.message}
    setFormValidations(tempValidations)
    setErrorMessages(tempErrorMessages)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

    setFormValidations(newValidations)
    setErrorMessages(newErrorMessages)

    if (!formValid) {
      return
    }

    setLoading(true)

    try {
      let apiService = new APICallService(
        CREATEDEPARTMENT,
        APIJSON.addDepartment({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          status: data.status,
          fireDepartmentOfficerName: data.fireDepartmentOfficerName,
        })
      )
      let response = await apiService.callAPI()
      console.log(response)

      if (response) {
        console.log(response.message)
        success(response.message)

        // Reset form only on successful submission
        setFormData(initialState)
        setFormValidations({
          firstName: false,
          lastName: false,
          email: false,
          phone: false,
          address: false,
          status: false,
          fireDepartmentOfficerName: false,
        })
        setErrorMessages({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          status: '',
          fireDepartmentOfficerName: '',
        })

        // Pass the new department data up to the parent component
        onAdd(response.data) // Assuming response.data contains the new department object
      }
    } catch (apiError: any) {
      let errorMessage = 'An error occurred'

      if (apiError.response && apiError.response.data && apiError.response.data.message) {
        errorMessage = apiError.response.data.message
      } else if (apiError.message) {
        errorMessage = apiError.message
      }

      console.error('Error message:', errorMessage)
      // Handle error cases, e.g., show toast notification
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card style={{width: '90%', margin: 'auto'}}>
        <Card.Header>
          <div className='d-flex justify-content-between w-100 flex-wrap'>
            <Card.Title>Add Department</Card.Title>
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
          <Form onSubmit={handleSubmit}>
            <Card.Body>
              <div className='row g-5 mb-5'>
                <div className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                  <Form.Label className='form-label fw-bolder text-gray-900 fs-6 required'>
                    Department First Name
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='firstName'
                    onChange={handleChange}
                    maxLength={20}
                    placeholder='Enter Name'
                    className={clsx(
                      'form-control mb-3 mb-lg-0',
                      {'is-invalid': validations.firstName},
                      {
                        'is-valid': !validations.firstName && data.firstName !== '',
                      }
                    )}
                    autoFocus
                  />
                  {validations.firstName ? (
                    <div className='invalid-feedback'>{errorMessages.firstName}</div>
                  ) : (
                    ''
                  )}
                </div>
                <div className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                  <Form.Label className='form-label fw-bolder text-gray-900 fs-6 required'>
                    Department Last Name
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='lastName'
                    onChange={handleChange}
                    maxLength={20}
                    placeholder='Enter Name'
                    className={clsx(
                      'form-control mb-3 mb-lg-0',
                      {'is-invalid': validations.lastName},
                      {
                        'is-valid': !validations.lastName && data.lastName !== '',
                      }
                    )}
                    autoFocus
                  />
                  {validations.lastName ? (
                    <div className='invalid-feedback'>{errorMessages.lastName}</div>
                  ) : (
                    ''
                  )}
                </div>

                <div className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                  <Form.Label className='form-label fw-bolder text-gray-900 fs-6 required'>
                    Fire Department Email
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='email'
                    placeholder='Enter Email'
                    maxLength={40}
                    onChange={handleChange}
                    className={clsx(
                      'form-control mb-3 mb-lg-0',
                      {'is-invalid': validations.email},
                      {
                        'is-valid': !validations.email && data.email !== '',
                      }
                    )}
                  />
                  {validations.email ? (
                    <div className='invalid-feedback'>{errorMessages.email}</div>
                  ) : (
                    ''
                  )}
                </div>

                <div className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                  <Form.Label className='form-label fw-bolder text-gray-900 fs-6 required'>
                    Fire Department Officer Name
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='fireDepartmentOfficerName'
                    onChange={handleChange}
                    maxLength={20}
                    placeholder='Enter Name'
                    className={clsx(
                      'form-control mb-3 mb-lg-0',
                      {'is-invalid': validations.fireDepartmentOfficerName},
                      {
                        'is-valid':
                          !validations.fireDepartmentOfficerName &&
                          data.fireDepartmentOfficerName !== '',
                      }
                    )}
                    autoFocus
                  />
                  {validations.fireDepartmentOfficerName ? (
                    <div className='invalid-feedback'>
                      {errorMessages.fireDepartmentOfficerName}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                  <Form.Label className='form-label fw-bolder text-gray-900 fs-6'>
                    Number
                  </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type='text'
                      maxLength={10}
                      placeholder='Phone Number'
                      name='phone'
                      value={data.phone}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (!(e.key >= '0' && e.key <= '9') && e.key !== 'Backspace') {
                          e.preventDefault()
                        }
                      }}
                      className={clsx(
                        'form-control mb-3 mb-lg-0',
                        {'is-invalid': validations.phone},
                        {
                          'is-valid': !validations.phone && data.phone !== '',
                        }
                      )}
                    />
                  </InputGroup>
                  {validations.phone ? (
                    <div className='invalid-feedback'>{errorMessages.phone}</div>
                  ) : (
                    ''
                  )}
                </div>

                <div className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                  <Form.Label className='form-label fw-bolder text-gray-900 fs-6'>
                    Address
                  </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type='text'
                      maxLength={25}
                      placeholder='Enter address'
                      name='address'
                      value={data.address}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                      className={clsx(
                        'form-control mb-3 mb-lg-0',
                        {'is-invalid': validations.address},
                        {
                          'is-valid': !validations.address && data.address !== '',
                        }
                      )}
                    />
                  </InputGroup>
                  {validations.address ? (
                    <div className='invalid-feedback'>{errorMessages.address}</div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className='form-actions d-flex justify-content-end'>
                <button type='submit' className='btn btn-primary' disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </Card.Footer>
          </Form>
        )}
      </Card>
    </>
  )
}

export {AddDepartment}
