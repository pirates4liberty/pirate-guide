import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { ReactNode } from "react";
import { IExternalLink } from "../../model/IExternalLink";
import { deepCopy } from "../../tools/Helpers/Tools";

type Props = {
    data?: IExternalLink,
    title?: string,
    url?: string,
    className?: string,
    faIcon?: IconProp,
    rel?: string
    target?: string,
    children?: ReactNode,
}

export default function LinkInternal(props: Props) {
    let data = props.data ? deepCopy(props.data) : {} as IExternalLink;

    data.title = props.title ?? data.title;
    data.url = props.url ?? data.url ?? "#";
    data.faIcon = props.faIcon ?? data.faIcon;

    const title = data.title ?? data.url;
    const icon = data.faIcon ? (
        <FontAwesomeIcon icon={data.faIcon} className={title.length ? "mr-2" : ""}/>
    ) : undefined;

    const titleSubEl = data.titleSub ? <> <small>{data.titleSub}</small></> : undefined;
    const children = <>{props.children ?? <>{data.title}{titleSubEl}</>}</>

    return (
        <Link href={data.url}>
            <a target={props.target}
               rel={props.rel}
               className={props.className}>
                {icon}{children}
            </a>
        </Link>
    );
}
