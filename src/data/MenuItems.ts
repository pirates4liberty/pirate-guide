import { useTranslation } from "next-i18next";
import { deepCopy } from "../tools/Helpers/Tools";
import { CachedRepository } from "../tools/Repository/CachedRepository";

export interface IMenuItem {
    title: string;
    url?: string;
    children?: IMenuItem[]
}

const data: IMenuItem[] = [
    {
        title: "pages.home.title",
        url: "/"
    }
];


export class MenuItemsRepository extends CachedRepository<IMenuItem> {

    protected processItem = (item: IMenuItem) => {
        const {t} = useTranslation();

        const copy = deepCopy(item);

        if (copy.title) {
            copy.title = t(copy.title);
        }

        return copy;
    }

    protected fetchAll() {
        return data;
    }
}
