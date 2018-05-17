export const fiveMinutes = 2.5; // width of 5 minute interval
export const borderRadius = 0.5;
export const true5MinWidth = fiveMinutes + borderRadius;
export const oneHour = true5MinWidth * 12; // width of one hour interval
export const row = oneHour * 14;
export const height = 20;
export const headerHeight = 40;
export const leftPadding = (index) => ( index * 450 + 150 + fiveMinutes );
export const totalMarginColumn = 102;
export const columnPadding = row + totalMarginColumn;
export const colorScheme = [
  "#dac1ff", "#d84e57", "#cc7547", "#375f96", 
  "#c6622b", "#3bccc7", "#f9ad20", "#687fcc", 
  "#f7186e", "#ea9a9d", "#bf017c", "#c147e0", 
  "#e81022", "#ce6d23", "#ea3120", "#0cf2e6", 
  "#23d367", "#75f963", "#6fe87b", "#f9b3f8", 
  "#ed331e", "#6bf2f4", "#627cdb", "#fcf092", 
  "#f72ace", "#85ba2a", "#10ce23", "#a8ffa0", 
  "#56ff56", "#ff9ebe"
];