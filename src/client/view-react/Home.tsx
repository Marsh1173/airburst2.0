import React from "react";
import { Component } from "react";
import { HomePresenter } from "../presenter/HomePresenter";
import { BrowserScreen } from "./MainMenu/Browser/BrowserScreen";
import { ConnectingScreen } from "./MainMenu/Connecting/ConnectingScreen";
import { ConnectionFailedScreen } from "./MainMenu/Connecting/ConnectionFailedScreen";
import { MessageComponent } from "./Extras/MessageComponent/MessageComponent";
import { LoginScreen } from "./MainMenu/Login/LoginScreen";
import "./HomeStyles.less";

export class Home extends Component<{}, HomeState> {
    private msgRef: React.RefObject<MessageComponent> = React.createRef();
    constructor(props: any) {
        super(props);

        this.state = { currentPage: "connecting" };
    }

    render() {
        return (
            <div className="Home">
                {this.state.currentPage == "connecting" && <ConnectingScreen></ConnectingScreen>}
                {this.state.currentPage == "connectionFailed" && <ConnectionFailedScreen></ConnectionFailedScreen>}
                {this.state.currentPage == "login" && <LoginScreen></LoginScreen>}
                {this.state.currentPage == "browser" && <BrowserScreen></BrowserScreen>}
                <MessageComponent ref={this.msgRef}></MessageComponent>
            </div>
        );
    }

    componentDidMount() {
        HomePresenter.changeHomeScreen = (newScreenName: string) => {
            this.setState({ currentPage: newScreenName });
        };
        HomePresenter.showMessage = (msg: string, type: "good" | "bad" | "neutral") => {
            if (this.msgRef.current) {
                this.msgRef.current.setState({ msg, type, ifHidden: false });
            }
        };

        HomePresenter.showMessage("Testing....", "neutral");
    }

    componentWillUnmount() {
        HomePresenter.changeHomeScreen = () => {};
        HomePresenter.showMessage = () => {};
    }
}
interface HomeState {
    currentPage: string;
}
