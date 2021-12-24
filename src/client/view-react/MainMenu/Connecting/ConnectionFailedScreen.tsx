import React from "react";
import { Component } from "react";

export class ConnectionFailedScreen extends Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <div className="ConnectionFailedScreen">Connection failed.</div>;
    }
}
