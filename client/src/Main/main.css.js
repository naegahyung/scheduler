const fiveMinutes = 7; // width of 5 minute interval
const oneHour = fiveMinutes * 12; // width of one hour interval
const row = oneHour * 14;
const height = 50;

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
    width: fiveMinutes,
    border: '1px solid #AAAAAA',
    height,
    position: 'absolute',
    opacity: '0.5',
    left: `${index * fiveMinutes}px`,
  }),
  row: {
    border: '1px solid black',
    height,
    width: row
  },
  roomName: {
    position: 'absolute', 
    zIndex: '99', 
    fontWeight: 'bold', 
    color: '#0074D9', 
    paddingTop: '12px',
    letterSpacing: '5px'
  }
};

export default style;
