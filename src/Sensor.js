import React from "react";
import {useParams} from "react-router-dom";

function Sensor(props) {
    let {name} = useParams();
    let sensor = props.sensors.filter(s => {
        return s.name.replace(/\s/g, "") === name.replace(/\s/g, "");
    })[0];

    return (
        <div class='sensors'>
            <h3>{sensor.name}</h3>
            <p>Valeur : actuelle :</p>
            <h4>{sensor.values[sensor.values.length-1]}</h4>
            <p>Historique :</p>
            <table>
                {sensor.values.slice().reverse().map(value=>{
                    return <tr><td>{value}</td></tr>;
                })}
            </table>
        </div>
    );
}

export default Sensor;
