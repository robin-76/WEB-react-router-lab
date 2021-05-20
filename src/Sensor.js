import React from "react";
import {useParams} from "react-router-dom";

function Sensor(props) {
    let {name} = useParams();
    let sensor = props.sensors.filter(s => {
        return s.name.replace(/\s/g, "") === name.replace(/\s/g, "");
    })[0];

    return (
      <div className="wrapper">
        <div className="nomSensor"><h3>{sensor.name}</h3></div>
        <div className="textValeurActuelle"><p>Valeur actuelle :</p></div>
        <div className="valeurSensor"><h4>{sensor.values[sensor.values.length-1]}</h4></div>
        <div className="historique"><p>Historique :</p></div>
        <div className="tableau"><table>
            <tbody>
            {sensor.values.slice().reverse().map(value=>{
                return <tr key={value}><td>{value}</td></tr>;
            })}
            </tbody>
        </table>
        </div>
      </div>
    );
}

export default Sensor;
