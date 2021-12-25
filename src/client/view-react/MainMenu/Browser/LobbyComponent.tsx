import React from "react";
import { Component } from "react";
import { LobbyInfo } from "../../../../model/api/LobbyInfo";
import { BrowserPresenter } from "../../../presenter/BrowserPresenter";

export class LobbyComponent extends Component<LobbyInfo, {}> {
    constructor(props: LobbyInfo) {
        super(props);
    }

    render() {
        return (
            <div
                className="LobbyComponent clickable"
                onClick={() => {
                    BrowserPresenter.attemptJoinLobby(this.props.id);
                }}
            >
                <p className="title">{this.props.name}</p>
                <p className="playerCount">Players: {this.props.players.length}</p>
            </div>
        );
    }
}
