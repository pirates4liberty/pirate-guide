import { faFacebookF } from "@fortawesome/free-brands-svg-icons/faFacebookF";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons/faNewspaper";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Content from "../../components/uni/Content/Content";
import ContentBox from "../../components/uni/Content/ContentBox";
import ContentHeading from "../../components/uni/Content/ContentHeading";
import LinkExternal from "../../components/uni/LinkExternal";
import { IPirateParty, PiratePartiesRepository } from "../../data/PirateParties";
import { StaticProps } from "../../tools/Helpers/TranslationHelper";

export default function Parties() {
    const {t} = useTranslation();
    const router = useRouter();
    const {id} = router.query;
    const repository = new PiratePartiesRepository();

    const party = repository.getAllRecursively().find(party => {
        if(party.projects) {
            return party.projects?.find(project => project.id === id);
        }
    });

    const project = party?.projects?.find(project => project.id === id);

    if (project === undefined) {
        return (
            <Content>
                <ContentBox>
                    {t("msg.notFound")}
                </ContentBox>
            </Content>
        )
    } else {
        const title = t(project.title);

        return (
            <Content>
                <Head>
                    <title>{title + " | " + t("app.title")}</title>
                </Head>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href={"/"}>
                                <a>{t("pages.home.title")}</a>
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href={"/links"}>
                                <a>{t("pages.projects.title")}</a>
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {title}
                        </li>
                    </ol>
                </nav>

                <ContentHeading>
                    {title}
                </ContentHeading>

                <ContentBox>
                    {
                        project.website &&
                        <LinkExternal data={project.website}
                                      title={"Website"}
                                      className={"btn btn-dark"}
                                      faIcon={faGlobe}/>
                    }

                    <h3 className={"mt-4"}>
                        <FontAwesomeIcon icon={faUsers} className={"mr-2"}/>
                        {t("pages.parties.fbGroups")}
                    </h3>
                    {
                        project.fbGroups?.map((fbGroup, i) => {
                            return (
                                <LinkExternal key={i} data={fbGroup}
                                              className={"btn btn-primary m-1"}
                                              faIcon={faFacebookF}/>
                            );
                        })
                    }

                    <h3 className={"mt-4"}>
                        <FontAwesomeIcon icon={faNewspaper} className={"mr-2"}/>
                        {t("pages.parties.fbPages")}
                    </h3>
                    {
                        project.fbPages?.map((fbGroup, i) => {
                            return (
                                <LinkExternal key={i} data={fbGroup}
                                              className={"btn btn-secondary m-1"}
                                              faIcon={faFacebookF}/>
                            );
                        })
                    }

                    <h3 className={"mt-4"}>
                        <FontAwesomeIcon icon={faGlobe} className={"mr-2"}/>
                        {t("pages.parties.webSystems")}
                    </h3>
                    {
                        project.webSystems?.map((fbGroup, i) => {
                            return (
                                <LinkExternal key={i} data={fbGroup}
                                              className={"btn btn-danger m-1"}/>
                            );
                        })
                    }
                </ContentBox>
            </Content>
        )
    }
}

export const getStaticProps = StaticProps.default();

function getProjectsIdsRecursively(parties: IPirateParty[]): any[] {
    let out: any[] = [];

    parties.forEach(party => {
        if (party.projects) {
            out = out.concat(out, party.projects.map((project) => {
                return {
                    params: {
                        id: project.id
                    }
                };
            }));
        }

        if (party.children) {
            out = out.concat(out, getProjectsIdsRecursively(party.children));
        }
    });

    return out;
}

export const getStaticPaths = async () => {
    const repository = new PiratePartiesRepository();

    const ids = getProjectsIdsRecursively(repository.getAll(false, false));

    return {
        paths: ids,
        fallback: "blocking"
    }
}
