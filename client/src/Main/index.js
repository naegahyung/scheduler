import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

import { getAllCourses } from './main.action';
import CourseRow from './components/CourseRow';

class MainPage extends Component {

  state = { day: 'M' }

  componentDidMount = async () => {
    await this.props.getAllCourses('SPR18');
  }

  renderCourseRows() {
    return (
      <div>{
        this.props.courses.map((classes, index) => (
          <CourseRow classes={classes} key={classes._id} index={index} day={this.state.day} />  
        ))
      }</div>
    );
  }

  changeDay = (e, data) => {
    this.setState({ day: data.value });
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
        <Dropdown placeholder='Monday' search selection options={dayOptions} 
          onChange={this.changeDay}
        /> 
      </div>
    )
  }

  render() {
    if (this.props.courses.length > 0) {
      return (
        <div>
          {this.renderDropDownButton()}
          {this.renderCourseRows()}
        </div>
      )
    } else {
      return (
        <div>
          Loading
        </div>
      );
    }
  }
}

const mapStateToProps = ({ main }) => (
  { courses: main.courses }
);

export default connect(mapStateToProps, { getAllCourses })(MainPage);
