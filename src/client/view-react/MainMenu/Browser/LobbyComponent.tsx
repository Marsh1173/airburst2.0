import React from "react";
import { Component } from "react";
import { LobbyInfo } from "../../../../model/api/LobbyInfo";

export class LobbyComponent extends Component<LobbyInfo, {}> {
    constructor(props: LobbyInfo) {
        super(props);
    }

    render() {
        return (
            <div className="LobbyComponent bordered clickable">
                <p className="title">{this.props.name}</p>
                <p className="playerCount">Players: {this.props.players.length}</p>
            </div>
        );
    }
}
