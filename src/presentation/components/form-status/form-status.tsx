import './form-status-styles.scss'

import React, { useContext } from 'react'

import { Spinner } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  const { isLoading, mainError } = state

  return (
    <div data-testid="form-status" className='form-status'>
      {isLoading && <Spinner />}
      {mainError && <span data-testid="main-error" className='error'>{mainError}</span>}
    </div>
  )
}

export default FormStatus
