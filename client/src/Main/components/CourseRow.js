import React from 'react';

import Course from './Course';
import style from '../main.css';

export default ({ day, index, colors, currentDates, classes }) => (
  <div 
    style={style.row} 
    data-day={day}
    data-index={index}
  >{
    classes.sessions[day].map((c, i) => (
      <Course 
        key={`courserow_${i}`}
        info={c} 
        day={day} 
        index={index} 
        colors={colors}
        currentDates={currentDates} 
        position={{ x: 0, y: 0 }}
      />
    ))
  }
  </div>
); 


