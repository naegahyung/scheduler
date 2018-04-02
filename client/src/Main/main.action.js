import axios from 'axios';
import {
  FETCH_COURSES,
  MOVE_COURSE
} from './main.type';

export const getAllCourses = semester => async dispatch => {
  // semester follows the format SPR18 SSSYY
  const res = await axios.get(`/api/courses/${semester}`);
  dispatch({ type: FETCH_COURSES, payload: res.data });
};

export const rePosition = (position, id, day, oldRoomIndex) => {
  const minutes = Math.floor(position.x / 7) * 5;
  let h = Math.floor(minutes / 60) + 8;
  h = h < 10 ? "0" + String(h) : String(h);
  let m = minutes % 60;
  m = m < 10 ? "0" + String(m) : String(m);
  const newStart = h + m;
  const newRoomIndex = Math.floor(position.y / 50);
  return { type: MOVE_COURSE, payload: { start: newStart, id, day, oldRoomIndex, newRoomIndex } };
};