import {
  fiveMinutes,
  row,
  height,
  headerHeight,
  totalMarginColumn,
  leftPadding,
  true5MinWidth,
  borderRadius,
} from './main.constant';

const style = {
  interval5Min: (index, duration, backgroundColor) => ({
    width: `${true5MinWidth * duration / 5 }px`,
    position: 'absolute',
    left: `${index / 5 * true5MinWidth}px`,
    height: height - 6,
    backgroundColor,
    borderRadius: '5px',
    marginTop: '2px',
    marginBottom: '2px',
    cursor: 'move',
  }),
  boxWrapper: (index) => ({
    position: 'relative',
    left: `${row * index + leftPadding(0) + totalMarginColumn * index}px`, 
  }),
  // each row contains hours from 8 am to 10 pm.
  box: (index, numOfRooms) => ({
    width: fiveMinutes,
    borderLeft: `0.5px solid ${index % 12 === 0? '#111111' : '#DDDDDD'}`,
    height: height * numOfRooms,
    position: 'absolute',
    opacity: '0.5',
    left: `${index * true5MinWidth - borderRadius}px`,
  }),
  row: {
    border: '1px solid black',
    borderRight: 'hidden',
    borderLeft: 'hidden',
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
    marginLeft: `${150 + true5MinWidth}px`,
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
    left: `${index * true5MinWidth}px`,
  }),
  classNamesBox: (num) => ({
    position: 'absolute', 
    width: `150px`, 
    backgroundColor: '#FDFDFD', 
    height: height * num, 
    zIndex: 10,
    top: headerHeight
  }),
  leftMenuStyle: {
    padding: '20px',
    fontSize: '15px',
  },
  crsColorBox: backgroundColor => ({
    width: '30px',
    height: '20px',
    display: 'inline-block',
    backgroundColor,
  }),
  menusBackground: {
    position: 'absolute', 
    right: '0px', 
    zIndex: '10', 
    height: '20px',
  },
};

export default style;
