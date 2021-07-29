import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Link from "next/link";
import Content from "../../components/uni/Content/Content";
import ContentBox from "../../components/uni/Content/ContentBox";
import ContentHeading from "../../components/uni/Content/ContentHeading";
import { StaticProps } from "../../tools/Helpers/TranslationHelper";

export default function Events() {
    const {t} = useTranslation();

    const title = t("pages.terms.title");

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
                    <li className="breadcrumb-item active" aria-current="page">
                        {title}
                    </li>
                </ol>
            </nav>

            <ContentHeading>
                {title}
            </ContentHeading>

            <ContentBox/>
        </Content>
    )
}

export const getStaticProps = StaticProps.default();
