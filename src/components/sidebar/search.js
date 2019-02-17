import React, { Component } from "react";
import axios from "axios";

class Search extends Component {
  state = {
    query: ""
  };

  handleInputChange = () => {
    console.log("input", this.search.value);
    this.setState({
      query: this.search.value
    });
  };

  handleButtonClick = (e, query) => {
    e.preventDefault();
    this.props.onButtonClick(query);
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <form class="form-inline">
          <div className="input-group">
            <input
              class="form-control"
              type="text"
              placeholder="Find Events"
              aria-label="Search"
              method="GET"
              ref={input => (this.search = input)}
              onChange={this.handleInputChange}
            />
            <span class="input-group-btn">
              <button
                class="btn btn-outline-dark text-dark top-btn mx-2"
                type="submit"
                onClick={e => this.handleButtonClick(e, this.state.query)}
              >
                Search
              </button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
