import './App.css';
import React, {useState, useEffect, useRef} from 'react';
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
  const [clavier, setClavier] = useState('');
  const [sensors, setSensors] = useState([]);
  const [url, setUrl] = useState('ws://random.pigne.org:9001');

  useEffect(() => {
  const onKeyDown = (e) => {
        if (e.key === 'Enter') {
          setClavier(onKeyDown)
          setUrl(e.target.value);

          function connexion(){
            try {
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

            } catch (e) {
              console.log("URL invalide");
            }

          }
          connexion();
        }
      }
      window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [url]);

        return (
            <Router>
                <div className="App">
                    <h1>TP Lab React et React Router</h1>
                    <Broker onKeyDown={clavier}/>
                    <Menu ref={menu}/>
                    <Switch>
                        <Route path="/:name" children={<Sensor sensors={sensors} />} />
                    </Switch>
                </div>
            </Router>
        );
}

export default App;
