import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Col, Label } from 'reactstrap';
import {AvForm, AvField, AvGroup} from "availity-reactstrap-validation";

import { connect } from 'react-redux';
import * as actions from '../actions';

class EditParkingDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      id: this.props.defaultData.id,
      name: this.props.defaultData.name,
      weekday_rate: this.props.defaultData.hourlyWeekdayRate,
      weekend_rate: this.props.defaultData.hourlyWeekendRate,
      discount_rate: this.props.defaultData.discountRate,
      image: this.props.defaultData.image,
    };

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.changeName = this.changeName.bind(this);
    this.changeWeekdayRate = this.changeWeekdayRate.bind(this);
    this.changeWeekendRate = this.changeWeekendRate.bind(this);
    this.changeDiscountRate = this.changeDiscountRate.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  toggle() {
    this.setState({modal: !this.state.modal});
  }

  handleCancel() {
    this.setState({modal: !this.state.modal});
  }

  handleSubmit(errors, values) {
    this.setState({errors, values});

    if(values.length === 0)
    {
      this.props.Edit([this.state.name, this.state.weekday_rate, this.state.weekend_rate, this.state.discount_rate, this.state.image, this.state.id])
      this.setState({modal: !this.state.modal});
    }
      
  }

  changeName(e) {
    this.setState({name: e.target.value});
  }

  changeWeekdayRate(e) {
    this.setState({weekday_rate: e.target.value});
  }

  changeWeekendRate(e) {
    this.setState({weekend_rate: e.target.value});
  }

  changeDiscountRate(e) {
    this.setState({discount_rate: e.target.value});
  }

  changeImage(e) {
    this.setState({image: e.target.value});
  }

  render() {
    return (
      <span>
        <Button outline color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit parking area</ModalHeader>
          <ModalBody>
          <AvForm onSubmit={this.handleSubmit}>
              <AvGroup row>
                <Col sm={4}>
                  <Label check for="parkingAreaName">Parking area name</Label>
                </Col>
                <Col sm={8}>
                  <AvField type="text" name="parkingAreaName" onChange={this.changeName} value={this.props.defaultData.name} required />
                </Col>
              </AvGroup>
              <AvGroup row>
                <Col sm={4}>
                  <Label check for="hourlyWeekdayRate">Hourly weekday rate</Label>
                </Col>
                <Col sm={8}>
                  <AvField type="number" name="hourlyWeekdayRate" onChange={this.changeWeekdayRate} value={this.props.defaultData.hourlyWeekdayRate} required />
                </Col>
              </AvGroup>
              <AvGroup row>
                <Col sm={4}>
                  <Label check for="hourlyWeekendRate">Hourly weekend rate</Label>
                </Col>
                <Col sm={8}>
                  <AvField type="number" name="hourlyWeekendRate" onChange={this.changeWeekendRate} value={this.props.defaultData.hourlyWeekendRate} required />
                </Col>
              </AvGroup>
              <AvGroup row>
                <Col sm={4}>
                  <Label check for="discountRate">Discount rate</Label>
                </Col>
                <Col sm={8}>
                  <AvField type="number" name="discountRate" onChange={this.changeDiscountRate} value={this.props.defaultData.discountRate} min="0" max="100" required />
                </Col>
              </AvGroup>
              <AvGroup row>
                <Col sm={4}>
                  <Label check for="parkingAreaImage">Parking area image</Label>
                </Col>
                <Col sm={8}>
                  <AvField type="text" name="parkingAreaImage" onChange={this.changeImage} value={this.props.defaultData.image} />
                </Col>
              </AvGroup>
              <AvGroup style={{textAlign:"right"}}>
                <Button color="primary" style={{marginRight:"7px"}}>Edit</Button>
                <Button color="secondary" onClick={this.handleCancel}>Cancel</Button>
              </AvGroup>
            </AvForm>
          </ModalBody>
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
    Edit: (value) => {dispatch(actions.editParkingArea(value))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditParkingDialog);