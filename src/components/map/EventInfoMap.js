import React from "react";
import { Marker, InfoWindow } from "react-google-maps";

export default class EventInfoMap extends React.Component {
  handleClick = index => {
    this.props.showInfo(index);
    this.props.onMarkerClick(index);
  };

  render() {
    const markers = this.props.events.map(event => (
      <Marker
        key={event._id}
        position={{ lat: event.lat, lng: event.lng }}
        onClick={() => this.handleClick(event._id)}
      >
        {this.props.infoIndex === event._id && this.props.isOpen && (
          <InfoWindow
            onCloseClick={this.props.handleToggleOpen}
            options={{ maxWidth: 400 }}
          >
            <div className="col-md-12">
              <div className="featured-place-wrap-non-hover">
                <div className="featured-title-box">
                  {event.events.map(singleEvent => (
                    <div className="mb-4">
                      <h6 className="custom">{singleEvent.title}</h6>
                      <div className="row">
                        <div className="col-1">
                          <span className="icon-clock custom" />
                        </div>
                        <div className="col">
                          <p className="custom">{singleEvent.time}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-1">
                          <span className="icon-location-pin custom" />
                        </div>
                        <div className="col">
                          <p className="custom">
                            <a href={singleEvent.address} target="_blank">
                              {singleEvent.location}
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-1">
                          <span className="icon-notebook custom" />
                        </div>
                        <div className="col">
                          <p className="custom">{singleEvent.descript}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </Marker>
    ));
    return <div>{markers}</div>;
  }
}
