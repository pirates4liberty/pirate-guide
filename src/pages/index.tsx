import React from "react";
import { StaticProps } from "../tools/Helpers/TranslationHelper";
import Links from "./links";

export default function Home() {

    return (
        <Links/>
    )
}

export const getStaticProps = StaticProps.default();
