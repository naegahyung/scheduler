import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getAllCourses } from './main.action';
import CourseRow from './components/CourseRow';

class MainPage extends Component {

  componentDidMount = async () => {
    await this.props.getAllCourses('SPR18');
  }

  renderCourseRows() {
    return (
      <div>{
        this.props.courses.map((classes, index) => (
          <CourseRow classes={classes} key={classes._id} index={index} />  
        ))
      }</div>
    );
  }

  renderDropDownButton() {
    return (
      <div className="dropdown is-right">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>Dropdown button</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <a href="#" className="dropdown-item">
              Dropdown item
            </a>
            <a className="dropdown-item">
              Other dropdown item
            </a>
            <a href="#" className="dropdown-item is-active">
              Active dropdown item
            </a>
            <a href="#" className="dropdown-item">
              Other dropdown item
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              With a divider
            </a>
          </div>
        </div>
      </div>
    )
  }

  render() {
    if (this.props.courses.length > 0) {
      return (
        <div>
          {this.renderCourseRows()}
          {this.renderDropDownButton()}
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
