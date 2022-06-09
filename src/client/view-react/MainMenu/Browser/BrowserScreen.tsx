import React from "react";
import { Component } from "react";
import { LobbyInfo } from "../../../../model/api/LobbyInfo";
import { BrowserPresenter } from "../../../presenter/BrowserPresenter";
import { getNextId } from "../../../../model/misc/getNextId";
import { LobbyComponent } from "./LobbyComponent";
import { SpecialButton } from "../../Extras/SpecialButton/SpecialButton";
import "./BrowserScreenStyles.less";

export class BrowserScreen extends Component<{}, BrowserState> {
  constructor(props: any) {
    super(props);
    this.state = { lobbies: BrowserPresenter.currentLobbies };
  }

  render() {
    let elems: JSX.Element[] = this.state.lobbies.map((lobby) => {
      return (
        <LobbyComponent
          key={getNextId()}
          id={lobby.id}
          name={lobby.name}
          players={lobby.players}
          player_host_id={lobby.player_host_id}
        ></LobbyComponent>
      );
    });

    return (
      <div className="BrowserScreen fade-in">
        <h1>Lobbies</h1>
        <div className="lobbies">
          {elems.length == 0 && <p>- No lobbies are open - </p>}
          {elems}
        </div>
        <SpecialButton title="+ New" onClick={BrowserPresenter.attemptCreateNewLobby} scale={1}></SpecialButton>
      </div>
    );
  }

  componentDidMount() {
    BrowserPresenter.updateLobbies = (lobbies: LobbyInfo[]) => {
      BrowserPresenter.currentLobbies = lobbies;
      this.setState({ lobbies });
    };
  }

  componentWillUnmount() {
    BrowserPresenter.resetUpdateLobbyFunc();
  }
}

interface BrowserState {
  lobbies: LobbyInfo[];
}
