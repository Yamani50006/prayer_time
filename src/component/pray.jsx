import React from 'react'
import './pray.css'
const pray = (props) => {
  return (
    <div className='con'>
<p className='name-prayer'>{props.name}</p>
<p className='time-prayer'>{props.time}</p>

    </div>
  )
}

export default pray