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
      let filteredCrs = processFiltering(state.courses, action.payload, 'FILTER', state.excludedCrs, 'crs');
      return { ...state, filteredCourses: filteredCrs[0], excludedCrs: filteredCrs[1]};
    case ADD_CRS:
      let addedCrs = processFiltering(state.courses, action.payload, 'ADD', state.excludedCrs, 'crs');
      return { ...state, filteredCourses: addedCrs[0], excludedCrs: addedCrs[1]}; 
    case FILTER_LEVEL:
      let filteredLevel = processFiltering(state.courses, action.payload, 'FILTER', state.excludedLevel, 'grad');
      return { ...state, filteredCourses: filteredLevel[0], excludedLevel: filteredLevel[1]};
    case ADD_LEVEL:
      let addedLevel = processFiltering(state.courses, action.payload, 'ADD', state.excludedLevel, 'grad');
      return { ...state, filteredCourses: addedLevel[0], excludedLevel: addedLevel[1]};  
    default:
      return state;
  }
};

const processFiltering = (courses, payload, type, exclusion, key) => {
  const excluded = type === 'ADD' ? 
    exclusion.filter(e => e !== payload) : 
    exclusion.concat([ payload ]);
  
  const filteredCourses = filterCoursesBasedOnCond(courses, excluded, key);
  return [ filteredCourses, excluded ];
}

const filterCoursesBasedOnCond = (courses, excluded, key) => {
  const days = [ 'M', 'T', 'W', 'R', 'F' ];
  return courses.map(room => {
    let newSessions = {};
    days.forEach(d => {
      newSessions[d] = room.sessions[d].filter(e => {
        return !excluded.includes(e[key]);
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