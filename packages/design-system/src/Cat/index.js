import React from 'react'
import cat from './cat-image.jpg'
import './cat-style.css'

export default function Cat() {
  return (
    <div className="cat">
      <img alt="cat" src={cat} />
    </div>
  )
}
