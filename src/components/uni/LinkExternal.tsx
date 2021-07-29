import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";
import { IExternalLink } from "../../model/IExternalLink";
import LinkInternal from "./LinkInternal";

type Props = {
    data?: IExternalLink,
    title?: string,
    url?: string,
    className?: string,
    faIcon?: IconProp,
    rel?: string,
    target?: string
    children?: ReactNode,
}

export default function LinkExternal(props: Props) {
    const rel = props.rel ?? "noreferrer";
    const target = props.target ?? "_blank";

    return (
        <LinkInternal
            data={props.data}
            title={props.title}
            url={props.url}
            className={props.className}
            faIcon={props.faIcon}
            rel={rel}
            target={target}
        >
            {props.children}
        </LinkInternal>
    );
}
