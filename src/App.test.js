import {render, screen} from '@testing-library/react';
import App from "./App";
import React from "react";

test('Test classe App + correct Sensor', () => {
    let app = React.createRef();
    render(<App />);

    const linkElement = screen.getByText(/TP Lab React et React Router/i);
    expect(linkElement).toBeInTheDocument();
});
