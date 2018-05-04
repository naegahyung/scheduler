import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';
import { detect } from 'detect-browser';
import { getAllCourses } from './main.action';
import CourseRow from './components/CourseRow';
import Header from './components/header';
import {
  leftPadding,
} from './main.constant';
import style from './main.css'


class MainPage extends Component {

  state = { day_1: 'M', day_2: 'T', chrome: false,
    shownDates: [ 'M', 'T', '$', '$', '$' ],
    'M': true,
    'T': true,
    'W': false,
    'R': false,
    'F': false,
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
    return (
      <div style={{ position: 'relative', marginLeft: '50px', display:  leftIndex === -1 ? 'none' : 'inline-block' }}>{
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
      <div style={style.classNamesBox}>{
        this.props.classes.map((c, i) => (
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
      console.log(dayToBeModified);
      console.log(typeof dayToBeModified);
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
    this.setState({ shownDates: shownDatesModified });
  }

  renderOptionsForDays() {
    const dayOptions = [
      { key: 'M', value: 'M', text: 'Monday' },
      { key: 'T', value: 'T', text: 'Tuesday' },
      { key: 'W', value: 'W', text: 'Wednesday' },
      { key: 'R', value: 'R', text: 'Thursday' },
      { key: 'F', value: 'F', text: 'Friday' },
    ];
    return (
      <div style={{ position: 'absolute', right: '10px', zIndex: 1 }}>{
        dayOptions.map(o => (
          <div>
            <Checkbox 
              label={o.text} 
              id={o.key} 
              onClick={this.turnOnDay} 
              defaultChecked={this.state[o.key]} />
          </div>
        ))
      }</div>
    ) 
  }
  

  render() {
    if (this.props.courses.length > 0) {
      return (
        <div>
          {this.renderOptionsForDays()}
          <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <Header dates={this.state.shownDates.filter(e => e !== '$')} />
            {this.renderClassNames()}
              <div style={{ marginLeft: '100px' }}>
              {
                this.dayOptions.map(o => {
                  return this.renderCourseRows(o.key, this.state.shownDates.filter(s => s !== '$').indexOf(o.key))
                })
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
  let classes = main.courses.map(e => e._id);
  return { courses: main.courses, classes } 
};

export default connect(mapStateToProps, { getAllCourses })(MainPage);
