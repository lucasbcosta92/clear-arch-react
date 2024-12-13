import './form-status-styles.scss'

import React from 'react'

import Spinner from '@/presentation/components/spinner/spinner'

const FormStatus: React.FC = () => {
  return (
    <div className='form-status'>
      <Spinner />
      <span className='error'>Error</span>
    </div>
  )
}

export default FormStatus
