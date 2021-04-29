import React from "react";
import './App.css';
import PropTypes from "prop-types";
import mqtt from "mqtt";

function BrockerUrl(props) {
    return (
        <div>
            <label htmlFor="brockerUrlInput" className="brockerUrl">
                URL du Brocker :
            </label>
            <br/>
            <input
                type="text"
                id="brockerUrlInput"
                size="30"
                value={props.url}
                onChange={props.onChange}
            />
        </div>
    );
}

BrockerUrl.propTypes = {
    url: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function DevicesList(props) {
    const result = props.devices.map((obj) => <a href key={obj.id}> {obj.name}<br/></a>);
    return <div className="devicesList">{result}</div>;
}

DevicesList.propTypes = {
    devices: PropTypes.array,
};

class App extends React.Component {
    constructor(props) {
        super(props);
        const url = "ws://random.pigne.org:9001";
        this.state = {
            url: url,
            client: mqtt.connect(url),
            sensors: [],
        };
    }

    componentDidMount() {
        this.updateMqttClient();
    }

    updateMqttClient() {
        this.state.client.on("connect", () => {
            this.state.client.subscribe("value/#", () => {
                console.log("subscribing...");
            });
        });

        this.state.client.on("message", (topic, message) => {
            const id = topic.substring(6);
            const obj = JSON.parse(message.toString());
            let sensor = this.state.sensors.find((element) => element.id === id);

            if (typeof sensor === "undefined") {
                sensor = {id, ...obj, values: []};
                delete sensor.value;
                this.setState({sensors: this.state.sensors.concat([sensor])});
            }
        });
    }

    render() {
        return (
            <div className="App">
                <h1>TP Lab React et React Router</h1>
                <BrockerUrl
                    url={this.state.url}
                    onChange={(e) =>
                        this.setState(
                            {
                                url: e.target.value,
                                client: mqtt.connect(e.target.value),
                            },
                            this.updateMqttClient
                        )
                    }/>
                <br/>
                <DevicesList devices={this.state.sensors}/>
            </div>
        );
    }
}

export default App;
