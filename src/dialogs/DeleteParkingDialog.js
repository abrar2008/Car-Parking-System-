import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { connect } from 'react-redux';
import * as actions from '../actions';

class DeleteParkingDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      id: this.props.id,
    };

    this.toggle = this.toggle.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggle() {
    this.setState({modal: !this.state.modal});
  }

  handleCancel() {
    this.setState({modal: !this.state.modal});
  }

  handleDelete() {
    this.props.Delete([this.state.id])
    this.setState({modal: !this.state.modal});
  }

  render() {
    return (
      <span>
        <Button outline color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Delete parking area</ModalHeader>
          <ModalBody>
            Are you sure to want to delete this parking area?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleDelete}>Yes</Button>{' '}
            <Button color="secondary" onClick={this.handleCancel}>No</Button>
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    parkingAreaList: state.parking_area.ParkingAreaList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Delete: (value) => {dispatch(actions.delParkingArea(value))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteParkingDialog);