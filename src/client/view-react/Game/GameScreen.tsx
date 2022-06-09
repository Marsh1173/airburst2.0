import React from "react";
import { Component } from "react";
import { GamePresenter } from "../../presenter/GamePresenter";
import "./GameScreenStyles.less";

export class GameScreen extends Component<{}, {}> {
    private canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="GameScreen fade-in">
                <canvas className="gameCanvas" ref={this.canvasRef}></canvas>
            </div>
        );
    }

    componentDidMount() {
        GamePresenter.gameScreenInterface = { canvas: this.canvasRef.current! };
        GamePresenter.onFinishRendering();
    }
}
