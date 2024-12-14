import './form-status-styles.scss'

import React, { useContext } from 'react'

import { Spinner } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { errorMessage, isLoading } = useContext(Context)

  return (
    <div data-testid="form-status" className='form-status'>
      {isLoading && <Spinner />}
      {errorMessage && <span className='error'>{errorMessage}</span>}
    </div>
  )
}

export default FormStatus
