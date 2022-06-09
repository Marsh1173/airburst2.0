import "./LoginScreenStyles.less";
import React from "react";
import { Component } from "react";
import { HomePresenter } from "../../../presenter/HomePresenter";
import { SpecialButton } from "../../Extras/SpecialButton/SpecialButton";
import { Global } from "../../../dataAccessors/GlobalInfo";

export class LoginScreen extends Component<{}, {}> {
  private nameRef: React.RefObject<HTMLInputElement> = React.createRef();
  private colorRef: React.RefObject<HTMLInputElement> = React.createRef();

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="LoginScreen">
        <SpecialButton
          title="Play"
          onClick={() => {
            let name: string = this.nameRef.current!.value;
            let color: string = this.colorRef.current!.value;
            HomePresenter.onLogin(name, color);
          }}
          scale={2}
        ></SpecialButton>
        <div className="loginInput bordered">
          <div className="labels">
            <p>Name:</p>
            <p>Color:</p>
          </div>
          <div className="inputs">
            <input ref={this.nameRef} type="text" defaultValue={Global.playerInfo.name} maxLength={15}></input>
            <input ref={this.colorRef} type="color" defaultValue={Global.playerInfo.color}></input>
          </div>
        </div>
      </div>
    );
  }
}
