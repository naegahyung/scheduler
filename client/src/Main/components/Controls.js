import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Dropdown, Menu, Modal } from 'semantic-ui-react';

import { 
  syncGoogleSheetData,
  applyFilter,
  saveData
} from '../main.action';

class Controls extends Component {

  state = { 
    modalOpen: false, 
    syncLoading: false, 
    saveLoading: false,
    currentSemester: 'SPR18',
  };

  options = [
    { text: 'Spring 18', value: 'SPR18', }
  ]

  handleOpen = () => {
    if (Object.keys(this.props.changes).length > 0) {
      this.setState({ modalOpen: true });
    } else {
      this.syncData();
    }
  }

  handleClose = () => this.setState({ modalOpen: false });

  syncData = async () => {
    this.setState({ modalOpen: false });
    const spreadsheetId = '13Ohdf_1vyZJeI-YIRMY7XZWqYhdVEkMNS4Xh29YjMvU'; 
    this.setState({ syncLoading: true });
    await this.props.syncGoogleSheetData(this.state.currentSemester, spreadsheetId);
    this.props.applyFilter();
    this.setState({ syncLoading: false });
  }

  saveData = async () => {
    this.setState({ saveLoading: true });
    const spreadsheetId = '13Ohdf_1vyZJeI-YIRMY7XZWqYhdVEkMNS4Xh29YjMvU'; 
    await this.props.saveData(this.state.currentSemester, spreadsheetId, this.props.changes);
    this.props.applyFilter();
    this.setState({ saveLoading: false });
  }

  render() {
    return (
      <Menu style={this.props.menuStyle} >
        <Menu.Menu>
          <Dropdown 
            options={this.options}
            selection
          />
        </Menu.Menu>
        <Menu.Item>
          <Modal 
            trigger={
              <Button 
                icon
                onClick={this.handleOpen}
                loading={this.state.syncLoading}
              >
                <Icon 
                  name='refresh' 
                  size='large'
                />
              </Button>
            } 
            basic
            open={this.state.modalOpen}
            onClose={this.handleClose}
          >
            <Modal.Content>
              <h3>All of the changes will not saved. Would you still like to reload data?</h3>
            </Modal.Content>
            <Modal.Actions>
              <Button basic color='red' inverted onClick={this.handleClose}>
                <Icon name='remove' /> No
              </Button>
              <Button color='green' inverted onClick={this.syncData}>
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </Menu.Item>
        <Menu.Item>
          <Button 
            icon
            onClick={this.saveData}
            loading={this.state.saveLoading}
          >
            <Icon 
              name='save' 
              size='large'
            />
          </Button>
        </Menu.Item>
      </Menu>
    );
  }
}

export default connect(null, { 
  syncGoogleSheetData, applyFilter, saveData 
})(Controls);