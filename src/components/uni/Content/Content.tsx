import { CSSProperties, ReactNode } from "react";

class Props {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}

export default function Content(props: Props) {
    return (
        <div className={"bg-light " + props.className} style={props.style}>
            <div className="container py-5">
                {props.children}
            </div>
        </div>
    );
}
