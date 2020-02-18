import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';

import { connect } from 'react-redux';
import * as actions from '../actions';

class BookParkingDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
    this.cancelBooking = this.cancelBooking.bind(this);
  }

  toggle() {this.setState({modal: !this.state.modal})}

  cancelBooking(e) {
    this.props.DeleteBook(e.target.id)
  }

  render() {
    return (
      <span>
        {this.props.books.length > 0 ? <Button outline color="warning" onClick={this.toggle}>{this.props.buttonLabel}</Button> : <Button disabled outline color="warning" onClick={this.toggle}>{this.props.buttonLabel}</Button>}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Book parking area</ModalHeader>
          <ModalBody>
            {
              this.props.books.map(book=>{
                return <Row key={book["id"]} style={{marginTop: "10px"}}> 
                        <Col style={{float: "left"}} sm={8}>
                          Booked this parking area from {book["start_date"]} {book["start_time"]} to {book["end_date"]} {book["end_time"]}.
                        </Col>
                        <Col sm={4}>
                          <Button color="danger" onClick={this.cancelBooking} id={book["id"]} style={{float: "right"}} size="sm">Cancel booking</Button>
                        </Col>
                      </Row>
              })
            }
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
    DeleteBook: (value) => {dispatch(actions.delBookList(value))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookParkingDialog);