import { IHashtag } from "../../model/Hashtag";
import HashtagLine from "./HashtagLine";

interface Props {
    className?: string,
    hashtags: IHashtag[][]
}

export default function HashtagBox(props: Props) {
    return (
        <div className={props.className}>
            {
                props.hashtags.map((hashtagLine, i) => <HashtagLine hashtags={hashtagLine} key={i}/>)
            }
        </div>
    );
}
