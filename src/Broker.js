import React from "react";

const Broker = props => {
    return (
        <div className="wrapper">
            <div className="textURL"><h2>URL du Broker :</h2></div>
            <div className="champURL"><input type="text" size="35" value="ws://random.pigne.org:9001" onKeyDown={props.onKeyDown} /></div>
        </div>
    );
};

export default Broker;
