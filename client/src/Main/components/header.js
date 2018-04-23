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

const header = ({ day1, day2 }) => {
  return (
  <div style={style.header}>
    <div style={style.headerChildren(row/2)}>{code[day1]}</div>
    <div style={style.headerChildren(row + row/2)}>{code[day2]}</div>
  </div>
)};

export default header;