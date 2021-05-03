import {createMemoryHistory} from "history";
import {render, screen} from "@testing-library/react";
import {Router, Route, Switch} from "react-router-dom";
import Sensor from "./Sensor";
import React from "react";

test('Test classe Sensor', () => {
    const sensors = [
        {
            "id": "4152635",
            "name": "Temperature Couloir",
            "type": "DOUBLE",
            "values": [
                "18.45",
                "45.23",
                "-12.45",
                "0.12",
            ]
        }
    ];
    const history = createMemoryHistory();
    const route = '/Temperature Couloir';
    history.push(route);
    render(<Router history={history}><Switch><Route path="/:name" children={<Sensor sensors={sensors} />} /></Switch></Router>);
    const titleElement = screen.getByText(/Temperature Couloir/i);
    expect(titleElement).toBeInTheDocument();
});