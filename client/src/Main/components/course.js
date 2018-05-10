import React from 'react'
import { Popup, Message } from 'semantic-ui-react';

/**
 * class Course { 
 *   Position pos // {x, y}
 *   String day 
 *   Object info // rest of info about the course
 * }
 * 
 */
const course = ({ pos, day, info  }) => {
  const { _id, time, instructor, num, crs, duration, start } = info;
  return (
    <Popup
      trigger={
        <div 
          draggable={true}
          id={_id}
          className={day}
          key={_id}
          style={style.interval5Min(getStart(start), parseInt(duration, 10))}
          onDragEnd={this.dragEnd}
          onDragStart={this.dragStart}
        >
          {`${info.crs} ${info.num}`}
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
  );
};

export default course;