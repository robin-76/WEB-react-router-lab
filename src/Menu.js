import React, { useState } from 'react';
import {Link} from "react-router-dom";

function Menu(props) {
  const [sensors, setSensors] = useState([]);

  const changeState = (sensors) => {
        setSensors(sensors);
    }

        return (
            <div className='boutons'>
                <ul>
                    {sensors.map((sensor)=>{
                        return <li key = {sensor.name}><Link to={sensor.name.replace(/\s/g, "")}>{sensor.name}</Link></li>;
                    })}
                </ul>
            </div>
        );
}

export default Menu;
