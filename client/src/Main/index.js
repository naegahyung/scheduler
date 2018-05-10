import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';
import { detect } from 'detect-browser';
import { getAllCourses } from './main.action';

import OutlineBox from './components/OutlineBox';
import CourseRow from './components/CourseRow';
import LeftBarMenu from './components/leftBarMenu';
import Header from './components/header';
import {
  leftPadding,
  row,
  totalMarginColumn,
} from './main.constant';
import style from './main.css'


class MainPage extends Component {

  state = { day_1: 'M', day_2: 'T', chrome: false,
    shownDates: [ 'M', 'T', '$', '$', '$' ],
    filteredDates: [ 'M', 'T' ],
    'M': true,
    'T': true,
    'W': false,
    'R': false,
    'F': false,
    gridShown: true,
    sixFiveShown: false,
    twoTenShown: false,
  }

  dayOptions = [
    { key: 'M', text: 'Monday' },
    { key: 'T', text: 'Tuesday' },
    { key: 'W', text: 'Wednesday' },
    { key: 'R', text: 'Thursday' },
    { key: 'F', text: 'Friday' },
  ];

  componentDidMount = async () => {
    if (detect().name !== 'safari') {
      await this.props.getAllCourses('SPR18');
    }
  }

  renderCourseRows(day, leftIndex) {
    if (leftIndex !== -1) {
      return (
        <div style={{ 
          position: 'relative',
          marginLeft: '50px',
          marginRight: '50px', 
          display: 'inline-block' 
          }}>{
          this.props.courses.map((classes, index) => (
            <CourseRow 
              classes={classes} 
              key={classes._id} 
              index={index} 
              day={day} 
              currentDates={this.state.shownDates.filter(e => e !== '$')} 
            />  
          ))
        }</div>
      ); 
    }
  }

  changeDay = (e, data) => {
    let value = data.value.charAt(0);
    if (data.value.includes('_2')) {
      if (value !== this.state.day_1) {
        this.setState({ day_2: data.value.charAt(0) });
      }
    } else {
      if (value !== this.state.day_2) {
        this.setState({ day_1: data.value });
      }
    }
  }

  renderClassNames() {
    return (
      <div style={style.classNamesBox(this.props.rooms.length)}>{
        this.props.rooms.map((c, i) => (
          <div style={style.roomName(i)}>{c}</div>
        ))  
      }</div>
    )
  }

  turnOnDay = (e, data) => {
    let dayToBeModified = data.id;
    this.setState({ [dayToBeModified]: !this.state[dayToBeModified] });
    let shownDatesModified = this.state.shownDates.slice();
    let i = shownDatesModified.indexOf(dayToBeModified);
    if (i > -1) {
      shownDatesModified.splice(i, 1, '$');
    } else {
      let insertIndex;
      switch (dayToBeModified) {
        case 'T': 
          insertIndex = 1;
          break;
        case 'W':
          insertIndex = 2;
          break;
        case 'R': 
          insertIndex = 3;
          break;
        case 'F': 
          insertIndex = 4;
          break;
        default:
          insertIndex = 0;
      }
      shownDatesModified.splice(insertIndex, 1, dayToBeModified);
    }
    this.setState({ shownDates: shownDatesModified, filteredDates: shownDatesModified.filter(e => e !== '$') });
  }

  toggleGrid = (e, data) => {
    switch (data.label) {
      case 'Grid':
        this.setState({ gridShown: data.checked });
        break;
      case '65 Min Frames':
        this.setState({ sixFiveShown: data.checked });
        break;
      case '210 Min Frames':
        this.setState({ twoTenShown: data.checked });
        break;
      default:
        return;
    }
  }

  render() {
    if (this.props.courses.length > 0) {
      return (
        <div>
          <LeftBarMenu 
            turnOnDay={this.turnOnDay} 
            toggleGrid={this.toggleGrid}
          />
          <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <Header dates={this.state.shownDates.filter(e => e !== '$')} />
            <OutlineBox 
              numberOfRooms={this.props.rooms.length}
              dayIndexes={this.state.filteredDates.length} 
              grid={this.state.gridShown}
              sixFive={this.state.sixFiveShown}
              twoTen={this.state.twoTenShown}
            />
            {this.renderClassNames()}
              <div style={{ marginLeft: `${totalMarginColumn}px` }}>
              {
                this.dayOptions.map(o => (
                  this.renderCourseRows(o.key, this.state.shownDates.filter(s => s !== '$').indexOf(o.key))
                ))
              }
              </div>
          </div>
        </div>
      )
    } else {
      return (
        <div style={{ textAlign: 'center', fontSize: '15pt', marginTop: '50px' }}>
          Please be advised that Safari is currently not supported for this web application 
          due to Safari's unique mouse-handling coordinates. Try again in Chrome. 
        </div>
      );
    }
  }
}

const mapStateToProps = ({ main }) => (
  { courses: main.courses, rooms: main.rooms } 
);

export default connect(mapStateToProps, { getAllCourses })(MainPage);
