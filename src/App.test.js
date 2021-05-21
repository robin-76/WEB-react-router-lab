import {render, screen} from '@testing-library/react';
import App from "./App";
import React from "react";

test('Test classe App + correct Sensor', () => {
    let app = React.createRef();
    render(<App />);
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

    app.current.changeSensors(sensors);
    const linkElement = screen.getByText(/TP/i);
    expect(linkElement).toBeInTheDocument();
});
