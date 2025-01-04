import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

type Factory = {
  makeLogin: React.FC
  makeSignUp: React.FC
}

const Router: React.FC<Factory> = ({ makeLogin: MakeLogin, makeSignUp: MakeSignUp }: Factory) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
        <Route path="/signup" element={<MakeSignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
