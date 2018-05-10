const fiveMinutes = 2.5; // width of 5 minute interval
const oneHour = fiveMinutes * 12; // width of one hour interval
const row = oneHour * 14;
const height = 20;
const headerHeight = 40;
const leftPadding = (index) => ( index * 450 + 150 );
const totalMarginColumn = 100;
const colorScheme = {
  ARTD: '#FA9F99',
  ARTE: '#E0B34D',
  ARTF: '#B3C34D',
  ARTG: '#4DCF74',
  ARTH: '#4DD3BC',
  ARTS: '#4DCEEB',
  GAME: '#E69CFC',
  GSND: '#FF90D5'

}

export {
  fiveMinutes,
  oneHour,
  row,
  height,
  leftPadding,
  headerHeight,
  totalMarginColumn,
  colorScheme
};