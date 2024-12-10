import React from 'react'
import './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC = (props: Props) => {
  return (
    <div {...props} className={['spinner', props.className].join(' ')}>
      <div></div><div></div><div></div><div></div>
    </div>
  )
}

export default Spinner
