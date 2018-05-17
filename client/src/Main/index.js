import React, { Component } from 'react'
import { connect } from 'react-redux';
import { detect } from 'detect-browser';

import { 
  getAllCourses, 
  getAllCrs, 
  filterCrs, 
  filterLevels
} from './main.action';
import OutlineBox from './components/OutlineBox';
import CourseRow from './components/CourseRow';
import LeftBarMenu from './components/leftBarMenu';
import Header from './components/header';
import {
  totalMarginColumn,
  colorScheme,
} from './main.constant';
import style from './main.css';


class MainPage extends Component {

  state = {
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
    if (detect().name !== 'd') {
      await this.props.getAllCourses('SPR18');
      await this.props.getAllCrs('SPR18');
    }
  }

  renderCourseRows(day, leftIndex) {
    if (leftIndex !== -1) {
      return (
        <div style={{ 
          position: 'relative',
          marginLeft: totalMarginColumn/2,
          marginRight: totalMarginColumn/2, 
          display: 'inline-block' 
          }}
          key={`daycolumn_${day}`}
        >
          { this.props.courses.map((classes, i) => (
            <CourseRow 
              classes={classes} 
              key={classes._id} 
              day={day}
              room={classes._id} 
              currentDates={this.state.shownDates.filter(e => e !== '$')} 
              colors={this.props.colors}
              index={i}
            />  
          ))}
        </div>
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
          <div style={style.roomName(i)} key={`classname_${i}`}>{c}</div>
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
    this.setState({ 
      shownDates: shownDatesModified, 
      filteredDates: shownDatesModified.filter(e => e !== '$') 
    });
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
            crs={this.props.crs}
            colors={this.props.colors}
            filterCrs={this.props.filterCrs}
            filterLevels={this.props.filterLevels}
          />
          {this.renderClassNames()}
          <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <Header dates={this.state.shownDates.filter(e => e !== '$')} />
            <OutlineBox 
              numberOfRooms={this.props.rooms.length}
              dayIndexes={this.state.filteredDates.length} 
              grid={this.state.gridShown}
              sixFive={this.state.sixFiveShown}
              twoTen={this.state.twoTenShown}
            />
            <div style={{ marginLeft: `${totalMarginColumn}px` }}>
            {
              this.dayOptions.map(o => (
                this.renderCourseRows(
                  o.key, 
                  this.state.shownDates.filter(s => s !== '$').indexOf(o.key)
                )
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

const mapStateToProps = ({ main }) => {
  let colors = {};
  // main.crs is guaranteed to generate unique values only
  main.crs.forEach((course, i) => {
    colors[course] = colorScheme[i];
  });
  return { courses: main.filteredCourses, rooms: main.rooms, crs: main.crs, colors };
};

export default connect(mapStateToProps, { 
  getAllCourses, getAllCrs, filterCrs, filterLevels
})(MainPage);
