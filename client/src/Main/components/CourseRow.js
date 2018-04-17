import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popup, Message } from 'semantic-ui-react';

import { rePosition } from '../main.action';
import style from '../main.css';
import { 
  leftPadding2,
  fiveMinutes,
} from '../main.constant';

class CourseRow extends Component {

  state = { fromFirst: false };
 
  renderBoxes = () => {
    let boxes = [];
    for (let i = 0; i < 12 * 14; i++) {
      boxes.push(
        <div 
          key={i}
          style={style.box(i, fiveMinutes)}
        />
      );
    }
    return boxes;
  }

  drawSpecificTimeFrame = () => {
    let boxes = [];
    const specifics = [
      { section: "08:00-11:30", duration: 210, start: 0 },
      { section: "13:35-17:05", duration: 210, start: 67 },
      { section: "18:00-21:30", duration: 210, start: 120 },  
      { section: "11:45-12:50", duration: 65, start: 45 },
      { section: "17:15-18:20", duration: 65, start: 111 },
      { section: "19:05-20:10", duration: 65, start: 133 },
      { section: "20:20-21:25", duration: 65, start: 148 },
    ];
    for (let session of specifics) {
      let { duration, section, start } = session;
      boxes.push(
        <div
          key={`session_${section}`}
          style={
            style.specificBox(
              start, 
              (duration / 5) * fiveMinutes, 
              duration === 65 ? "0074D9" : "7FDBFF"
            )
          }
        />
      )
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
    let destination;
    if (e.pageX > leftPadding2) {
      destination = this.state.fromFirst ? this.props.alterDay : this.props.day;
    } else {
      destination = this.state.fromFirst ? this.props.day : this.props.alterDay;
    }
    
    this.props.rePosition(
      { x: e.pageX, y: e.pageY }, 
      e.currentTarget.id, 
      destination,
      e.currentTarget.getAttribute('class'),
      e.currentTarget.getAttribute('name'),
    
    );
  }

  dragStart = (e) => {
    this.setState({ fromFirst: e.pageX > leftPadding2 ? false : true });
  }

  render() {
    return (
      <div style={style.row}>
        {this.renderBoxes()}
        {this.drawSpecificTimeFrame()}
        {this.renderRoomName(this.props.classes._id)}{
        this.props.classes.sessions[this.props.day].map(c => (
          <Popup
            trigger={
              <div 
                draggable={true}
                id={c._id}
                name={this.props.index}
                className={this.props.day}
                key={c._id}
                style={style.interval5Min(getStart(c.start), parseInt(c.duration, 10))}
                onDragEnd={this.dragEnd}
                onDragStart={this.dragStart}
              >
                {`${c.crs} ${c.num}`}
              </div>
            }
            hideOnScroll
            flowing
          >
            <Message>
              <Message.Header>
                {c.title}
              </Message.Header>
              <div>{c.time}</div>
              <div>{c.instructor}</div>
            </Message>
          </Popup>
        ))
      }</div>
    ); 
  }
};

const getStart = (str) => {
  return (parseInt(str.slice(0, 2) - 8, 10) * 60) + parseInt(str.slice(2, 4), 10);
};

export default connect(null, { rePosition })(CourseRow);

