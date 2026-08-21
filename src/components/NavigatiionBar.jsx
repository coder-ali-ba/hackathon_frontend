import React from 'react'
import { Link } from 'react-router-dom'

function NavigatiionBar() {
  return (
    <div className='flex gap-5'>
      <Link to="/">register page</Link>
      

      <Link to="/signin">login page</Link>
    </div>
  )
}

export default NavigatiionBar
