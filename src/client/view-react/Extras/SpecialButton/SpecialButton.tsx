import "./SpecialButtonStyles.less";
import React from "react";
import { Component } from "react";

export class SpecialButton extends Component<SpecialButtonProps, {}> {
    constructor(props: SpecialButtonProps) {
        super(props);
    }

    render() {
        return (
            <div className="SpecialButton" style={{ transform: `scale(${this.props.scale})` }}>
                <div className="mainButton shrink-in" onClick={this.props.onClick}>
                    <div className="rings">
                        <div className="plateRing">
                            <img src="images/outerPlates.png"></img>
                        </div>
                        <div className="innerRing"></div>
                    </div>
                    <div className="label">
                        <p>{this.props.title}</p>
                    </div>
                </div>
            </div>
        );
    }
}

interface SpecialButtonProps {
    onClick: () => void;
    title: string;
    scale: number;
}
