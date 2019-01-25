import React from "react";
import SideBarItem from "./SideBarItem";

export default class SideBar extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isOpen: false,
  //     infoIndex: null
  //   };
  // }

  // handleToggleOpen = () => {
  //   this.setState({
  //     isOpen: !this.state.isOpen,
  //   });
  // }

  // showInfo(index) {
  //   this.setState({
  //     isOpen: this.state.infoIndex !== index || !this.state.isOpen,
  //     infoIndex: index
  //   });
  // }

  render() {
    const SideBarItems = this.props.events.map((event, index) => (
      <SideBarItem 
        key={index} 
        onClick={this.props.showInfo}
        event={event}
        id={index}
      />
    ));
    return (
      <div className="row light-bg detail-options-wrap scrollable">
        {SideBarItems}
      </div>
    );
  }
}