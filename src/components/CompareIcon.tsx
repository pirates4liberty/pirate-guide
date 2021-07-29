import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons/faArrowCircleRight";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons/faQuestionCircle";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons/faWindowClose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { OpinionType } from "../data/Ideologies";

class Props {
    opinion?: OpinionType;
    negative?: boolean;
    colors?: string[]
}

export default function CompareIcon(props: Props) {
    const {t} = useTranslation();

    let positivityColors = props.colors || [
        "success",
        "secondary",
        "warning",
        "danger"
    ];

    if (props.negative) {
        positivityColors = positivityColors.reverse();
    }

    let out;

    switch (props.opinion) {
        case "higher":
            out = <FontAwesomeIcon icon={faArrowUp}
                                   className={"text-" + positivityColors[0]}/>
            break;
        case "yes":
            out = <FontAwesomeIcon icon={faCheckCircle}
                                   className={"text-" + positivityColors[0]}/>
            break;
        case "equal":
            out = <FontAwesomeIcon icon={faArrowCircleRight}
                                   className={"text-" + positivityColors[2]}/>
            break;
        case "no":
            out = <FontAwesomeIcon icon={faWindowClose}
                                   className={"text-" + positivityColors[3]}/>
            break;
        case "lower":
            out = <FontAwesomeIcon icon={faArrowDown}
                                   className={"text-" + positivityColors[3]}/>
            break;
        case "neutral":
            out = <span className={"badge badge-pill badge-" + positivityColors[1]}>N</span>
            break;
        case "unknown":
        default:
            out = <FontAwesomeIcon icon={faQuestionCircle}
                                   className={"text-" + positivityColors[1]}/>
            break;
    }

    return (
        <OverlayTrigger placement="bottom"
                        overlay={<Tooltip id={"3"}>{t("opinionTitle." + (props.opinion || "unknown"))}</Tooltip>}>
            {out}
        </OverlayTrigger>
    );
}
