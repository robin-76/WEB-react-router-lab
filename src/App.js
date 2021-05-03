import './App.css';
import React from "react";
import mqtt from 'mqtt';
import Broker from './Broker';
import Menu from './Menu';
import Sensor from "./Sensor";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.menu = React.createRef();
        this.state = ({sensors:[]});
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            const url = e.target.value;
            const client = mqtt.connect(url);
            const sensors = [];
            const res = this;

            client.on('connect', function () {
                client.subscribe('value/#', function (err) {
                    console.log("subscribing...");
                });
            });

            client.on('message', function (topic, message) {
                const id = topic.substring(6);
                const obj = JSON.parse(message.toString());

                let sensor = sensors.find(element => element.id === id)
                if (typeof sensor === 'undefined') {
                    sensor = {id, ...obj, values: []};
                    delete sensor.value;
                    sensors.push(sensor);
                }

                sensor.values.push(obj.value);
                const debut = sensor.values.length - 10 > 0 ? sensor.values.length - 10 : 0;
                sensor.values = sensor.values.slice(debut);
                res.setState({sensors:sensors});
                res.changeState(res.state.sensors);
            });
        }
    }

    changeState = (sensors) => {
        this.menu.current.changeState(sensors);
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <h1>TP Lab React et React Router</h1>
                    <Broker onKeyDown={this.onKeyDown}/>
                    <Menu ref={this.menu}/>
                    <Switch>
                        <Route path="/:name" children={<Sensor sensors={this.state.sensors} />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
