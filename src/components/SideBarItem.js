import React from "react";

export default class SideBarItem extends React.Component {

    handleClick = () => {
        this.props.onClick(this.props.id);
      }

    render() {
        return (
            <div className="col-md-12 featured-responsive" onClick={this.handleClick} style={{cursor: "pointer"}}>
                <div className="featured-place-wrap">
                    <img src="images/featured1.jpg" className="img-fluid" alt="#" />
                    <div className="featured-title-box">
                        <h6>{this.props.event.title}</h6>
                        <ul>
                            <li><span className="icon-clock" />
                                <p>{this.props.event.date}, {this.props.event.time}</p>
                            </li>
                            <li><span className="icon-location-pin" />
                                <p>{this.props.event.location}</p>
                            </li>
                            <li><span className="icon-note" />
                                <p>{this.props.event.descript}</p>
                            </li>
                        </ul>
                        <div className="bottom-icons">
                            <span className="ti-heart" />
                            <span className="ti-bookmark" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}