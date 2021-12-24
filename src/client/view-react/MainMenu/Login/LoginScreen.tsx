import "./LoginScreenStyles.less";
import React from "react";
import { Component } from "react";
import { HomePresenter } from "../../../presenter/HomePresenter";
import { SpecialButton } from "../../Extras/SpecialButton/SpecialButton";

export class LoginScreen extends Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="LoginScreen">
                <SpecialButton
                    title="Play"
                    onClick={() => {
                        HomePresenter.onLogin();
                    }}
                    scale={2}
                ></SpecialButton>
                <div className="loginInput bordered">
                    <div className="labels">
                        <p>Name:</p>
                        <p>Color:</p>
                    </div>
                    <div className="inputs">
                        <input type="text"></input>
                        <input type="color"></input>
                    </div>
                </div>
            </div>
        );
    }
}
