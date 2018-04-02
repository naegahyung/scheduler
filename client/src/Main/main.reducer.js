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
      return { ...state, courses: action.payload };
    case MOVE_COURSE:
      const copy = JSON.parse(JSON.stringify(state.courses));
      let { id, start, day, oldRoomIndex, newRoomIndex } = action.payload;
      console.log(oldRoomIndex, newRoomIndex);
      const rowToBeFixed = copy[oldRoomIndex];
      
      let index = 0;
      let target = rowToBeFixed.sessions[day].find((c, i) => {
        index = i;
        return c._id === id
      });

      let time = redefineTimeFrame(start, target.duration);
      target.start = start;
      target.time = time;

      copy[oldRoomIndex].sessions[day].splice(index, 1);
      copy[newRoomIndex].sessions[day].push(target);
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