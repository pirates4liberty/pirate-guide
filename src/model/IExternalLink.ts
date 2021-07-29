import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IExternalLink {
    url: string,
    title?: string,
    titleSub?: string,
    description?: string;
    lang?: string,
    tags?: string[],
    faIcon?: IconProp,
}
