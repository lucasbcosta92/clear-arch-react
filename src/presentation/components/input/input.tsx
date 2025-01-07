/* eslint-disable react/prop-types */
import './input-styles.scss'

import React, { useContext, useRef } from 'react'

import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)

  const inputRef = useRef<HTMLInputElement>()

  const inputName = props.name
  const placeholder = props.placeholder
  const error = state[`${inputName}Error`]

  return (
    <div className='input-wrapper'>
      <input
        {...props}
        data-testid={inputName}
        placeholder=' '
        ref={inputRef}
        onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}
      />
      <label onClick={() => { inputRef.current.focus() }}>
        {placeholder}
      </label>
      <span
        data-testid={`${inputName}-status`}
        title={error || 'OK'}
        className='status'
      >
        {error ? '❌' : '✅'}
      </span>
    </div>
  )
}

export default Input
