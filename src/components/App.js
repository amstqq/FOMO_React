import React from 'react';
import axios from "axios";

import SideBar from "./SideBar";
import MapContainer from './MapContainer';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
      isLoading: true,
      isOpen: false,
      infoIndex: null,
      mapCenter: { lat: 34.022453, lng: -118.285067 }
    };
  }

  componentDidMount() {
    axios.get("/api/test")
      .then(result => this.setState({
        events: result.data,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  handleToggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  showInfo = (index) => {
    this.setState({
      isOpen: this.state.infoIndex !== index || !this.state.isOpen,
      infoIndex: index,
    });
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <div class="container-fluid" style={{ minHeight: "100vh" }}>
          <div class="spinner-border"
            style={{
              width: "3rem",
              height: "3rem",
              position: "absolute",
              display: "block",
              top: "50%",
              left: "50%"
            }}
            role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 responsive-wrap" >
            <div className="row detail-filter-wrap">
              <div className="col-md-4 featured-responsive">
                <div className="detail-filter-text">
                  <p>34 Results For <span>Events</span></p>
                </div>
              </div>
              <div className="col-md-8 featured-responsive">
                <div className="detail-filter">
                  <p>Filter by</p>
                  <form className="filter-dropdown">
                    <select
                      className="custom-select mr-2 mr-sm-2 mb-2 mb-sm-1 mt-sm-1"
                      id="inlineFormCustomSelect"
                    >
                      <option selected>Best Match</option>
                      <option value={1}>One</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                    </select>
                  </form>
                  <form className="filter-dropdown">
                    <select
                      className="custom-select mb-2 mr-sm-2 mb-sm-0"
                      id="inlineFormCustomSelect1"
                    >
                      <option selected>Popularity</option>
                      <option value={1}>One</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                    </select>
                  </form>
                  <div className="map-responsive-wrap">
                    <a className="map-icon" href="#"><span className="icon-location-pin" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row detail-checkbox-wrap">
              <div className="col-sm-12 col-md-6">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customCheck1" />
                  <label class="custom-control-label" for="customCheck1">Dornsife</label>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customCheck2" />
                  <label class="custom-control-label" for="customCheck2">Viterbi</label>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customCheck3" />
                  <label class="custom-control-label" for="customCheck3">Marshall</label>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customCheck4" />
                  <label class="custom-control-label" for="customCheck4">Annenberg</label>
                </div>
              </div>
            </div>
            <SideBar
              events={this.state.events}
              showInfo={this.showInfo}
            />
          </div>
          <div className="col-md-8 responsive-wrap map-wrap">
            <div className="map-fix">
              <div id="map">
                <MapContainer
                  events={this.state.events}
                  handleToggleOpen={this.handleToggleOpen}
                  showInfo={this.showInfo}
                  isOpen={this.state.isOpen}
                  infoIndex={this.state.infoIndex}
                  mapCenter={this.state.mapCenter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default App;
