import axios from 'axios';
import {
  FETCH_COURSES,
  MOVE_COURSE
} from './main.type';
import {
  height,
  fiveMinutes,
  leftPadding,
  headerHeight
} from './main.constant';

export const getAllCourses = semester => async dispatch => {
  // semester follows the format SPR18 SSSYY
  const res = await axios.get(`/api/courses/${semester}`);
  dispatch({ type: FETCH_COURSES, payload: res.data });
};

//https://www.npmjs.com/package/react-cursor-position maybe incorporate this
export const rePosition = (position, id, destination, sourceDay, oldRoomIndex) => {
  let padding = position.x > leftPadding(1) ? leftPadding(1) : leftPadding(0);
  const minutes = Math.floor((position.x - padding) / fiveMinutes) * 5;
  let h = Math.floor(minutes / 60) + 8;
  h = h < 10 ? "0" + String(h) : String(h);
  let m = minutes % 60;
  m = m < 10 ? "0" + String(m) : String(m);
  const newStart = h + m;
  const newRoomIndex =  Math.floor((position.y - headerHeight) / height);
  return { type: MOVE_COURSE, payload: { start: newStart, id, destination, oldRoomIndex, newRoomIndex, sourceDay } };
};