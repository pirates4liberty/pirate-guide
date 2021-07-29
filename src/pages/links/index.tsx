import { useTranslation } from "next-i18next";
import Head from "next/head";
import React from "react";
import Link from "next/link";
import Content from "../../components/uni/Content/Content";
import ContentBox from "../../components/uni/Content/ContentBox";
import ContentHeading from "../../components/uni/Content/ContentHeading";
import PartiesList from "../../components/PageParts/Parties/PartiesList";
import PartiesSubList from "../../components/PageParts/Parties/PartiesSubList";
import { PiratePartiesRepository } from "../../data/PirateParties";
import { StaticProps } from "../../tools/Helpers/TranslationHelper";

const repository = new PiratePartiesRepository();

export default function Links() {
    const {t} = useTranslation();

    const parties = repository.getAll();

    const title = t("pages.links.title");

    return (
        <>
            <Head>
                <title>{t("app.title")}</title>
            </Head>

            <div className="bg-light">
                <div className="notice-line">
                    <div className="container">
                        {t("notices.notPolitical")}
                    </div>
                </div>

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
                            <li className="breadcrumb-item active" aria-current="page">
                                {title}
                            </li>
                        </ol>
                    </nav>

                    <ContentHeading>
                        {t("pages.links.partiesByStates")}
                    </ContentHeading>
                    <ContentBox>
                        <PartiesList data={parties.filter(party => party.children?.length)} />

                        <hr/>

                        <PartiesSubList data={parties.filter(party => !party.children?.length)} />
                    </ContentBox>
                </Content>
            </div>
        </>
    )
}

export const getStaticProps = StaticProps.default();
