import { 
  FETCH_COURSES,
  MOVE_COURSE,
  FETCH_CRS,
  FILTER_CRS,
  ADD_CRS,
  FILTER_LEVEL,
  ADD_LEVEL, 
  REFRESH_FILTER,
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
    case MOVE_COURSE:
      const { origin, destination } = action.payload;
      let copiedCourses = JSON.parse(JSON.stringify(state.filteredCourses));
      // delete course from source array
      let srcArry = copiedCourses[origin.room].sessions[origin.day];
      let target; // the target course being moved
      srcArry = srcArry.filter(e => {
        let condition = e._id !== origin.id;
        if (!condition) {
          target = e;
        }
        return condition;
      });
      copiedCourses[origin.room][origin.day] = srcArry.length !== 0;
      copiedCourses[origin.room].sessions[origin.day] = srcArry;
      // modify information about the target
      let newTime = redefineTimeFrame(destination.minuteOffset/3 * 5, target.duration);
      target.time = newTime;
      target.start = newTime.substring(0, 4);
      target.end = newTime.substring(5, 9);
      target.day = target.day.replace(origin.day, destination.day);
      target.room = copiedCourses[destination.roomIndex]._id;

      // append the course into destination array
      copiedCourses[destination.roomIndex].sessions[destination.day].push(target);
      copiedCourses[destination.roomIndex][destination.day] = true;
      //let f = filterCoursesBasedOnCond(copiedCourses, state.excludedCrs, state.excludedLevel);
      return { ...state, courses: copiedCourses }; //filteredCourses: f };
    case REFRESH_FILTER:
      let originalData = JSON.parse(JSON.stringify(state.courses));
      let f = filterCoursesBasedOnCond(originalData, state.excludedCrs, state.excludedLevel);
      return { ...state, filteredCourses: f };
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

const redefineTimeFrame = (offset, duration) => {
  let startMin = offset % 60;
  let startHr = 8 + Math.floor(offset / 60);

  let addedMin = duration + startMin;
  let endMin = addedMin % 60;
  let ovf = Math.floor(addedMin / 60);
  let endHr = startHr + ovf;
  return `${formatToString(startHr)}${formatToString(startMin)}-${formatToString(endHr)}${formatToString(endMin)}`; 
};

const formatToString = num => (
  num < 10 ? '0' + String(num) : String(num)
);
