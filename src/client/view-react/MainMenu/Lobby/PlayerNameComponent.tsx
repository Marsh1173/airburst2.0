import React from "react";
import { Component } from "react";
import { PlayerInfo } from "../../../../model/api/PlayerInfo";
import { BrowserPresenter } from "../../../presenter/BrowserPresenter";

export class PlayerNameComponent extends Component<PlayerInfo, {}> {
    constructor(props: PlayerInfo) {
        super(props);
    }

    render() {
        return (
            <div className="PlayerNameComponent bordered">
                <p className="title">{this.props.name}</p>
                <div className="colorDiv" style={{ background: this.props.color }}></div>
            </div>
        );
    }
}
