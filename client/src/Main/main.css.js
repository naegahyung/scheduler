import {
  fiveMinutes,
  oneHour,
  row,
  height,
  headerHeight,
  totalMarginColumn,
  leftPadding
} from './main.constant';

const style = {
  interval5Min: (index, duration) => ({
    width: `${fiveMinutes * duration / 5 }px`,
    position: 'absolute',
    left: `${index / 5 * fiveMinutes}px`,
    height: height - 6,
    backgroundColor: 'red',
    borderRadius: '5px',
    marginTop: '3px',
    marginBottom: '3px',
  }),
  boxWrapper: (index) => ({
    position: 'relative',
    left: `${row * index + 150 + totalMarginColumn * index}px`, 
  }),
  // each row contains hours from 8 am to 10 pm.
  box: (index, duration, numOfRooms) => ({
    width: duration,
    border: `0.1px solid #DDDDDD`,
    height: height * numOfRooms,
    position: 'absolute',
    opacity: '0.5',
    left: `${index * fiveMinutes}px`,
  }),
  row: {
    border: '1px solid black',
    height,
    width: row,
    fontSize: '12px',
  },
  roomName: (index) => ({
    textAlign: 'right', 
    fontWeight: 'bold',
    color: 'black', 
    height,
    paddingRight: '4px',
    top: `${index * height}px`,
  }),
  header: {
    height: headerHeight,
    position: 'relative',
    marginLeft: '150px',
  },
  headerChildren: (i) => ({
    position: 'absolute',
    fontWeight: 'bold',
    top: '10px',
    left: `${i === 0 ? 0 : (row + totalMarginColumn) * i}px`,
    fontSize: '20px',
    display: 'inline-block',
  }),
  specificBox: (index, duration, color, numOfRooms) => ({
    width: duration,
    border: `2px solid #${color}`,
    height: height * numOfRooms,
    position: 'absolute',
    left: `${index * fiveMinutes}px`,
  }),
  classNamesBox: (num) => ({
    position: 'absolute', 
    width: '150px', 
    backgroundColor: '#FDFDFD', 
    height: height * num, 
    zIndex: 10,
  }),
  leftMenuStyle: {
    padding: '20px',
    fontSize: '15px',
  }
};

export default style;
