import './input-styles.scss'

import React from 'react'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className='input-wrapper'>
      <input {...props} />
      <span className='status'>🔴</span>
    </div>
  )
}

export default Input
