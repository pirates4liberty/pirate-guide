import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode } from "react";

type Props = {
    children?: ReactNode,
    className?: string,
    faIcon?: IconProp,
}

export default function ContentHeading(props: Props) {
    let icon = <></>

    if (props.faIcon) {
        icon = <FontAwesomeIcon icon={props.faIcon} className={"mr-3"}></FontAwesomeIcon>;
    }

    return (
        <h2 className={"font-weight-bold " + props.className}>
            {icon}{props.children}
        </h2>
    );
}
