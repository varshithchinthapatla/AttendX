import { Navigate } from 'react-router-dom'

function ProtectedRoute({
  children
}) {
  const user =
    localStorage.getItem(
      'attendxUser'
    )

  if (!user) {
    return (
      <Navigate to='/login' />
    )
  }

  return children
}

export default ProtectedRoute