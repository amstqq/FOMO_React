import React from "react";
import { white } from "ansi-colors";

export default class SideBarItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    handleClick = () => {
        this.props.onClick(this.props.id);
    }

    handleCloseClick = () => {
        this.props.onCloseClick();
    }

    render() {
        if (this.props.infoIndex === this.props.id && this.props.isOpen) {
            return (
                <div className="col-md-12 featured-responsive" onClick={this.handleCloseClick} style={{ cursor: "pointer" }}>
                    <div className="featured-place-wrap featured-place-wrap-active">
                        <img src="images/featured1.jpg" className="img-fluid" alt="#" />
                        <div className="featured-title-box">
                            <h6 className="custom">{this.props.event.title}</h6>
                            <ul>
                                <li><span className="icon-clock custom" />
                                    <p className="custom">{this.props.event.date}, {this.props.event.time}</p>
                                </li>
                                <li><span className="icon-location-pin custom" />
                                    <p className="custom">{this.props.event.location}</p>
                                </li>
                                <li><span className="icon-note custom" />
                                    <p className="custom">{this.props.event.descript}</p>
                                </li>
                            </ul>
                            <div className="bottom-icons">
                                <span className="ti-heart custom" />
                                <span className="ti-bookmark custom" />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="col-md-12 featured-responsive" onClick={this.handleClick} style={{ cursor: "pointer" }}>
                <div className="featured-place-wrap">
                    <img src="images/featured1.jpg" className="img-fluid" alt="#" />
                    <div className="featured-title-box">
                        <h6 className="custom">{this.props.event.title}</h6>
                        <ul>
                            <li><span className="icon-clock custom" />
                                <p className="custom">{this.props.event.date}, {this.props.event.time}</p>
                            </li>
                            <li><span className="icon-location-pin custom" />
                                <p className="custom">{this.props.event.location}</p>
                            </li>
                            <li><span className="icon-note custom" />
                                <p className="custom">{this.props.event.descript}</p>
                            </li>
                        </ul>
                        <div className="bottom-icons">
                            <span className="ti-heart custom" />
                            <span className="ti-bookmark custom" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}