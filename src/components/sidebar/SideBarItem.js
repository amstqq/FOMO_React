import React from "react";

export default class SideBarItem extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props.id);
    this.props.onMarkerClick(this.props.id);
  };

  handleCloseClick = () => {
    this.props.onCloseClick();
  };

  render() {
    const name = this.props.id.toString();
    return (
      <div
        className="col-md-12 featured-responsive"
        onClick={this.handleClick}
        style={{ cursor: "pointer" }}
        id={name}
      >
        <div
          className={
            this.props.infoIndex === this.props.id && this.props.isOpen
              ? "featured-place-wrap featured-place-wrap-active"
              : "featured-place-wrap"
          }
        >
          {/* <img src="images/featured1.jpg" className="img-fluid" alt="#" /> */}
          <div className="featured-title-box">
            <div className="my-3">
              <h6 className="custom">{this.props.event.title}</h6>
              <div className="row">
                <div className="col-1">
                  <span className="icon-clock custom" />
                </div>
                <div className="col">
                  <span>
                    <p className="custom">{this.props.event.time}</p>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-1">
                  <span className="icon-location-pin custom" />
                </div>
                <div className="col">
                  <span>
                    <p className="custom">{this.props.event.location}</p>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-1">
                  <span className="icon-notebook custom" />
                </div>
                <div className="col">
                  <span>
                    <p className="custom">{this.props.event.descript}</p>
                  </span>
                </div>
              </div>
            </div>
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
