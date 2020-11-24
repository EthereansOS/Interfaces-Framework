import React from 'react'
import dog from './dog-image.jpg'
import './dog-style.css'

export default function Dog() {
  return (
    <div className="dog">
      <img alt="dog" src={dog} />
    </div>
  )
}
