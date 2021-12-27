import React from "react";
import { Component } from "react";
import { LobbyInfo } from "../../../../model/api/LobbyInfo";
import { PlayerInfo } from "../../../../model/api/PlayerInfo";
import { getNextId } from "../../../../model/misc/getNextId";
import { BrowserPresenter } from "../../../presenter/BrowserPresenter";
import { SpecialButton } from "../../Extras/SpecialButton/SpecialButton";
import "./LobbyScreenStyles.less";
import { PlayerNameComponent } from "./PlayerNameComponent";

export class LobbyScreen extends Component<{}, LobbyState> {
    constructor(props: any) {
        super(props);
        this.state = { lobby: BrowserPresenter.currentLobby };
    }

    render() {
        let elems: JSX.Element[] = this.state.lobby.players.map((player) => {
            return <PlayerNameComponent key={getNextId()} id={player.id} name={player.name} color={player.color}></PlayerNameComponent>;
        });

        return (
            <div className="LobbyScreen fade-in">
                <h1>{this.state.lobby.name}</h1>
                <div className="players">{elems}</div>
                <div className="leaveBtn clickable" onClick={BrowserPresenter.attemptLeaveLobby}>
                    Leave
                </div>
                <SpecialButton title="Start" onClick={() => {}} scale={1}></SpecialButton>
            </div>
        );
    }

    componentDidMount() {
        BrowserPresenter.updateLobbies = (lobbies: LobbyInfo[]) => {
            BrowserPresenter.currentLobbies = lobbies;
            let lobby: LobbyInfo | undefined = lobbies.find((lobby) => lobby.id == this.state.lobby.id);
            if (lobby) {
                BrowserPresenter.currentLobby = lobby;
                this.setState({ lobby });
            }
        };
    }

    componentWillUnmount() {
        BrowserPresenter.resetUpdateLobbyFunc();
    }
}

interface LobbyState {
    lobby: LobbyInfo;
}
