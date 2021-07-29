import { CSSProperties, ReactNode } from "react";

type Props = {
    title?: string,
    children?: ReactNode,
    className?: string,
    style?: CSSProperties,
    noPadding?: boolean
}

export default function ContentBox(props: Props) {
    let content = (
        <>
            {
                props.title &&
                <h2>{props.title}</h2>
            }
            {props.children}
        </>
    );

    let className = "my-3 bg-white rounded shadow-sm " + (props.className ?? "");

    if (!props.noPadding) {
        className += " p-3";
    }

    return (
        <div className={className} style={props.style}>
            {content}
        </div>
    );
}
