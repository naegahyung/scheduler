import React, { Component } from 'react';
import { connect } from 'react-redux';

import { rePosition } from '../main.action';
import style from '../main.css';

class CourseRow extends Component {
 
  state = { day: "M" }
  
  renderBoxes = () => {
    let boxes = [];
    for (let i = 0; i < 12 * 14; i++) {
      boxes.push(
        <div 
          key={i}
          style={style.box(i)}
        />
      );
    }
    return boxes;
  }

  renderRoomName(roomName) {
    return (
      <div style={style.roomName}>
        {roomName}
      </div>
    );
  }

  dragEnd = (e) => {
    console.log(Object.keys(e));
    this.props.rePosition(
      { x: e.pageX, y: e.pageY }, 
      e.currentTarget.id, 
      this.state.day, 
      e.currentTarget.getAttribute('name')
    );
  }

  dragStart = (e) => {
    console.log(e.currentTarget.getAttribute('name'));
  }

  render() {
    return (
      <div style={style.row}>
        {this.renderBoxes()}
        {this.renderRoomName(this.props.classes._id)}{
        this.props.classes.sessions[this.state.day].map(c => (
          <div 
            draggable={true}
            id={c._id}
            onDragStart={this.dragStart}
            name={this.props.index}
            key={c._id}
            style={style.interval5Min(getStart(c.start), parseInt(c.duration, 10))}
            onDragEnd={this.dragEnd}
          >
            {c.start}
          </div>
        ))
      }</div>
    ); 
  }
};

const getStart = (str) => {
  return (parseInt(str.slice(0, 2) - 8, 10) * 60) + parseInt(str.slice(2, 4), 10);
};

export default connect(null, { rePosition })(CourseRow);

