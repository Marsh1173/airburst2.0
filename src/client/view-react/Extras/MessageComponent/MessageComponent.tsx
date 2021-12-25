import "./MessageComponentStyles.less";
import React from "react";
import { Component } from "react";

interface MessageComponentState {
    msg: string;
    type: "good" | "bad" | "neutral";
    ifHidden: boolean;
    time: number;
}

export class MessageComponent extends Component<{}, MessageComponentState> {
    private timeout: number | undefined = undefined;

    constructor(props: any) {
        super(props);

        this.state = { msg: "", ifHidden: true, type: "neutral", time: 4000 };
    }

    render() {
        this.resetCountDown();
        this.startCountDown();

        return (
            <div
                className={`MessageComponent ${this.state.ifHidden ? "hidden" : "notHidden"}  ${this.state.type}`}
                onMouseEnter={() => this.resetCountDown()}
                onMouseLeave={() => {
                    if (!this.timeout) {
                        this.startCountDown();
                    }
                }}
            >
                {this.state.msg}
            </div>
        );
    }

    private resetCountDown() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
            this.timeout = undefined;
        }
    }

    private startCountDown() {
        if (!this.state.ifHidden) {
            this.timeout = window.setTimeout(() => {
                this.timeout = undefined;
                this.setState({ ifHidden: true });
            }, this.state.time);
        }
    }
}
