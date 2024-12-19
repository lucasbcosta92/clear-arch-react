import './input-styles.scss'

import React, { useContext } from 'react'

import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)

  const inputName = props.name
  const error = state[`${inputName}Error`]

  const getStatus = (): string => {
    return error ? '❌' : '✅'
  }

  const getTitle = (): string => {
    return error || 'OK'
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    const target = event.target

    setState({
      ...state,
      [target.name]: target.value
    })
  }

  return (
    <div className='input-wrapper'>
      <input data-testid={inputName} onChange={handleChange} {...props} />
      <span data-testid={`${inputName}-status`} title={getTitle()} className='status'>{getStatus()}</span>
    </div>
  )
}

export default Input
