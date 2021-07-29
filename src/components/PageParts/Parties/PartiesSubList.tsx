import { IPirateParty } from "../../../data/PirateParties";
import PartiesListButton from "./PartiesListButton";

type Props = {
    data?: IPirateParty[],
    className?: string
}

export default function PartiesSubList(props: Props) {
    const parties = props.data || [] as IPirateParty[];

    return (
        <div className={"row"}>
            {
                parties.map((party, i) => (
                    <div className={"col-md-4 p-2"} key={i}>
                        <PartiesListButton data={party}></PartiesListButton>
                    </div>
                ))
            }
        </div>
    );

}
