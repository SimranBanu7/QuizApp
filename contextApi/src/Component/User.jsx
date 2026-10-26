import React from 'react'
import { useContext } from 'react'
import UserContext from './UserContext'

const User = () => {
    const username = useContext(UserContext)
  return (
    <div>
         <h3> Hello {username}</h3>
    </div>
  )
}

export default User
