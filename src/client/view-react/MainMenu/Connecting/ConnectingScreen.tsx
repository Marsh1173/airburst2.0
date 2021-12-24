import React from "react";
import { Component } from "react";
import { HomePresenter } from "../../../presenter/HomePresenter";

export class ConnectingScreen extends Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <div className="ConnectingScreen">Connecting to server...</div>;
    }

    componentDidMount() {
        HomePresenter.initWebsocket();
    }
}
