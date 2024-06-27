import React, {useEffect, useState, ChangeEvent} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

interface Fighter {
  officerName: string
  phoneNumber: string
  email: string
  status: string
}

interface ViewFighterModalProps {
  show: boolean
  handleClose: () => void
  fighter: Fighter | null
}

const DeleteFighterModal: React.FC<ViewFighterModalProps> = ({show, handleClose, fighter}) => {
  const [data, setData] = useState<Fighter>({
    officerName: '',
    phoneNumber: '',
    email: '',
    status: '',
  })

  useEffect(() => {
    if (fighter) {
      setData(fighter)
    }
  }, [fighter])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Fighter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <i className='fas fa-user-circle'> </i>
            <Form.Label className='ms-2'> Name : {data.officerName}</Form.Label>
          </Form.Group>
          <Form.Group className='mb-3'>
            <i className='fas fa-phone-square-alt'></i>
            <Form.Label className='ms-2'>Number : {data.phoneNumber}</Form.Label>
          </Form.Group>
          <Form.Group className='mb-3'>
            <i className='fas fa-envelope'></i>
            <Form.Label className='ms-2'>Email: {data.email}</Form.Label>
          </Form.Group>
          <Form.Group className='mb-3'>
            <i
              className='
fas fa-life-ring'
            ></i>
            <Form.Label className='ms-2'>Status : {data.status}</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <span className='ms-8' style={{color: 'red'}}>
        Caution : There is no rollback if you choose to delete
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

export {DeleteFighterModal}
