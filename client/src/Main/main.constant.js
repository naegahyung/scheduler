const fiveMinutes = 2.5; // width of 5 minute interval
const oneHour = fiveMinutes * 12; // width of one hour interval
const row = oneHour * 14;
const height = 20;
const headerHeight = 40;
const leftPadding = (index) => ( index * 450 + 150 );

export {
  fiveMinutes,
  oneHour,
  row,
  height,
  leftPadding,
  headerHeight,
};