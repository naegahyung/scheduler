import {
  fiveMinutes,
  oneHour,
  row,
  height,
  headerHeight,
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
  // each row contains hours from 8 am to 10 pm.
  box: (index, duration) => ({
    width: duration,
    border: `0.1px solid #DDDDDD`,
    height,
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
    position: 'absolute', 
    fontWeight: 'bold', 
    color: 'black', 
    paddingTop: '2px',
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
    left: `${i === 0 ? 0 : (row + 50) * i}px`,
    fontSize: '20px',
    display: 'inline-block',
  }),
  specificBox: (index, duration, color) => ({
    width: duration,
    border: `0.5px solid #${color}`,
    height,
    position: 'absolute',
    left: `${index * fiveMinutes}px`,
  }),
  classNamesBox: {
    position: 'absolute', 
    width: '150px', 
    backgroundColor: '#FDFDFD', 
    height: '100%', 
    zIndex: 10,
  }
};

export default style;
