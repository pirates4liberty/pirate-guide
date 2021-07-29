import { RepositoryCache } from "./RepositoryCache";

export abstract class CachedRepository<T> {
    private cache = new RepositoryCache<T>();
    private cacheOut = new RepositoryCache<T>();

    getAll(cache: boolean = true, process: boolean = true): T[] {
        if (cache === false) {
            this.clearCache();
        }

        if (process === false) {
            return this.cache.load(() => this.fetchAll());
        }

        return this.cacheOut.load(() => this.processAll());
    }

    getAllRecursively(
        cache: boolean = true,
        process: boolean = true,
        getChildren: (item: any) => T[] = (item: any) => {
            return item.children ?? [];
        },
        setParent: (item: any, parent: any) => void = (item: any, parent: any) => {
            item.parent = parent;
        }
    ) {
        const items = this.getAll(cache, process);

        return this.recursivelyGetWithChildren(items, getChildren, setParent);
    }

    private recursivelyGetWithChildren(
        items: T[],
        getChildren: (item: any) => T[],
        setParent: (item: any, parent: any) => void
    ) {
        let out: T[] = [];

        items.forEach((item) => {
            out.push(item);

            let children = getChildren(item);

            children.forEach(child => {
                setParent(child, item);
            })

            if (children.length) {
                out = out.concat(out, this.recursivelyGetWithChildren(children, getChildren, setParent));
            }
        })

        return out;
    }

    protected processItem: (item: T) => T = (item) => item;

    protected abstract fetchAll(): T[];

    protected clearCache() {
        this.cache.clear();
        this.cacheOut.clear();
    }

    private processAll(): T[] {
        const data = this.cache.load(() => this.fetchAll());

        return data.map((item) => {
            return this.processItem(item);
        });
    }
}
