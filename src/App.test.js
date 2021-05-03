import {render, screen} from '@testing-library/react';
import Menu from "./Menu";
import App from "./App";
import React from "react";
import {
    BrowserRouter as Router
} from "react-router-dom";

test('Menu + correct Sensor', () => {
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
    menu.current.changeState(sensors);
    const linkElement = screen.getByText(/Temperature Salle A111/i);
    expect(linkElement).toBeInTheDocument();
});

test('Menu + null Sensor', () => {
    const menu = React.createRef();
    render(<Router><Menu ref={menu}/></Router>)
    const menuTest = [];
    menu.current.changeState(menuTest);
    const linkElement = screen.queryByText("Link");
    expect(linkElement).toBeNull();
});

test('App + correct Sensor', () => {
    let app = React.createRef();
    render(<Router><App ref={app}/></Router>);
    const sensors = [
        {
            "id": "123456",
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
    app.current.changeState(sensors);
    const linkElement = screen.getByText(/Temperature Couloir/i);
    expect(linkElement).toBeInTheDocument();
});