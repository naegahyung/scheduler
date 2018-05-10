const fiveMinutes = 2.5; // width of 5 minute interval
const borderRadius = 0.5;
const true5MinWidth = fiveMinutes + borderRadius;
const oneHour = true5MinWidth * 12; // width of one hour interval
const row = oneHour * 14;
const height = 20;
const headerHeight = 40;
const leftPadding = (index) => ( index * 450 + 150 );
const totalMarginColumn = 100;
const colorScheme = [
  "#dac1ff", "#d84e57", "#cc7547", "#375f96", 
  "#c6622b", "#3bccc7", "#f9ad20", "#687fcc", 
  "#f7186e", "#ea9a9d", "#bf017c", "#c147e0", 
  "#e81022", "#ce6d23", "#ea3120", "#0cf2e6", 
  "#23d367", "#75f963", "#6fe87b", "#f9b3f8", 
  "#ed331e", "#6bf2f4", "#627cdb", "#fcf092", 
  "#f72ace", "#85ba2a", "#10ce23", "#a8ffa0", 
  "#56ff56", "#ff9ebe"
];

export {
  fiveMinutes,
  oneHour,
  row,
  height,
  leftPadding,
  headerHeight,
  totalMarginColumn,
  colorScheme,
  true5MinWidth,
  borderRadius
};