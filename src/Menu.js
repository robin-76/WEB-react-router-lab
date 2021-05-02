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
            <div className='boutons'>
                <ul>
                    {this.state.sensors.map((sensor)=>{
                        return <li key = {sensor.name}><Link to={sensor.name.replace(/\s/g, "")}>{sensor.name}</Link></li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default Menu;
