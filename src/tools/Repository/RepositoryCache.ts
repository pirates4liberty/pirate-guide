import { deepCopy } from "../Helpers/Tools";

export class RepositoryCache<T> {
    private cache?: T[];

    load(fetchFunction: () => T[]): T[] {
        return this.cache = deepCopy(fetchFunction());
    }

    clear() {
        this.cache = undefined;
    }
}
