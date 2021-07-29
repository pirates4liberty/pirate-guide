import { i18n } from "next-i18next";

export interface ITranslatableString {
    lang: string;
    value: string;
}

export function translateArray<T extends ITranslatableString>(items: T[]): string {
    const lang = i18n?.language;

    if (lang) {
        const found = items.find(item => item.lang === i18n?.language);

        if (found) {
            return found.value;
        } else if (items[0]?.value) {
            return items[0].value;
        }
    }

    return "";
}
