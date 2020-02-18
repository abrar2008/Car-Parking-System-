import React, {Component} from 'react';
import {Container, Col, Row, Button, Jumbotron} from 'reactstrap';
import ParkingArea from './ParkingArea';
import AddParkingDialog from '../dialogs/AddParkingDialog';
import PayParkingDialog from '../dialogs/PayParkingDialog';

import { connect } from 'react-redux';
import * as actions from '../actions';

class ParkingAreaList extends Component {
    componentWillMount() {
        this.props.getParkingArea();
        this.props.getBookList();
    }

    render() {
        const {parkingAreaList, paymentList} =  this.props;

        return (
            <div>
                <Jumbotron fluid className="align-items-center">
                    <Container fluid className="header">
                        <h1 className="display-3">Parking area management</h1>
                        <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                        <p className="lead">
                            <AddParkingDialog buttonLabel="Create"/>
                            <Button color="warning" style={{margin: "15px"}} href="#parking_area_list">View</Button>
                            <PayParkingDialog buttonLabel="Pay" defaultData={parkingAreaList} />
                        </p>
                    </Container>
                </Jumbotron>
                <Container className="align-items-center">
                    <Row>
                        <div className="col-12" id="parking_area_list">
                            <div className="layout-title">
                                <h2>Parking areas</h2>
                            </div>
                        </div>
                    </Row>
                    <Row sm={12}>
                        {
                        (parkingAreaList != null && parkingAreaList.length !== 0) ?
                            parkingAreaList.map((parkingArea) => {
                                    return <Col key={parkingArea['id']} sm={4}>
                                            <ParkingArea 
                                                name={parkingArea['name']}
                                                hourlyWeekdayRate={parkingArea['weekday_rate']}
                                                hourlyWeekendRate={parkingArea['weekend_rate']}
                                                discountRate={parkingArea['discount_rate']}
                                                image={parkingArea['image']}
                                                id={parkingArea['id']}
                                                books={paymentList}
                                            />
                                        </Col>
                            })
                            :
                            <Col><div className="text-center">There is no parking area.</div></Col>
                        }
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        <div className="footer">
                            <h3>
                                Copyright ©<script>document.write(new Date().getFullYear());</script>2018 All rights reserved | This site is developed <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="#" target="_blank">Olga</a>
                            </h3>
                        </div>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
      parkingAreaList: state.parking_area.parkingAreaList,
      paymentList: state.parking_area.paymentList,
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      getParkingArea: (value) => {dispatch(actions.getParkingArea(value))},
      getBookList: (value) => {dispatch(actions.getBookList(value))},
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ParkingAreaList);

// export default ParkingAreaList;