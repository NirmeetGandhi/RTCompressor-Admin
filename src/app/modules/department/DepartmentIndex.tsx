import {AddDepartment} from './AddDepartment'
import {ListDepartment} from './ListDepartment'
import {FC, useState} from 'react'

const DepartmentPage: FC = () => {
  interface Department {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    status: string
    fireDepartmentOfficerName: string
  }

  const [departments, setDepartments] = useState<Department[]>([]) // Explicitly define the type as Department[]

  // Function to add new department to the list
  const handleAddDepartment = (newDepartment: Department) => {
    setDepartments([...departments, newDepartment])
  }

  // Function to edit department in the list
  const handleEditDepartment = (updatedDepartment: Department) => {
    const updatedDepartments = departments.map((department) =>
      department.email === updatedDepartment.email ? updatedDepartment : department
    )
    setDepartments(updatedDepartments)
  }

  // Function to delete department from the list
  const handleDeleteDepartment = (departmentToDelete: Department) => {
    const updatedDepartments = departments.filter(
      (department) => department.email !== departmentToDelete.email
    )
    setDepartments(updatedDepartments)
  }

  return (
    <>
      <AddDepartment onAdd={handleAddDepartment} />
      <ListDepartment
        departments={departments}
        onEdit={handleEditDepartment}
        onDelete={handleDeleteDepartment}
      />
    </>
  )
}

const DepartmentIndex: FC = () => {
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle> */}
      <DepartmentPage />
    </>
  )
}

export {DepartmentIndex}
