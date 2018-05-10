import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popup, Message } from 'semantic-ui-react';
import Draggable from 'react-draggable';

import OutlineBox from './OutlineBox';
import { rePosition } from '../main.action';
import style from '../main.css';
import { 
  leftPadding,
  true5MinWidth,
  height,
} from '../main.constant';

class CourseRow extends Component {

  state = { 
    fromFirst: false, 
    startPos: { x: 0, y: 0 },
  };

  dragEnd = (e) => {
    let destination, x, y;
    x = e.pageX;
    y = e.pageY;
    if (x > leftPadding(1)) {
      destination = this.state.fromFirst ? this.props.alterDay : this.props.day;
    } else {
      destination = this.state.fromFirst ? this.props.day : this.props.alterDay;
    }
    
    this.props.rePosition(
      { x, y }, 
      e.currentTarget.id, 
      destination,
      e.currentTarget.getAttribute('class'),
      e.currentTarget.getAttribute('name'),
    
    );
  }

  dragStart = (e) => {
    console.log(this.state.startPos);
    this.setState({ fromFirst: e.pageX > leftPadding(1) ? false : true });
  }

  render() {
    return (
      <div style={style.row}>
      {
        this.props.classes.sessions[this.props.day].map(c => (
          <Draggable
            handle='.handle'
            grid={[3, height]}
          > 
            <div>
              <Popup
                trigger={
                  <div 
                    id={c._id}
                    className='handle'
                    name={this.props.index}
                    key={c._id}
                    style={
                      style.interval5Min(
                        getStart(c.start), 
                        parseInt(c.duration, 10), 
                        this.props.colors[c.crs]
                      )
                    }
                  >
                    {`${c.crs} ${c.num}`}
                  </div>
                }
                hideOnScroll
                flowing
                on='click'
              >
                <Message>
                  <Message.Header>
                    {c.title}
                  </Message.Header>
                  <div>{c.time}</div>
                  <div>{c.instructor}</div>
                </Message>
              </Popup>
            </div>
          </Draggable>
        ))
      }
      </div>
    ); 
  }
};

const getStart = (str) => ( 
  (parseInt(str.slice(0, 2) - 8, 10) * 60) + parseInt(str.slice(2, 4), 10) 
);


export default connect(null, { rePosition })(CourseRow);

