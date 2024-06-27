import React, {useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

interface Station {
  address: string
  phoneNumber: string
  status: string
}

interface ViewStationModalProps {
  show: boolean
  handleClose: () => void
  station: Station | null
}

const DeleteStationModal: React.FC<ViewStationModalProps> = ({show, handleClose, station}) => {
  const [data, setData] = useState<Station>({address: '', phoneNumber: '', status: ''})

  useEffect(() => {
    if (station) {
      setData(station)
    }
  }, [station])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Station</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <i className='fas fa-address-book'></i>
            <Form.Label className='ms-2'>Address : {data.address}</Form.Label>
          </Form.Group>
          <Form.Group className='mb-3'>
            <i className='fas fa-phone-square-alt'></i>
            <Form.Label className='ms-2'>Number : {data.phoneNumber}</Form.Label>
          </Form.Group>
          <Form.Group className='mb-3'>
            <i className='fas fa-life-ring'></i>
            <Form.Label className='ms-2'>Status : {data.status}</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <span className='ms-8' style={{color: 'red'}}>
        There is no rollback if you choose to delete
      </span>
      <Modal.Footer>
        <Button variant='danger' onClick={handleClose}>
          Delete
        </Button>
        <Button variant='primary' onClick={handleClose}>
          Abort
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export {DeleteStationModal}
