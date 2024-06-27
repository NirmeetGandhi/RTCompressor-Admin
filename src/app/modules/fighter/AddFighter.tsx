import {useState, ChangeEvent, FormEvent} from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import {FC} from 'react'
import {validateOfficer} from '../../../RTCompressor/helpers/validation-helper/helpers'
import clsx from 'clsx'

const AddFighterForm: FC = () => {
  const [show, setShow] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  interface FormData {
    officerName: string
    phoneNumber: string
    email: string
    status: string
  }

  const [data, setFormData] = useState<FormData>({
    officerName: '',
    phoneNumber: '',
    email: '',
    status: '',
  })

  const [validations, setFormValidations] = useState<any>({
    officerName: false,
    phoneNumber: false,
    email: false,
    status: false,
  })

  const [errorMessages, setErrorMessages] = useState<any>({
    officerName: '',
    phoneNumber: '',
    email: '',
    status: '',
  })

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const {name, value} = event.target
    const tempData = {...data, [name]: value}
    setFormData(tempData)

    console.log(data)

    const validation = validateOfficer(name, value)
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
      const validation = validateOfficer(name, value)
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
      setFormData({
        officerName: '',
        phoneNumber: '',
        email: '',
        status: '',
      })
      setFormValidations({
        officerName: false,
        phoneNumber: false,
        email: false,
        status: false,
      })
      setErrorMessages({
        officerName: '',
        phoneNumber: '',
        email: '',
        status: '',
      })
    }, 3000)

    console.log('Form submitted with data:', data)
  }

  return (
    <>
      <Card style={{width: '90%', margin: 'auto'}}>
        <Card.Header>
          <div className='d-flex justify-content-between w-100 flex-wrap'>
            <Card.Title>Add Fighter</Card.Title>
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
                    Fighter Name
                  </label>
                  <i style={{marginLeft: '10px'}} className='fas fa-fire-alt'></i>
                  <InputGroup hasValidation>
                    <Form.Control
                      type='text'
                      maxLength={20}
                      placeholder='Enter Fighter Name'
                      name='officerName'
                      value={data.officerName}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                      className={clsx(
                        'form-control mb-3 mb-lg-0',
                        {'is-invalid': validations.officerName},
                        {'is-valid': !validations.officerName && data.officerName !== ''}
                      )}
                      required
                    />
                    {validations.officerName ? (
                      <div className='invalid-feedback'>{errorMessages.officerName}</div>
                    ) : (
                      ''
                    )}
                  </InputGroup>
                </div>
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
                  <label className='form-label fw-bolder text-gray-900 fs-6 required'>Email</label>
                  <i style={{marginLeft: '10px'}} className='fas fa-envelope'></i>
                  <InputGroup hasValidation>
                    <Form.Control
                      type='email'
                      maxLength={150}
                      placeholder='Email'
                      name='email'
                      value={data.email}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                      className={clsx(
                        'form-control mb-3 mb-lg-0',
                        {'is-invalid': validations.email},
                        {'is-valid': !validations.email && data.email !== ''}
                      )}
                      required
                    />
                    {validations.email ? (
                      <div className='invalid-feedback'>{errorMessages.email}</div>
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
                    <option value='available'>Available</option>
                    <option value='unavailable'>Unavailable</option>
                  </Form.Select>
                  {validations.status ? (
                    <div className='invalid-feedback'>{errorMessages.status}</div>
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
    </>
  )
}

const AddFighter: FC = () => {
  return (
    <>
      <AddFighterForm />
    </>
  )
}

export {AddFighter}
