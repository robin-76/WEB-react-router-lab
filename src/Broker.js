import React from "react";

class Broker extends React.Component {
    constructor(props) {
        super(props);
        this.onKeyDown = props.onKeyDown;
    }

    render() {
        return (
            <div className='broker'>
                <h2>URL du Broker :</h2>
                <input type="text" size="25" value="ws://random.pigne.org:9001" onKeyDown={this.onKeyDown} />
            </div>
        );
    }
}

export default Broker;
