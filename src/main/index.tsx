import '@/presentation/styles/global.scss'

import React from 'react'
import * as ReactDOM from 'react-dom'

import { Router } from '@/presentation/components'
import { makeLogin } from '@/main/factories/pages/login/login-factory'

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(<Router makeLogin={makeLogin} />, document.getElementById('main'))
