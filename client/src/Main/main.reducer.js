import { 
  FETCH_COURSES,
  MOVE_COURSE,
  FETCH_CRS,
  FILTER_CRS,
  ADD_CRS,
  FILTER_LEVEL,
  ADD_LEVEL, 
} from './main.type';

const initialState = {
  courses: [],
  filteredCourses: [],
  rooms: [],
  crs: [],
  excludedCrs: [],
  excludedLevel: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COURSES:
      const rooms = action.payload.map(e => e._id);
      return { ...state, courses: action.payload, rooms, filteredCourses: action.payload };
      /*
    case MOVE_COURSE:
      const copy = JSON.parse(JSON.stringify(state.courses));
      let { id, start, destination, sourceDay, oldRoomIndex, newRoomIndex } = action.payload;
      const rowToBeFixed = copy[oldRoomIndex];
      let index = 0;
      let target = rowToBeFixed.sessions[sourceDay].find((c, i) => {
        index = i;
        return c._id === id
      });

      let time = redefineTimeFrame(start, target.duration);
      target.start = start;
      target.time = time;

      copy[oldRoomIndex].sessions[sourceDay].splice(index, 1);
      copy[newRoomIndex].sessions[destination].push(target);
      return { ...state, courses: copy };*/
    case FETCH_CRS:
      return { ...state, crs: action.payload };
    case FILTER_CRS:
      let filteredCrs = processFiltering(state, action.payload, 'FILTER', 'crs');
      return { ...state, filteredCourses: filteredCrs[0], excludedCrs: filteredCrs[1]};
    case ADD_CRS:
      let addedCrs = processFiltering(state, action.payload, 'ADD', 'crs');
      return { ...state, filteredCourses: addedCrs[0], excludedCrs: addedCrs[1]}; 
    case FILTER_LEVEL:
      let filteredLevel = processFiltering(state, action.payload, 'FILTER', 'grad');
      return { ...state, filteredCourses: filteredLevel[0], excludedLevel: filteredLevel[1]};
    case ADD_LEVEL:
      let addedLevel = processFiltering(state, action.payload, 'ADD', 'grad');
      return { ...state, filteredCourses: addedLevel[0], excludedLevel: addedLevel[1]};  
    default:
      return state;
  }
};

const processFiltering = ({ courses, excludedCrs, excludedLevel }, payload, type, key) => {
  
  let exCrs = excludedCrs.slice();
  let exLv = excludedLevel.slice();
  if (key === 'crs') {
    exCrs = type === 'ADD' ? 
      excludedCrs.filter(e => e !== payload) : 
      excludedCrs.concat([ payload ]) 
  } else {
    exLv = type === 'ADD' ?
      excludedLevel.filter(e => e !== payload) :
      excludedLevel.concat([ payload ]);
  }
  
  const filteredCourses = filterCoursesBasedOnCond(courses, exCrs, exLv);
  return [ filteredCourses, key === 'crs' ? exCrs : exLv ];
}

const filterCoursesBasedOnCond = (courses, excludedCrs, excludedLevel) => {
  const days = [ 'M', 'T', 'W', 'R', 'F' ];
  return courses.map(room => {
    let newSessions = {};
    days.forEach(d => {
      newSessions[d] = room.sessions[d].filter(e => {
        return !excludedCrs.includes(e.crs) && !excludedLevel.includes(e.grad);
      });
    })
    return { ...room, sessions: newSessions };
  });
}



// end time is not correct. Fix it.
const redefineTimeFrame = (start, duration) => {
  let endHour = Math.floor(duration / 60);
  let minute = (duration % 60) + parseInt(start.slice(2, 4), 10);
  endHour = endHour + Math.floor(minute / 60) + parseInt(start.slice(0, 2), 10);
  let endMinute = minute % 60;

  return `${start}-${String(endHour) + String(endMinute)}`;
};