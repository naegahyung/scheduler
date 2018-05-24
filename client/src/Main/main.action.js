import axios from 'axios';
import {
  FETCH_COURSES,
  MOVE_COURSE,
  FETCH_CRS,
  ADD_CRS,
  FILTER_CRS,
  ADD_LEVEL,
  FILTER_LEVEL,
  REFRESH_FILTER,
  RELOAD_DATA,
  SAVE_DATA,
} from './main.type';

export const getAllCourses = semester => async dispatch => {
  // semester follows the format SPR18 SSSYY
  const res = await axios.get(`/api/${semester}/courses`);
  dispatch({ type: FETCH_COURSES, payload: res.data });
};

export const rePosition = (origin, destination) => (
  { type: MOVE_COURSE, payload: { origin, destination }}
);

export const getAllCrs = semester => async dispatch => {
  const res = await axios.get(`/api/${semester}/crs`);
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

export const syncGoogleSheetData = (semester, spreadsheetId) => async dispatch => {
  const res = await axios.get(`/api/${semester}/${spreadsheetId}/syncData`);
  dispatch({ type: RELOAD_DATA, payload: res.data });
}

export const saveData = (semester, spreadsheetId, changes) => async dispatch => {
  const res = await axios.put(`/api/${semester}/${spreadsheetId}/saveData`, { changes });
  dispatch({ type: SAVE_DATA, payload: res.data });
}