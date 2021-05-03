import {render, screen} from '@testing-library/react';
import App from "./App";
import React from "react";
import {
    BrowserRouter as Router
} from "react-router-dom";

test('Test classe App + correct Sensor', () => {
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
