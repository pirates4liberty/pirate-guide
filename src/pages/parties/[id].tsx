import { useTranslation } from "next-i18next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Content from "../../components/uni/Content/Content";
import ContentBox from "../../components/uni/Content/ContentBox";
import ContentHeading from "../../components/uni/Content/ContentHeading";
import PartiesContent from "../../components/PageParts/Parties/PartiesContent";
import PartiesLeftMenu from "../../components/PageParts/Parties/PartiesLeftMenu";
import { IPirateParty, PiratePartiesRepository } from "../../data/PirateParties";
import { StaticProps } from "../../tools/Helpers/TranslationHelper";

export default function Parties() {
    const {t} = useTranslation();
    const router = useRouter();
    const {id} = router.query;
    const repository = new PiratePartiesRepository();

    const party = repository.getAllRecursively().find(party => party.id === id);

    if (party === undefined) {
        return (
            <Content>
                <ContentBox>
                    {t("msg.notFound")}
                </ContentBox>
            </Content>
        )
    } else {
        const title = t(party.title);

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
                                <a>{t("pages.links.title")}</a>
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

                <div className={"row"}>
                    <PartiesLeftMenu data={party} className={"col-md-3"}></PartiesLeftMenu>
                    <PartiesContent data={party} className={"col-md-9"}></PartiesContent>
                </div>
            </Content>
        )
    }
}

export const getStaticProps = StaticProps.default();

function getPartiesIdsRecursively(parties: IPirateParty[]): any[] {
    let out: any[] = [];

    parties.forEach(party => {
        out.push(
            {
                params: {
                    id: party.id
                }
            }
        );

        if (party.children) {
            out = out.concat(out, getPartiesIdsRecursively(party.children));
        }
    });

    return out;
}

export const getStaticPaths = async () => {
    const repository = new PiratePartiesRepository();

    const ids = getPartiesIdsRecursively(repository.getAll(false, false));

    return {
        paths: ids,
        fallback: "blocking"
    }
}
