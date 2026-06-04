import './App.css'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

import React from 'react'

const App = () => {
  return (
    <>
      <header>
        <Show when="signed-out">
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
          {/* mode="modal" makes the sign-up form appear in a popup modal dialog instead of redirecting to a separate page */}
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default App

// 