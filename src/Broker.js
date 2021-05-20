import React from "react";

class Broker extends React.Component {
    constructor(props) {
        super(props);
        this.onKeyDown = props.onKeyDown;
    }

    render() {
        return (
          <div className="wrapper">
            <div className="textURL"><h2>URL du Broker :</h2></div>
            <div className="champURL"><input type="text" size="35" placeholder="ws://random.pigne.org:9001" onKeyDown={this.onKeyDown} /></div>
          </div>
        );
    }
}

export default Broker;
