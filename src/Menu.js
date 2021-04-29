import React from "react";
import {Link} from "react-router-dom";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({sensors:[]});
  }

  changeState = (sensors) => {
    this.setState({sensors:sensors});
  }

  render() {
    return (
      <div class='boutons'>
        <ul>
      {this.state.sensors.map((sensor)=>{
        return <li><Link to={sensor.id}>{sensor.name}</Link></li>;
      })}
        </ul>
      </div>
    );
  }
}

export default Menu;
