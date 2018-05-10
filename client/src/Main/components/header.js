import React from 'react'
import style from '../main.css';
import { row } from '../main.constant';

const code = {
  M: 'Monday',
  T: 'Tuesday',
  W: 'Wednesday',
  R: 'Thursday',
  F: 'Friday',
};

const header = ({ dates }) => {
  return (
  <div style={style.header}>{
    dates.map((date, i) => (
      <div style={style.headerChildren(i)}>{code[date]}</div> 
    ))
  }</div>
)};

export default header;