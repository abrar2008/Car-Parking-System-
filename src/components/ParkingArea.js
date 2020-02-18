import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import EditParkingDialog from '../dialogs/EditParkingDialog';
import DeleteParkingDialog from '../dialogs/DeleteParkingDialog';
import BookParkingDialog from '../dialogs/BookParkingDialog';

export default class ParkingArea extends React.Component {

    constructor(props) {
        super(props);

        this.errorImage = this.errorImage.bind(this)
    }

    errorImage(e) {
        console.log(e.target.src)
        e.target.src = "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
    }

    render() {
        let books = new Array();
        this.props.books.map(book => {
            if(book.parking_area_id === this.props.id)
                books.push(book)
            return books;
        })

        return (
            <Card>
                <CardImg top width="100%" src={this.props.image} onError={this.errorImage} />
                <CardBody>
                    <CardTitle>{this.props.name}</CardTitle>
                    <CardSubtitle>
                        Hourly weekday rate : ${this.props.hourlyWeekdayRate}<br/>
                        Hourly weekend rate : ${this.props.hourlyWeekendRate}<br/>
                        Discount rate : {this.props.discountRate}%
                    </CardSubtitle>
                    <div className="card-button">
                        <EditParkingDialog buttonLabel="Edit" defaultData={this.props}/>
                        <DeleteParkingDialog  buttonLabel="Delete" id={this.props.id}/>
                        <BookParkingDialog  buttonLabel="Check Booking" books={books} />
                    </div>
                </CardBody>
            </Card>
        );
    }
}