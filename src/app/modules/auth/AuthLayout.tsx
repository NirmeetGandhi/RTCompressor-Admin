/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../RTCompressor/helpers'

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
      {/* begin::Body */}
      <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1'>
        {/* begin::Form */}
        <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
          {/* begin::Wrapper */}
          <div className='w-lg-500px p-10'>
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}

        {/* begin::Footer */}
        {/* <div className='d-flex flex-center flex-wrap px-5'> */}
        {/* begin::Links */}
        {/* <div className='d-flex fw-semibold text-primary fs-base'>
            <a href='#' className='px-5' target='_blank'>
              Terms
            </a>

            <a href='#' className='px-5' target='_blank'>
              Plans
            </a>

            <a href='#' className='px-5' target='_blank'>
              Contact Us
            </a>
          </div> */}
        {/* end::Links */}
        {/* </div> */}
        {/* end::Footer */}
      </div>
      {/* end::Body */}

      {/* begin::Aside */}
      <div
        className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2'
        style={{
          // backgroundImage: `url(${toAbsoluteUrl('/media/auth/bg6-dark.jpg')})`,
          // backgroundImage: `url(${toAbsoluteUrl('/media/auth/bg8-dark.jpg')})`,
          // backgroundImage: `url(${toAbsoluteUrl('/media/auth/bg9-dark.jpg')})`,
          backgroundImage: `url(${toAbsoluteUrl('/media/auth/bg10.jpg')})`,
          // backgroundImage: `url(${toAbsoluteUrl('/media/auth/bg9.jpg')})`,
          // backgroundImage: `url(${toAbsoluteUrl('/media/auth/bg8.jpg')})`,
          // backgroundImage: `url(${toAbsoluteUrl('/media/auth/bg7.jpg')})`,
          height: '800px',
        }}
      >
        {/* begin::Content */}
        <div className='d-flex flex-column flex-center py-15 px-5 px-md-15 w-100'>
          {/* begin::Logo */}
          <Link to='/' className='mb-12'>
            <img
              alt='RTCompressor'
              src={toAbsoluteUrl('/media/logos/logo (1).png')}
              style={{width: '150px', height: '100px', marginTop: '58px'}}
              className='h-25px app-sidebar-logo-default'
            />
          </Link>
          {/* end::Logo */}

          {/* begin::Image */}
          <img
            className='mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20'
            src={toAbsoluteUrl('/media/misc/fire.png')}
            alt=''
          />
          {/* end::Image */}

          {/* begin::Title */}
          <h1 className='text-white fs-2qx fw-bolder text-center mb-7' style={{marginTop: '-45px'}}>
            {/* A Leader in Fire Safety and Emergency Response */}
          </h1>
          {/* end::Title */}

          {/* begin::Text */}
          <div className='text-white fs-base text-center'>
            {/* Cultivating a safer tomorrow,{' '}
            <a href='#' className='opacity-75-hover text-warning fw-bold me-1'>
              our project
            </a>
            endeavors to pioneer innovative solutions in fire safety <br /> */}
            {/* and emergency response
            <a href='#' className='opacity-75-hover text-warning fw-bold me-1'>
              With a focus on leadership, expertise, and collaboration, we strive to empower
              communities and organizations.
            </a> */}
            {/* with the tools and <br /> knowledge needed to mitigate risks, enhance preparedness, and
            effectively respond to emergencies. */}
          </div>
          {/* end::Text */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::Aside */}
    </div>
  )
}

export {AuthLayout}
