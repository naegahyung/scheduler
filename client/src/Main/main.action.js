import axios from 'axios';
import {
  FETCH_COURSES,
  MOVE_COURSE,
  FETCH_CRS,
  ADD_CRS,
  FILTER_CRS,
  ADD_LEVEL,
  FILTER_LEVEL
} from './main.type';
import {
  height,
  leftPadding,
  headerHeight,
  true5MinWidth
} from './main.constant';

export const getAllCourses = semester => async dispatch => {
  // semester follows the format SPR18 SSSYY
  const res = await axios.get(`/api/courses/${semester}`);
  dispatch({ type: FETCH_COURSES, payload: res.data });
};

//https://www.npmjs.com/package/react-cursor-position maybe incorporate this
export const rePosition = (position, id, destination, sourceDay, oldRoomIndex) => {
  let padding = position.x > leftPadding(1) ? leftPadding(1) : leftPadding(0);
  const minutes = Math.floor((position.x - padding) / true5MinWidth) * 5;
  let h = Math.floor(minutes / 60) + 8;
  h = h < 10 ? "0" + String(h) : String(h);
  let m = minutes % 60;
  m = m < 10 ? "0" + String(m) : String(m);
  const newStart = h + m;
  const newRoomIndex =  Math.floor((position.y - headerHeight) / height);
  return { type: MOVE_COURSE, payload: { start: newStart, id, destination, oldRoomIndex, newRoomIndex, sourceDay } };
};

export const getAllCrs = semester => async dispatch => {
  const res = await axios.get(`/api/crs/${semester}`);
  dispatch({ type: FETCH_CRS, payload: res.data });
}

export const filterCrs = (e, data) => (
  { type: data.checked ? ADD_CRS : FILTER_CRS, payload: data.name }
);

export const filterLevels = (e, data) => (
  { type: data.checked ? ADD_LEVEL : FILTER_LEVEL, payload: data.name }
)