import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Col, Label } from 'reactstrap';
import { AvField, AvGroup, AvForm } from 'availity-reactstrap-validation';
import moment from 'moment';

import { connect } from 'react-redux';
import * as actions from '../actions';

class PayParkingDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calculated: false,
      modal: false,
      start_date: "",
      start_time: '',
      end_date: '',
      end_time: '',
      parking_day: '',
      parking_id: '',
      pay_amount: 0,
      errors: {start_date:false, start_time:false, end_date:false, end_time:false}
    };

    this.toggle = this.toggle.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectParkingArea = this.handleSelectParkingArea.bind(this);

    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);

    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
  }

  toggle() {
    this.setState({modal: !this.state.modal});
    this.setState({calculated: false});
    this.setState({pay_amount: 0});
    this.setState({start_date: ""});
    this.setState({start_time: ""});
    this.setState({end_date: ""});
    this.setState({end_time: ""});
    this.setState(prevState => ({errors: {...prevState.errors, ["start_date"]: false}}))
    this.setState(prevState => ({errors: {...prevState.errors, ["start_time"]: false}}))
    this.setState(prevState => ({errors: {...prevState.errors, ["end_date"]: false}}))
    this.setState(prevState => ({errors: {...prevState.errors, ["end_time"]: false}}))
  }

  handleCancel() {
    this.setState({modal: !this.state.modal});
    this.setState(prevState => ({errors: {...prevState.errors, ["start_date"]: false}}))
    this.setState(prevState => ({errors: {...prevState.errors, ["start_time"]: false}}))
    this.setState(prevState => ({errors: {...prevState.errors, ["end_date"]: false}}))
    this.setState(prevState => ({errors: {...prevState.errors, ["end_time"]: false}}))
  }

  handleCalculate() {
    var startDateTime = moment(this.state.start_date + " " + this.state.start_time)
    var endDateTime = moment(this.state.end_date + " " + this.state.end_time)
    var time_diff = endDateTime.diff(startDateTime, "hours", true)

    if(this.state.start_date === "")
      this.setState(prevState => ({errors: {...prevState.errors, ["start_date"]: true}}))
    if(this.state.start_time === "")
      this.setState(prevState => ({errors: {...prevState.errors, ["start_time"]: true}}))
    if(this.state.end_date === "")
      this.setState(prevState => ({errors: {...prevState.errors, ["end_date"]: true}}))
    if(this.state.end_time === "")
      this.setState(prevState => ({errors: {...prevState.errors, ["end_time"]: true}}))

    if(time_diff <= 0)
      this.setState(prevState => ({errors: {...prevState.errors, ["start_date"]: true}}))
      this.setState(prevState => ({errors: {...prevState.errors, ["start_time"]: true}}))
      this.setState(prevState => ({errors: {...prevState.errors, ["end_date"]: true}}))
      this.setState(prevState => ({errors: {...prevState.errors, ["end_time"]: true}}))

    if(time_diff <= 0 || 
      this.state.start_date === "" || 
      this.state.start_time === "" || 
      this.state.end_date === "" || 
      this.state.end_time === ""
    )
      return;

    this.setState(prevState => ({errors: {...prevState.errors, ["start_date"]: false}}))
    this.setState(prevState => ({errors: {...prevState.errors, ["start_time"]: false}}))
    this.setState(prevState => ({errors: {...prevState.errors, ["end_date"]: false}}))
    this.setState(prevState => ({errors: {...prevState.errors, ["end_time"]: false}}))

    var weekday_rate, weekend_rate, pay_amount = 0, discount_rate;

    if(this.state.parking_id === "")
    {
      this.setState({parking_id: this.props.defaultData[0]['id']});
      weekday_rate = this.props.defaultData[0]['weekday_rate']
      weekend_rate = this.props.defaultData[0]['weekend_rate']
      discount_rate = this.props.defaultData[0]['discount_rate']
    } else {
      this.props.defaultData.map(parkingArea => {
        if(parkingArea.id === this.state.parking_id) {
          weekday_rate = parkingArea.weekday_rate
          weekend_rate = parkingArea.weekend_rate
          discount_rate = parkingArea.discount_rate
        }
        return '';
      });
    }

    if(this.state.end_date != this.state.start_date) {
      var startDayRestTime = moment(this.state.start_date + " 24:00").diff(moment(this.state.start_date + " " + this.state.start_time), 'hours')
      if(startDateTime.weekday() > 0 && startDateTime.weekday() < 6)
        pay_amount = startDayRestTime * weekday_rate //case weekday
      else
        pay_amount = startDayRestTime * weekend_rate //case weekend

      console.log("first = " + pay_amount)

      var day_diff = moment(this.state.end_date).diff(moment(this.state.start_date), 'days')
      var betweenRestDate = moment(this.state.start_date)
      for(var i=1; i < day_diff; i++) {
        betweenRestDate.add(1, 'day')
        if(betweenRestDate.weekday() > 0 && betweenRestDate.weekday() < 6)
          pay_amount += 24 * weekday_rate
        else
          pay_amount += 24 * weekend_rate
      }

      console.log("second = " + pay_amount)

      var endDayRestTime = moment(this.state.end_date + " " + this.state.end_time).diff(moment(this.state.end_date + " 00:00"), 'hours')
      if(endDateTime.weekday() > 0 && endDateTime.weekday() < 6)
        pay_amount += endDayRestTime * weekday_rate
      else
        pay_amount += endDayRestTime * weekend_rate

      console.log("third = " + pay_amount)
    } else {
      if(startDateTime.weekday() > 0 && startDateTime.weekday() < 6)
        pay_amount += time_diff * weekday_rate
      else
        pay_amount += time_diff * weekend_rate
    }
    pay_amount -= pay_amount * discount_rate / 100
    this.setState({pay_amount: pay_amount})

    if(this.state.parking_id !== "")
      this.setState({calculated: !this.state.calculated});
  }

  handleSubmit() {
    this.props.Pay([this.state.parking_id, this.state.start_date, this.state.start_time, this.state.end_date, this.state.end_time, this.state.pay_amount]);
    this.setState({modal: !this.state.modal});
    this.setState({calculated: false});
    this.setState({pay_amount: 0});
    this.setState({start_date: ""});
    this.setState({start_time: ""});
    this.setState({end_date: ""});
    this.setState({end_time: ""});

    if(this.state.start_date === "")
      this.setState(prevState => ({errors: {...prevState.errors, ["start_date"]: true}}))
    if(this.state.start_time === "")
      this.setState(prevState => ({errors: {...prevState.errors, ["start_time"]: true}}))
    if(this.state.end_date === "")
      this.setState(prevState => ({errors: {...prevState.errors, ["end_date"]: true}}))
    if(this.state.end_time === "")
      this.setState(prevState => ({errors: {...prevState.errors, ["end_time"]: true}}))
  }

  handleChangeStartDate(e) {
    this.setState({start_date: e.target.value});
    if(e.target.value !== "")
      this.setState(prevState => ({errors: {...prevState.errors, ["start_date"]: false}}))
    this.setState({pay_amount: 0});
    this.setState({calculated: false});
  }

  handleChangeStartTime(e) {
    this.setState({start_time: e.target.value});
    if(e.target.value !== "")
      this.setState(prevState => ({errors: {...prevState.errors, ["start_time"]: false}}))
    this.setState({pay_amount: 0});
    this.setState({calculated: false});
  }

  handleChangeEndDate(e) {
    this.setState({end_date: e.target.value});
    if(e.target.value !== "")
      this.setState(prevState => ({errors: {...prevState.errors, ["end_date"]: false}}))
    this.setState({pay_amount: 0});
    this.setState({calculated: false});
  }

  handleChangeEndTime(e) {
    this.setState({end_time: e.target.value});
    if(e.target.value !== "")
      this.setState(prevState => ({errors: {...prevState.errors, ["end_time"]: false}}))
    this.setState({pay_amount: 0});
    this.setState({calculated: false});
  }

  handleSelectParkingArea(e) {
    this.setState({parking_id : e.target.value});
    this.setState({pay_amount: 0});
    this.setState({calculated: false});
    this.setState({pay_amount: 0});
    this.setState({start_date: ""});
    this.setState({start_time: ""});
    this.setState({end_date: ""});
    this.setState({end_time: ""});
    this.setState(prevState => ({errors: {...prevState.errors, ["start_date"]: false}}))
    this.setState(prevState => ({errors: {...prevState.errors, ["start_time"]: false}}))
    this.setState(prevState => ({errors: {...prevState.errors, ["end_date"]: false}}))
    this.setState(prevState => ({errors: {...prevState.errors, ["end_time"]: false}}))
  }

  render() {
    return (
      <span>
        <Button color="success" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} className="col-sm-8">
          <ModalHeader toggle={this.toggle}>Pay</ModalHeader>
          <ModalBody>
          <AvForm onSubmit={this.handleSubmit}>
              <AvGroup row>
                <Col sm={3}>
                  <Label check for="parkingAreaName">Parking area name</Label>
                </Col>
                <Col sm={9}>
                  <AvField type="select" name="parkingAreaName" onChange={this.handleSelectParkingArea} placeholder="Parking area name">
                    {this.props.defaultData.map(parkingArea => {
                        return <option value={parkingArea.id} key={parkingArea.id}>{parkingArea.name}</option>
                    })}
                  </AvField>
                </Col>
              </AvGroup>
              <AvGroup row>
                <Col sm={3}>
                  {
                    this.state.errors.start_date || this.state.errors.start_time ? <Label className="text-danger" for="startTime">Star time</Label> : <Label for="startTime">Star time</Label>
                  }
                </Col>
                <Col sm={9}>
                  <div className="position-relative form-group">
                    {
                      this.state.errors.start_date ? <input type="date" className="form-control av-valid is-invalid col-sm-6" onChange={this.handleChangeStartDate} value={this.state.start_date} style={{float: "left", marginRight: "10px"}} required /> 
                      :
                      <input type="date" className="form-control av-valid col-sm-6" onChange={this.handleChangeStartDate} value={this.state.start_date} style={{float: "left", marginRight: "10px"}} required />
                    }
                    {
                      this.state.errors.start_time ? <input type="time" className="form-control av-valid is-invalid col-sm-5" onChange={this.handleChangeStartTime} value={this.state.start_time} required />
                      :
                      <input type="time" className="form-control av-valid col-sm-5" onChange={this.handleChangeStartTime} value={this.state.start_time} required />
                    }
                    {
                      this.state.errors.start_date || this.state.errors.start_time ? <div className="invalid-datetime">This field is invalid</div> : <div></div>
                    }
                  </div>
                </Col>
              </AvGroup>
              <AvGroup row>
                <Col sm={3}>
                  {
                    this.state.errors.end_date || this.state.errors.end_time ? <Label className="text-danger" for="endTime">End time</Label> : <Label for="endTime">End time</Label>
                  }
                </Col>
                <Col sm={9}>
                  {
                    this.state.errors.end_date ? <input type="date" className="form-control is-invalid col-sm-6" onChange={this.handleChangeEndDate} value={this.state.end_date} style={{float: "left", marginRight: "10px"}} /> 
                    :
                    <input type="date" className="form-control col-sm-6" onChange={this.handleChangeEndDate} value={this.state.end_date} style={{float: "left", marginRight: "10px"}} />
                  }
                  {
                    this.state.errors.end_time ? <input type="time" className="form-control is-invalid col-sm-5" onChange={this.handleChangeEndTime} value={this.state.end_time} /> 
                    :
                    <input type="time" className="form-control col-sm-5" onChange={this.handleChangeEndTime} value={this.state.end_time} />
                  }
                  {
                      this.state.errors.end_date || this.state.errors.end_time ? <div className="invalid-datetime">This field is invalid</div> : <div></div>
                  }
                </Col>
              </AvGroup>
              <AvGroup row>
                <Col sm={3}>
                  <Label check for="amountToPay">Pay amount</Label>
                </Col>
                <Col sm={9}>
                  <AvField type="text" name="amountToPay" value={this.state.pay_amount} placeholder="0" disabled />
                </Col>
              </AvGroup>
              <AvGroup style={{textAlign:"right"}}>
                {this.state.calculated? <Button color="primary" style={{marginRight:"7px"}}>Pay</Button> : ""}
                {!this.state.calculated? <Button color="success" onClick={this.handleCalculate} style={{marginRight:"7px"}}>Calculate</Button> : ""}
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
    Pay: (value) => {dispatch(actions.payParkingArea(value))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PayParkingDialog);