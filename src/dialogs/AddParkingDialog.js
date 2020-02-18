import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Col } from 'reactstrap';
import {AvForm, AvField, AvGroup} from "availity-reactstrap-validation";

import { connect } from 'react-redux';
import * as actions from '../actions';

class AddParkingDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      parkingAreaName: "",
      hourlyWeekdayRate: 0,
      hourlyWeekendRate: 0,
      discountRate: 0,
      parkingAreaImage: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.changeName = this.changeName.bind(this);
    this.changeWeekdayRate = this.changeWeekdayRate.bind(this);
    this.changeWeekendRate = this.changeWeekendRate.bind(this);
    this.changeDiscountRate = this.changeDiscountRate.bind(this);
    this.changeImage = this.changeImage.bind(this);

    this.toggle = this.toggle.bind(this);
  }

  handleCancel() {
    this.setState({modal: !this.state.modal});
    this.setState({parkingAreaName: ""});
    this.setState({hourlyWeekdayRate: 0});
    this.setState({hourlyWeekendRate: 0});
    this.setState({parkingAreaImage: ""});
  }

  handleSubmit(errors, values) {
    this.setState({errors, values});

    if(values.length === 0)
    {
      this.props.Add([this.state.parkingAreaName, this.state.hourlyWeekdayRate, this.state.hourlyWeekendRate, this.state.discountRate, this.state.parkingAreaImage])
      this.setState({modal: !this.state.modal});
      this.setState({parkingAreaName: ""});
      this.setState({hourlyWeekdayRate: 0});
      this.setState({hourlyWeekendRate: 0});
      this.setState({parkingAreaImage: ""});      
    }
      
  }

  changeName(e) {
    this.setState({
      parkingAreaName: e.target.value
    });
  }

  changeWeekdayRate(e) {
    this.setState({hourlyWeekdayRate: e.target.value});
  }

  changeWeekendRate(e) {
    this.setState({hourlyWeekendRate: e.target.value});
  }

  changeDiscountRate(e) {
    this.setState({discountRate: e.target.value});
  }

  changeImage(e) {
    this.setState({parkingAreaImage: e.target.value});
  }

  toggle() {
    this.setState({modal: !this.state.modal});
  }

  render() {
    return (
      <span>
        <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="md">
          <ModalHeader toggle={this.toggle}>Creat a parking area</ModalHeader>
          <ModalBody>
            <AvForm onSubmit={this.handleSubmit}>
              <AvGroup row>
                <Col sm={4}>
                  <Label check for="parkingAreaName">Parking area name</Label>
                </Col>
                <Col sm={8}>
                  <AvField type="text" name="parkingAreaName" onChange={this.changeName} placeholder="Parking area name" required />
                </Col>
              </AvGroup>
              <AvGroup row>
                <Col sm={4}>
                  <Label check for="hourlyWeekdayRate">Hourly weekday rate</Label>
                </Col>
                <Col sm={8}>
                  <AvField type="number" name="hourlyWeekdayRate" onChange={this.changeWeekdayRate} placeholder="$0" required />
                </Col>
              </AvGroup>
              <AvGroup row>
                <Col sm={4}>
                  <Label check for="hourlyWeekendRate">Hourly weekend rate</Label>
                </Col>
                <Col sm={8}>
                  <AvField type="number" name="hourlyWeekendRate" onChange={this.changeWeekendRate} placeholder="$0" required />
                </Col>
              </AvGroup>
              <AvGroup row>
                <Col sm={4}>
                  <Label check for="discountRate">Discount rate</Label>
                </Col>
                <Col sm={8}>
                  <AvField type="number" name="discountRate" onChange={this.changeDiscountRate} placeholder="0%" min="0" max="100" required />
                </Col>
              </AvGroup>
              <AvGroup row>
                <Col sm={4}>
                  <Label check for="parkingAreaImage">Parking area image</Label>
                </Col>
                <Col sm={8}>
                  <AvField type="text" name="parkingAreaImage" onChange={this.changeImage} placeholder="Image url" />
                </Col>
              </AvGroup>
              <AvGroup style={{textAlign:"right"}}>
                <Button color="primary" style={{marginRight:"7px"}}>Add</Button>
                <Button color="secondary" onClick={this.handleCancel}>Cancel</Button>
              </AvGroup>
            </AvForm>
          </ModalBody>
          <ModalFooter></ModalFooter>
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
    Add: (value) => {dispatch(actions.addParkingArea(value))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddParkingDialog);