import React from "react";
import {render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import Menu from "./Menu";

test('Test classe Menu + correct Sensor', () => {
    let menu = React.createRef();
    render(<Router><Menu ref={menu}/></Router>);
    const sensors = [
        {
            "id": "123456",
            "name": "Temperature Salle A111",
            "type": "DOUBLE",
            "values": [
                "1.11",
                "3.33",
                "5.55",
                "7.77",
            ]
        }
    ];
    menu.current.changeSensors(sensors);
    const linkElement = screen.getByText(/Temperature Salle A111/i);
    expect(linkElement).toBeInTheDocument();
});