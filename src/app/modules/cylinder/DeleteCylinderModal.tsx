import React, {useEffect, useState, ChangeEvent} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

interface Cylinder {
  quantity: string
  fillStation: string
  capacity: string
}

interface ViewCylinderModalProps {
  show: boolean
  handleClose: () => void
  cylinder: Cylinder | null
}

const DeleteCylinderModal: React.FC<ViewCylinderModalProps> = ({show, handleClose, cylinder}) => {
  const [data, setData] = useState<Cylinder>({quantity: '', fillStation: '', capacity: ''})

  useEffect(() => {
    if (cylinder) {
      setData(cylinder)
    }
  }, [cylinder])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Cylinder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <i className='fas fa-compact-disc'></i>
            <Form.Label className='ms-2'>Quantity : {data.quantity}</Form.Label>
          </Form.Group>

          <Form.Group className='mb-3'>
            <i
              className='
fas fa-building'
            ></i>
            <Form.Label className='ms-2'>Station : {data.fillStation}</Form.Label>
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

export {DeleteCylinderModal}
