import './App.css';
import React, {useState, useRef} from 'react';
import mqtt from 'mqtt';
import Broker from './Broker';
import Menu from './Menu';
import Sensor from "./Sensor";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

function App() {
    const menu = useRef();
    const [sensors, setSensors] = useState([]);

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            const url = e.target.value;
            const client = mqtt.connect(url);
            const tabSensors = [];

            client.on('connect', function () {
                client.subscribe('value/#', function (err) {
                    console.log("subscribing...");
                });
            });

            client.on('message', function (topic, message) {
                const id = topic.substring(6);
                const obj = JSON.parse(message.toString());

                let sensor = tabSensors.find(element => element.id === id)
                if (typeof sensor === 'undefined') {
                    sensor = {id, ...obj, values: []};
                    delete sensor.value;
                    tabSensors.push(sensor);
                }

                sensor.values.push(obj.value);
                const debut = sensor.values.length - 10 > 0 ? sensor.values.length - 10 : 0;
                sensor.values = sensor.values.slice(debut);
                setSensors([...tabSensors]);
                menu.current.changeSensors(tabSensors);
            });
        }
    }

    return (
        <Router>
            <div className="App">
                <h1>TP Lab React et React Router</h1>
                <Broker onKeyDown={onKeyDown}/>
                <Menu ref={menu}/>
                <Switch>
                    <Route path="/:name" children={<Sensor sensors={sensors} />} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
