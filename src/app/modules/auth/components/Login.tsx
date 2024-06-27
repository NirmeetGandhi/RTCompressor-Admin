import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {useAuth} from '../core/Auth'
import APICallService from '../../../../api/apiCallService'
import {LOGIN} from '../../../../api/apiEndPoints'
import {APIJSON} from '../../../../api/apiJSON/auth'
import {success, error} from '../../../../Global/toast'
import {Auth} from '../../../../utils/toast'
// import { error } from 'console'

const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email/Phone number is required'),
  password: Yup.string()
    .min(6, 'Length should be minimum 6')
    .max(15, 'Length should be maximum 15')
    .required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, saveCurrentUser} = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)

      try {
        let apiService = new APICallService(
          LOGIN,
          APIJSON.login({email: values.email, password: values.password})
        )
        let response = await apiService.callAPI()
        // console.log(response)

        if (response) {
          saveAuth(response.token)
          let user = response.admin
          saveCurrentUser(user)
          // console.log(response.message)

          if (response.errorMessage) {
            error(response.errorMessage)
          } else {
            success(Auth.login)
          }
        }
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        saveCurrentUser(undefined)
        setStatus('The login details are incorrect')
        setSubmitting(false)
        setLoading(false)
      }
      setLoading(false)
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div className='text-left mb-6'>
        <h2 className='fs-35 fw-bolder text-dark mb-3'>
          Please sign in to your Department dashboard!
        </h2>
      </div>
      <div className='fv-row mb-3'>
        <input
          placeholder='Email or mobile phone number'
          {...formik.getFieldProps('email')}
          name='email'
          value={formik.values.email.trimStart()}
          onChange={(e) => {
            formik.handleChange(e)
          }}
          className={clsx(
            'form-control form-control-custom',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {'is-valid': formik.touched.email && !formik.errors.email}
          )}
          type='text'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span className='text-danger fs-12 fw-bold'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      <div className='fv-row mb-5'>
        <input
          placeholder='Password'
          {...formik.getFieldProps('password')}
          value={formik.values.password.trimStart()}
          onChange={(e) => {
            formik.handleChange(e)
          }}
          className={clsx(
            'form-control form-control-custom',
            {'is-invalid': formik.touched.password && formik.errors.password},
            {'is-valid': formik.touched.password && !formik.errors.password}
          )}
          type='password'
          name='password'
          autoComplete='off'
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <span className='text-danger fs-12 fw-bold'>{formik.errors.password}</span>
          </div>
        )}
      </div>
      <div className='d-grid mb-6'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary btn-lg min-h-lg-60px'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label fs-16 fw-bolder'>Sign In</span>}
          {loading && (
            <span className='indicator-progress fs-16 fw-bold' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      <div className='d-grid mb-10 mb-lg-20'>
        <div className='d-flex flex-center'>
          <Link to='/auth/forgot-password' className='text-dark fs-16 fw-normal'>
            Forgot password?
          </Link>
        </div>
      </div>
    </form>
  )
}
