import React, { Component } from 'react'
import { Popup, Message } from 'semantic-ui-react';
import Draggable  from 'react-draggable';
import { connect } from 'react-redux';

import {
  true5MinWidth,
  height,
  columnPadding, 
} from '../main.constant';
import style from '../main.css';
import { rePosition } from '../main.action'; 


class Course extends Component {

  state = { 
    id: '',
    day: '', 
    room: '',
    left: 0,
    x: 0,
    y: 0,
    open: false,
    dragging: true,
    disabled: false
  }

  
  componentWillUnmount() {
    console.log("Yo");
  }
  

  dragEnd = (e, data) => {
    let shouldBeMoved = true;
    if (typeof this.state.room === 'undefined'  || isNaN(this.state.room) || this.state.room < 0) shouldBeMoved = false;
    if (!this.state.id || !this.state.day) shouldBeMoved = false;

    const roomIndex = data.lastY / 20 + this.state.room;
    
    let movement = data.lastX + this.state.left;
    const dayOffset = Math.floor(movement / columnPadding);

    if (dayOffset < 0) {
      movement = Math.abs(columnPadding * dayOffset) + movement; 
    }
    const offset = Math.abs(movement % columnPadding);
    
    const destData = { 
      day: this.props.currentDates[dayOffset + this.props.currentDates.indexOf(this.state.day)],
      minuteOffset: offset,
      roomIndex,
    };

    if (!destData.day) shouldBeMoved = false;
    if (shouldBeMoved) {
      this.props.rePosition(this.state, destData);
      this.setState({ x: 0, y: 0 });
    }
  }

  dragStart = (e, data) => {
    const target = e.currentTarget.children[0];
    const day = target.getAttribute('data-day');
    const room = parseInt(target.getAttribute('data-room'), 10);
    this.setState({ 
      id: target.id,
      day, 
      room, 
      left: parseInt(target.style.left.replace('px', ''), 10),
    });
  }

  onDrag = (e, data) => {
    this.setState({ x: data.x, y: data.y });
  }

  render() {
    const { info, day, index, colors } = this.props;
    const { _id, start, duration, crs, num, title, time, instructor, } = info;
    return (
      <Draggable
        handle='.handle'
        axis='none'
        grid={[true5MinWidth, height]}
        onStart={this.dragStart}
        onStop={this.dragEnd}
        onDrag={this.onDrag}
        position={{ x: this.state.x, y: this.state.y }}
        disabled={this.state.disabled}
      > 
        <div>
          <Popup
            trigger={
              <div 
                id={_id}
                key={_id}
                className="handle"
                data-day={day}
                data-room={index}
                style={
                  style.interval5Min(
                    getStart(start), 
                    parseInt(duration, 10), 
                    colors[crs]
                  )
                }
              >
                {`${crs} ${num}`}
              </div>
            }
            hideOnScroll
            flowing
            on='click'
          >
            <Message>
              <Message.Header>
                {title}
              </Message.Header>
              <div>{time}</div>
              <div>{instructor}</div>
            </Message>
          </Popup>
        </div>
      </Draggable>
    );  
  }
};

const getStart = (str) => ( 
  (parseInt(str.slice(0, 2) - 8, 10) * 60) + parseInt(str.slice(2, 4), 10) 
);

export default connect(null, { rePosition })(Course);