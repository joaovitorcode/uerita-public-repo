/* eslint-disable no-unused-vars */
// Módulos
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'

// Diretórios
import { FullPageLoader } from '../FullPageLoader'
import { auth } from '../../../firebaseClient'

export const PrivateRoute = ({ isProtected, children }) => {
  const router = useRouter()
  const [isAuthenticated, isLoading] = useAuthState(auth)

  useEffect(() => {
    if (!isLoading && isProtected) {
      router.push('/')
    }
  }, [isLoading, isProtected, router])

  if (isLoading || isProtected) {
    return <FullPageLoader />
  }

  return children
}
