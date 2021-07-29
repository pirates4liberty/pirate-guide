import { i18n, useTranslation } from "next-i18next";
import Link from "next/link";
import { IPirateParty } from "../../../data/PirateParties";

type Props = {
    data?: IPirateParty,
    className?: string
}

export default function PartiesListButton(props: Props) {
    const {t} = useTranslation();

    const party = props.data || {} as IPirateParty;
    const isRegional = !party.tags?.find(tag => tag === "organizational");

    return (
        <Link href={"/parties/" + party.id}>
            <a className={"btn btn-lg " + (party.primaryLanguage === i18n?.language ? "btn-warning" : (isRegional ? "btn-dark" : "btn-secondary")) + " btn-block " + props.className}>
                {isRegional ? t("states." + party.id) : (party.title + (party.abbrev ? " (" + party.abbrev + ")" : ""))}
            </a>
        </Link>
    );
}
