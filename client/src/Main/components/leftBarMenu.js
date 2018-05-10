import React from 'react'
import { Checkbox, Dropdown } from 'semantic-ui-react';
import { push as Menu } from 'react-burger-menu';

import style from '../main.css';
import '../../app/main.css';

const initialDays = [ 'M', 'T' ];

const leftBarMenu = ({ turnOnDay, toggleGrid, filterCrs, filterLevels, crs, colors }) => {
  const dayOptions = [
    { key: 'M', text: 'Monday' },
    { key: 'T', text: 'Tuesday' },
    { key: 'W', text: 'Wednesday' },
    { key: 'R', text: 'Thursday' },
    { key: 'F', text: 'Friday' },
  ];
  
  const levelOptions = [
    { text: 'Undergrad', value: 'U' },
    { text: 'Grad', value: 'G' }
  ]

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
      <div style={style.leftMenuStyle}>{
        levelOptions.map(l => (
          <div>
            <Checkbox 
              label={l.text}
              name={l.value}
              defaultChecked={true}
              onChange={filterLevels}
              style={{ height: '25px'}}
            />
          </div>
        ))
      }</div>
      <div style={style.leftMenuStyle}>{
        crs.map((course, i) => (
          <div>
            <Checkbox 
              label={
                <label style={{ paddingRight: '20px', minWidth: '120px' }}>{course}</label>
              }
              name={course}
              defaultChecked={true}
              style={{ display: 'inline-block' }}
              onChange={filterCrs}
            />
            <div style={style.crsColorBox(colors[course])}/>
          </div> 
        ))
      }</div>
    </Menu>
  ) 
};

export default leftBarMenu;