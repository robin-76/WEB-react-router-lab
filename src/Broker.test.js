import {render, screen} from "@testing-library/react";
import Broker from "./Broker";
import React from "react";

test('Test classe Broker', () => {
    render(<Broker />);
    const titleElement = screen.getByText(/URL du Broker/i);
    expect(titleElement).toBeInTheDocument();
});
