import { useTranslation } from "next-i18next";
import { IPirateParty } from "../../../data/PirateParties";
import PartiesListButton from "./PartiesListButton";
import PartiesSubList from "./PartiesSubList";

type Props = {
    data?: IPirateParty[],
    className?: string
}

export default function PartiesList(props: Props) {
    const {t} = useTranslation();

    const parties = props.data || [] as IPirateParty[];

    return (
        <>
            {
                parties.map((party, i) => (
                        <div key={i}>
                            <div className={"row text-center"}>
                                <div className={"col-md-4"}/>
                                <div className={"col-md-4 p-2"}>
                                    <PartiesListButton data={party} key={i}/>
                                </div>
                            </div>

                            <PartiesSubList data={party.children}/>
                        </div>
                    )
                )
            }
        </>
    );
}
