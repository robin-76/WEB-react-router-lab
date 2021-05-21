import React, {useState, forwardRef, useImperativeHandle} from "react";
import {Link} from "react-router-dom";

const Menu = forwardRef((props, ref) => {
    const [sensors, setSensors] = useState([]);

    useImperativeHandle(ref, () => ({
        changeSensors(tabSensors) {
            setSensors([...tabSensors]);
        }
    }));

    return (
        <div className="wrapper">
            <div className="boutons"><ul>
                {sensors.map((sensor, index)=>{
                    return <li key = {index}><Link to={sensor.name.replace(/\s/g, "")}>{sensor.name}</Link></li>;
                })}
            </ul></div>
        </div>
    );
});

export default Menu;
