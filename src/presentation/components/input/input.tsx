import './input-styles.scss'

import React, { useContext } from 'react'

import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context)

  const inputName = props.name
  const error = errorState[inputName]

  const getStatus = (): string => {
    return '❌'
  }

  const getTitle = (): string => {
    return error
  }

  return (
    <div className='input-wrapper'>
      <input {...props} />
      <span data-testid={`${inputName}-status`} title={getTitle()} className='status'>{getStatus()}</span>
    </div>
  )
}

export default Input
