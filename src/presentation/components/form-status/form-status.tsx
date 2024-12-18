import './form-status-styles.scss'

import React, { useContext } from 'react'

import { Spinner } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { errorState, state } = useContext(Context)

  return (
    <div data-testid="form-status" className='form-status'>
      {state.isLoading && <Spinner />}
      {errorState.main && <span className='error'>{errorState.main}</span>}
    </div>
  )
}

export default FormStatus
