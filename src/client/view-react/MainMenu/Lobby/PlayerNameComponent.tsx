import React from "react";
import { Component } from "react";
import { PlayerInfo } from "../../../../model/api/PlayerInfo";
import { BrowserPresenter } from "../../../presenter/BrowserPresenter";

interface PlayerNameComponentProps extends PlayerInfo {
  is_host: boolean;
  is_player: boolean;
}

export class PlayerNameComponent extends Component<PlayerNameComponentProps, {}> {
  constructor(props: PlayerNameComponentProps) {
    super(props);
  }

  render() {
    return (
      <div className={`PlayerNameComponent bordered ${this.props.is_player ? "is-player" : ""}`}>
        <p className="title">{this.props.name}</p>
        {this.props.is_host && <p className="hostIndicator">(Host)</p>}
        <div className="colorDiv" style={{ background: this.props.color }}></div>
      </div>
    );
  }
}
