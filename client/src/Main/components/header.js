import React from 'react';

const Header = ({ times }) => (
  <div className='columns' style={styles.fixedTop}>
    <div className='column'>room</div>{
      times.map(room => (
        <div className='column'>{room}</div>
      ))}
  </div>
)

const styles = {
  fixedTop: {
    'position': 'fixed',
    'top': 0,
    'left': 0,
    'width': '100%',
    'zIndex': 999,
    'backgroundColor': 'white',
    'textAlign': 'center',
  } 
}

export default Header;