import { faFacebookF } from "@fortawesome/free-brands-svg-icons/faFacebookF";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faWikipediaW } from "@fortawesome/free-brands-svg-icons/faWikipediaW";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { faRss } from "@fortawesome/free-solid-svg-icons/faRss";
import { faSitemap } from "@fortawesome/free-solid-svg-icons/faSitemap";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { i18n, useTranslation } from "next-i18next";
import Link from "next/link";
import { IPirateParty } from "../../../data/PirateParties";
import ContentBox from "../../uni/Content/ContentBox";
import LinkExternal from "../../uni/LinkExternal";

type Props = {
    data?: IPirateParty,
    className?: string
}

export default function PartiesLeftMenu(props: Props) {
    const {t} = useTranslation();

    const party = props.data || {} as IPirateParty;

    let website = party.links?.find(link => link.tags?.includes("website") && link.lang === i18n?.language);
    if (!website) {
        website = party.links?.find(link => link.tags?.includes("website"));
    }

    const wikiLink = party.links?.find(link => link.tags?.includes("wikipedia") && link.lang === i18n?.language);

    const twitter = party.links?.find(link => link.tags?.includes("twitter"));

    const instagram = party.links?.find(link => link.tags?.includes("instagram"));

    const rss = party.links?.find(link => link.tags?.includes("rss/atom"));

    return (
        <ContentBox className={props.className}>
            {
                website &&
                <LinkExternal data={website}
                              title={"Website"}
                              className={"btn btn-secondary btn-block"}
                              faIcon={faGlobe}/>
            }
            {
                wikiLink &&
                <LinkExternal data={wikiLink}
                              title={"Wikipedia"}
                              className={"btn btn-secondary btn-sm btn-block"}
                              faIcon={faWikipediaW}/>
            }

            <div className={"my-2 text-center"}>
                {
                    party.fbPages?.filter(fbPage => {
                        return fbPage.tags?.includes("official");
                    }).map((fbPage, i) => {
                        return (
                            <LinkExternal key={i}
                                          data={fbPage}
                                          title={""}
                                          className={"btn btn-primary mr-1"}
                                          faIcon={faFacebookF}/>
                        );
                    })
                }
                {
                    twitter &&
                    <LinkExternal data={twitter}
                                  title={""}
                                  className={"btn btn-primary mr-1"}
                                  faIcon={faTwitter}/>
                }
                {
                    instagram &&
                    <LinkExternal data={instagram}
                                  title={""}
                                  className={"btn btn-danger mr-1"}
                                  faIcon={faInstagram}/>
                }
                {
                    rss &&
                    <LinkExternal data={rss}
                                  title={""}
                                  className={"btn btn-warning mr-1"}
                                  faIcon={faRss}/>
                }
            </div>

            {
                party.fbGroups?.filter(fbGroup => {
                    return fbGroup.tags?.includes("official");
                }).map((fbGroup, i) => {
                    return (
                        <LinkExternal key={i} data={fbGroup}
                                      className={"btn btn-primary btn-block"}
                                      faIcon={faUsers}/>
                    );
                })
            }

            {
                party.parent &&
                <>
                    <h3 className={"mt-4"}>
                        <small>
                            {t("pages.parties.superParty")}
                        </small>
                    </h3>

                    <Link href={"/parties/" + party.parent.id}>
                        <a className={"btn btn-secondary btn-sm btn-block text-left"}>
                            {t(party.parent.title)}
                        </a>
                    </Link>
                </>
            }

            {
                party.children?.length &&
                <h3 className={"mt-4"}>
                    <small>
                        <FontAwesomeIcon icon={faSitemap} className={"mr-2"}/>
                        {t("pages.parties.subParties")}
                    </small>
                </h3>
            }
            {
                party.children?.map((child, i) => {
                    return (
                        <Link key={i} href={"/parties/" + child.id}>
                            <a className={"btn btn-dark btn-block text-left"}>
                                {t(child.title)}
                            </a>
                        </Link>
                    );
                })
            }
        </ContentBox>
    );
}
