import React from "react";
import SideBarItem from "./SideBarItem";
import Search from "./search";

export default class SideBar extends React.Component {
  onNext = () => {
    this.props.onNext();
  };

  onPrev = () => {
    this.props.onPrev();
  };

  render() {
    const SideBarItems = this.props.events.map(event => (
      <SideBarItem
        key={event._id}
        onCloseClick={this.props.handleToggleOpen}
        onClick={this.props.showInfo}
        onMarkerClick={this.props.onMarkerClick}
        event={event}
        id={event._id}
        isOpen={this.props.isOpen}
        infoIndex={this.props.infoIndex}
      />
    ));

    const Loading = (
      <div class="container-fluid" style={{ minHeight: "100vh" }}>
        <div
          class="spinner-border"
          style={{
            width: "3rem",
            height: "3rem",
            position: "absolute",
            display: "block",
            top: "50%",
            left: "50%"
          }}
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );

    return (
      <div className="row light-bg" style={{ minHeight: "100vh" }}>
        <div className="col-md-12 mt-4 mb-3">
          <Search onButtonClick={this.props.onButtonClick} />
        </div>
        {this.props.isLoading ? (
          Loading
        ) : this.props.events.length == 0 ? null : (
          <div className="detail-options-wrap scrollable">{SideBarItems}</div>
        )}
        <div className="col-md-12 my-3">
          <nav>
            <ul className="pagination justify-content-center pagination-lg">
              <li
                className={
                  this.props.hasPrev ? "page-item" : "page-item disabled"
                }
                onClick={this.props.hasPrev ? this.onPrev : null}
              >
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              <li
                className={
                  this.props.hasNext ? "page-item" : "page-item disabled"
                }
                onClick={this.props.hasNext ? this.onNext : null}
              >
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
