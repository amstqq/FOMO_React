import React from "react";
import SideBarItem from "./SideBarItem";

export default class SideBar extends React.Component {

  render() {
    const SideBarItems = this.props.events.map((event, index) => (
      <SideBarItem 
        key={index}
        onCloseClick={this.props.handleToggleOpen} 
        onClick={this.props.showInfo}
        event={event}
        id={index}
        isOpen={this.props.isOpen}
        infoIndex={this.props.infoIndex}
      />
    ));
    return (
      <div className="row light-bg detail-options-wrap scrollable">
        {SideBarItems}
      </div>
    );
  }
}