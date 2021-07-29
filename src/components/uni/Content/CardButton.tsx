import React, { CSSProperties, ReactNode } from "react";
import { CssColor } from "../../../types/CssColor";
import LinkExternal from "../LinkExternal";
import LinkInternal from "../LinkInternal";

type Props = {
    title?: string,
    children?: ReactNode,
    className?: string,
    style?: CSSProperties,
    bgColor?: CssColor,
    textColor?: string,
    link?: string,
    isLinkExternal?: boolean
}

export default function CardButton(props: Props) {
    let out = (
        <div
            className={"card bg-" + (props.bgColor ?? "white") + " text-" + (props.textColor ?? "dark") + " mb-3 " + (props.className ?? "")}
            style={props.style}>
            <div className="card-body">
                {
                    props.title &&
                    <h4 className={"card-title"}>
                        {props.title}
                    </h4>
                }
                <div className={"card-text"}>
                    {props.children}
                </div>
            </div>
        </div>
    );

    if (props.link) {
        if (props.isLinkExternal) {
            out = <LinkExternal url={props.link} className={"btn"}>{out}</LinkExternal>
        } else {
            out = <LinkInternal url={props.link} className={"btn"}>{out}</LinkInternal>
        }
    }

    return out;
}
