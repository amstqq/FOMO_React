import React from "react";
import axios from "axios";

import SideBar from "./sidebar/SideBar";
import MapContainer from "./map/MapContainer";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialLoad: true,
      events: null,
      isLoading: false,
      isOpen: false,
      infoIndex: null,
      mapCenter: { lat: 33.64608, lng: -117.842626 },
      currPage: 0,
      hasPrev: false,
      hasNext: true,
      apiUrl: "/api/dev/",
      query: ""
    };

    // retrieve first 3 posts info from database
    axios.get(`/api/dev/1`).then(res => {
      if (res.data.error) {
        this.setState({
          initialLoad: false
        });
        console.error(res.data.message);
      } else {
        this.setState({
          currPage: this.state.currPage + 1,
          events: res.data.message,
          isOpen: false,
          infoIndex: null
        });
        axios.get(`/api/dev/${this.state.currPage + 1}`).then(res => {
          if (res.data.error) {
            console.log(error);
          } else if (res.data.message.length != 0) {
            this.setState({
              hasNext: true
            });
          } else {
            this.setState({
              hasNext: false
            });
          }
          this.setState({
            initialLoad: false
          });
        });
      }
    });
  }

  handleToggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  showInfo = index => {
    this.setState({
      isOpen: this.state.infoIndex !== index || !this.state.isOpen,
      infoIndex: index
    });
  };

  onMarkerClick = index => {
    const divToScrollTo = document.getElementById(index);
    if (divToScrollTo) {
      divToScrollTo.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  };

  onNext = () => {
    this.setState({ isLoading: true });

    // Get data for next page
    axios
      .get(`${this.state.apiUrl}${this.state.currPage + 1}${this.state.query}`)
      .then(res => {
        if (res.data.error) {
          this.setState({
            isLoading: false
          });
          console.error(res.data.message);
        } else {
          this.setState({
            currPage: this.state.currPage + 1,
            events: res.data.message,
            isOpen: false,
            infoIndex: null
          });
          axios
            .get(
              `${this.state.apiUrl}${this.state.currPage + 1}${
                this.state.query
              }`
            )
            .then(res => {
              console.log(this.state.currPage + 1);
              if (res.data.error) {
                console.log(error);
              } else if (res.data.message.length != 0) {
                this.setState({
                  hasNext: true
                });
              } else {
                this.setState({
                  hasNext: false
                });
              }

              this.setState({
                hasPrev: this.state.currPage == 1 ? false : true,
                isLoading: false
              });
            });
        }
      });
  };

  onPrev = () => {
    this.setState({ isLoading: true });

    axios
      .get(`${this.state.apiUrl}${this.state.currPage - 1}${this.state.query}`)
      .then(res => {
        if (res.data.error) {
          this.setState({
            isLoading: false
          });
          console.error(res.data.message);
        } else {
          this.setState({
            currPage: this.state.currPage - 1,
            events: res.data.message,
            isOpen: false,
            infoIndex: null
          });
          if (this.state.currPage == 1) {
            this.setState({
              isLoading: false,
              hasPrev: false,
              hasNext: true
            });
          } else {
            axios
              .get(
                `${this.state.apiUrl}${this.state.currPage - 1}${
                  this.state.query
                }`
              )
              .then(res => {
                if (res.data.error) {
                  console.log(error);
                } else if (res.data.message.length != 0) {
                  this.setState({
                    hasPrev: true
                  });
                } else {
                  this.setState({
                    hasPrev: false
                  });
                }
                this.setState({
                  hasNext: true,
                  isLoading: false
                });
              });
          }
        }
      });
  };

  handleButtonClick = query => {
    this.setState(
      {
        isLoading: true,
        isOpen: false,
        infoIndex: null,
        currPage: 0,
        hasPrev: false,
        hasNext: true,
        apiUrl:
          query.length === 0 || /^\s*$/.test(query)
            ? "api/dev/"
            : "/api/search/",
        query:
          query.length === 0 || /^\s*$/.test(query) ? "" : `?search=${query}`
      },
      () => {
        axios
          .get(
            `${this.state.apiUrl}${this.state.currPage + 1}${this.state.query}`
          )
          .then(res => {
            if (res.data.error) {
              this.setState({
                isLoading: false
              });
              console.error(res.data.message);
            } else {
              this.setState({
                currPage: this.state.currPage + 1,
                events: res.data.message,
                isOpen: false,
                infoIndex: null
              });
              axios
                .get(
                  `${this.state.apiUrl}${this.state.currPage + 1}${
                    this.state.query
                  }`
                )
                .then(res => {
                  if (res.data.error) {
                    console.log(error);
                  } else if (res.data.message.length != 0) {
                    this.setState({
                      hasNext: true
                    });
                  } else {
                    this.setState({
                      hasNext: false
                    });
                  }
                  this.setState({
                    isLoading: false
                  });
                });
            }
          });
      }
    );
  };

  render() {
    if (this.state.initialLoad) {
      return (
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
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 responsive-wrap">
            <SideBar
              {...this.state}
              handleToggleOpen={this.handleToggleOpen}
              showInfo={this.showInfo}
              onMarkerClick={this.onMarkerClick}
              onNext={this.onNext}
              onPrev={this.onPrev}
              onButtonClick={this.handleButtonClick}
            />
          </div>
          <div className="col-md-8 responsive-wrap map-wrap">
            <div className="map-fix">
              <div id="map">
                <MapContainer
                  {...this.state}
                  handleToggleOpen={this.handleToggleOpen}
                  showInfo={this.showInfo}
                  mapCenter={this.state.mapCenter}
                  onMarkerClick={this.onMarkerClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
