import { IHashtag } from "../../model/Hashtag";
import Hashtag from "./Hashtag";

interface Props {
    hashtags: IHashtag[]
}

export default function HashtagLine(props: Props) {
    return (
        <div>
            {
                props.hashtags.map((hashtag, i) => <Hashtag key={i} data={hashtag}/>)
            }
        </div>
    );
}
