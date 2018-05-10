import { 
  FETCH_COURSES,
  MOVE_COURSE 
} from './main.type';

const initialState = {
  courses: [],
  rooms: [],
  times: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COURSES:
      const rooms = action.payload.map(e => e._id);
      return { ...state, courses: action.payload, rooms };
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
      return { ...state, courses: copy };
    default:
      return state;
  }
};

const redefineTimeFrame = (start, duration) => {
  let endHour = Math.floor(duration / 60);
  let minute = (duration % 60) + parseInt(start.slice(2, 4), 10);
  endHour = endHour + Math.floor(minute / 60) + parseInt(start.slice(0, 2), 10);
  let endMinute = minute % 60;

  return `${start}-${String(endHour) + String(endMinute)}`;
};