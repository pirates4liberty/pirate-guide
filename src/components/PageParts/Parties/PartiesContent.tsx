import { faFacebookF } from "@fortawesome/free-brands-svg-icons/faFacebookF";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons/faProjectDiagram";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { IPirateParty } from "../../../data/PirateParties";
import ContentBox from "../../uni/Content/ContentBox";
import LinkExternal from "../../uni/LinkExternal";

type Props = {
    data?: IPirateParty,
    className?: string
}

export default function PartiesContent(props: Props) {
    const {t} = useTranslation();

    const party = props.data || {} as IPirateParty;

    return (
        <ContentBox className={props.className}>
            {
                party.projects?.length &&
                <h3 className={"mt-4"}>
                    <FontAwesomeIcon icon={faProjectDiagram} className={"mr-2"}/>
                    {t("pages.projects.title")}
                </h3>
            }
            {
                party.projects?.map((project, i) => {
                    let note = "";
                    let btnColor = "warning";
                    if (project.tags?.includes("unofficial")) {
                        note = "*";
                        btnColor = "secondary";
                    }

                    return (
                        <Link key={i} href={"/projects/" + project.id}>
                            <a className={"btn btn-" + btnColor + " m-1"}>
                                <FontAwesomeIcon icon={faProjectDiagram} className={"mr-2"}/>
                                {t(project.title)}{note}
                            </a>
                        </Link>
                    );
                })
            }

            {
                party.webSystems?.length &&
                <h3 className={"mt-4"}>
                    <FontAwesomeIcon icon={faGlobe} className={"mr-2"}/>
                    {t("pages.parties.webSystems")}
                </h3>
            }
            {
                party.webSystems?.map((fbGroup, i) => {
                    return (
                        <LinkExternal key={i} data={fbGroup}
                                      className={"btn btn-danger m-1"}/>
                    );
                })
            }

            <h3 className={"mt-4"}>
                {t("pages.parties.otherLinks")}
            </h3>
            {
                party.fbPages?.filter(fbPage => {
                    return !fbPage.tags?.includes("official");
                }).map((fbGroup, i) => {
                    return (
                        <LinkExternal key={i} data={fbGroup}
                                      className={"btn btn-primary m-1"}
                                      faIcon={faFacebookF}/>
                    );
                })
            }
            {
                party.fbGroups?.filter(fbGroup => {
                    return !fbGroup.tags?.includes("official");
                }).map((fbGroup, i) => {
                    let note = "";
                    if (fbGroup.tags?.find(tag => tag === "unofficial")) {
                        note = "*";
                    }

                    return (
                        <LinkExternal key={i} data={fbGroup}
                                      className={"btn btn-primary m-1"}
                                      faIcon={faUsers}
                                      title={fbGroup.title + note}/>
                    );
                })
            }

            <p className={"mt-4"}>
                * {t("pages.parties.unofficialInitiatives")}
            </p>
        </ContentBox>
    );
}
