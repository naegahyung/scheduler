import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { detect } from 'detect-browser';
import { getAllCourses } from './main.action';
import CourseRow from './components/CourseRow';
import Header from './components/header';
import {
  leftPadding1,
  leftPadding2,
} from './main.constant';
import style from './main.css'


class MainPage extends Component {

  state = { day_1: 'M', day_2: 'T', chrome: false }

  code = {
    M: 'Monday',
    T: 'Tuesday',
    W: 'Wednesday',
    R: 'Thursday',
    F: 'Friday',
  }

  componentDidMount = async () => {
    if (detect().name !== 'safari') {
      await this.props.getAllCourses('SPR18');
    }
  }

  renderCourseRows(day, alterDay, leftPosition) {
    return (
      <div style={{ position: 'absolute', left: leftPosition }}>{
        this.props.courses.map((classes, index) => (
          <CourseRow classes={classes} key={classes._id} index={index} day={day} alterDay={alterDay}/>  
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
      <div style={{ paddingLeft: '10px' }}>{
        this.props.classes.map((c, i) => (
          <div style={style.roomName(i)}>{c}</div>
        ))  
      }</div>
    )
  }

  renderDropDownButton() {
    const dayOptions = [
      { key: 'M', value: 'M', text: 'Monday' },
      { key: 'T', value: 'T', text: 'Tuesday' },
      { key: 'W', value: 'W', text: 'Wednesday' },
      { key: 'R', value: 'R', text: 'Thursday' },
      { key: 'F', value: 'F', text: 'Friday' },
    ];
    return (
      <div style={{ position: 'absolute', right: '10px' }}>
        <div>
          <div>First Chart:</div>
          <Dropdown placeholder='Monday' search selection options={dayOptions} 
            onChange={this.changeDay}
          />
        </div>
        <div>
          <div>Second Chart:</div>
          <Dropdown placeholder='Tuesday' search selection options={dayOptions.map(e => ({ ...e, value: e.value + '_2'}))} 
            onChange={this.changeDay}
          />
        </div>
      </div>
    )
  }

  render() {
    if (this.props.courses.length > 0) {
      return (
        <div>
          <Header day1={this.state.day_1} day2={this.state.day_2}/>
          {this.renderDropDownButton()}
          {this.renderClassNames()}
          {this.renderCourseRows(this.state.day_1, this.state.day_2, leftPadding1)}
          {this.renderCourseRows(this.state.day_2, this.state.day_1, leftPadding2)}
        </div>
      )
    } else {
      return (
        <div style={{ textAlign: 'center', fontSize: '15pt', marginTop: '50px' }}>
          Please advise that Safari is currently not supported for this web application 
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
