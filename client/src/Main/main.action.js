import axios from 'axios';
import {
  FETCH_COURSES,
  MOVE_COURSE,
  FETCH_CRS,
  ADD_CRS,
  FILTER_CRS,
  ADD_LEVEL,
  FILTER_LEVEL,
  REFRESH_FILTER
} from './main.type';

export const getAllCourses = semester => async dispatch => {
  // semester follows the format SPR18 SSSYY
  const res = await axios.get(`/api/courses/${semester}`);
  dispatch({ type: FETCH_COURSES, payload: res.data });
};

export const rePosition = (origin, destination) => (
  { type: MOVE_COURSE, payload: { origin, destination }}
);

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

export const applyFilter = () => (
  { type: REFRESH_FILTER }
)