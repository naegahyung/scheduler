import React from 'react'
import { Checkbox } from 'semantic-ui-react';
import { push as Menu } from 'react-burger-menu';
import style from '../main.css';
import '../../app/main.css';

const initialDays = [ 'M', 'T' ];

const leftBarMenu = ({ turnOnDay, toggleGrid, toggleSpecificTimes }) => {
  const dayOptions = [
    { key: 'M', text: 'Monday' },
    { key: 'T', text: 'Tuesday' },
    { key: 'W', text: 'Wednesday' },
    { key: 'R', text: 'Thursday' },
    { key: 'F', text: 'Friday' },
  ];
  return (
    <Menu right>
      <div style={style.leftMenuStyle}>{
      dayOptions.map(o => (
        <div>
          <Checkbox 
            label={o.text} 
            id={o.key} 
            onClick={turnOnDay} 
            defaultChecked={initialDays.includes(o.key)} />
        </div>
      ))
      }</div>
      <div style={style.leftMenuStyle} >
        <div style={{ padding: '3px' }}>
          <Checkbox 
            slider 
            label='Grid'
            onChange={toggleGrid}  
            defaultChecked={true}
            color='yellow'
          />
        </div>
        <div style={{ padding: '3px' }}>
          <Checkbox 
            slider 
            label='65 Min Frames'
            onChange={toggleGrid}  
            defaultChecked={false}
          />
        </div>
        <div style={{ padding: '3px' }}>
          <Checkbox 
            slider 
            label='210 Min Frames'
            onChange={toggleGrid}  
            defaultChecked={false}
          />
        </div>
      </div>
      <div style={style.leftMenuStyle}>
      </div>
    </Menu>
  ) 
};

export default leftBarMenu;