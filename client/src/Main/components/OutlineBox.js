import React, { Component } from 'react'

import style from '../main.css';
import {
  fiveMinutes,
} from '../main.constant';

class OutlineBox extends Component {


  sixFive = [
    { section: "11:45-12:50", duration: 65, start: 45 },
    { section: "17:15-18:20", duration: 65, start: 111 },
    { section: "19:05-20:10", duration: 65, start: 133 },
    { section: "20:20-21:25", duration: 65, start: 148 },
  ];

  twoTen = [
    { section: "08:00-11:30", duration: 210, start: 0 },
    { section: "13:35-17:05", duration: 210, start: 67 },
    { section: "18:00-21:30", duration: 210, start: 120 },  
  ];

  display = bool => ({ display : bool ? 'block' : 'none' })

  shouldComponentUpdate(nextProps) {
    return true;
  }

  renderBoxes = () => {
    let boxes = [];
    for (let i = 0; i < 12 * 14 + 1; i++) {
      boxes.push(
        <div 
          key={i}
          style={style.box(i, this.props.numberOfRooms)}
        />
      );
    }
    return boxes;
  }

  renderBoxesAllDays(func) {
    let boxes = [];
    for (let i = 0; i < this.props.dayIndexes; i++) {
      boxes.push(
        <div style={style.boxWrapper(i)} key={`grid_${i}`}>{func()}</div> 
      );
    }
    return boxes;
  }

  drawSpecificTimeFrame = (timeSlots) => {
    let boxes = [];
    for (let session of timeSlots) {
      let { duration, section, start } = session;
      boxes.push(
        <div
          key={`session_${section}`}
          style={
            style.specificBox(
              start, 
              (duration / 5) * fiveMinutes, 
              duration === 65 ? "0074D9" : "7FDBFF",
              this.props.numberOfRooms,
            )
          }
        />
      )
    }
    return boxes;
    }

  render() {
    return (
      <div style={{ width: '0px' }}>
        <div style={this.display(this.props.grid)}>
          {this.renderBoxesAllDays(this.renderBoxes)}
        </div>
        <div style={this.display(this.props.sixFive)}>
          {this.renderBoxesAllDays(this.drawSpecificTimeFrame.bind(this, this.sixFive))}
        </div>
        <div style={this.display(this.props.twoTen)}>
          {this.renderBoxesAllDays(this.drawSpecificTimeFrame.bind(this, this.twoTen))}
        </div>
      </div>
    )
  }
}


export default OutlineBox;