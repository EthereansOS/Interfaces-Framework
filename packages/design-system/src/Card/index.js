import React from 'react'
import style from './card.module.scss'

const Card = ({ children }) => <div className={style['root']}>{children}</div>

export default Card
