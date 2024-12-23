import './spinner-styles.scss'

import React from 'react'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC = (props: Props) => {
  return (
    <div data-testid="spinner" {...props} className={['spinner', props.className].join(' ')}>
      <div></div><div></div><div></div><div></div>
    </div>
  )
}

export default Spinner
