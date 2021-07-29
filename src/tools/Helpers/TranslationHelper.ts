import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../../next-i18next.config";

export class StaticProps {
    static default() {
        return StaticProps.translations();
    }

    static translations(namespaces: string[] = ["common"]) {
        return async ({locale}: any) => ({
            props: {
                ...await serverSideTranslations(locale, namespaces, nextI18NextConfig),
            },
        } as any);
    }
}
