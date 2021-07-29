import { i18n, useTranslation } from "next-i18next";
import Link from "next/link"
import { NextRouter, useRouter } from "next/router";
import React from "react";
import { MenuItemsRepository } from "../../data/MenuItems";

function onLangChange(lang: string, router: NextRouter) {
    i18n?.changeLanguage(lang);
    router.push(router.pathname, router.pathname, {locale: lang})
}

export default function Header() {
    const {t} = useTranslation();
    const router = useRouter();

    const menuItems = (new MenuItemsRepository()).getAll();

    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 mr-auto">
                        {
                            menuItems.map(menuItem => (
                                <li key={menuItem.title}>
                                    <Link href={menuItem.url || "#"}>
                                        <a className="nav-link px-2 text-white">
                                            {t(menuItem.title)}
                                        </a>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>

                    <div>
                        <div className="d-inline-block mt-1">
                            <select className="form-control" value={i18n?.language}
                                    onChange={(e) => onLangChange(e.target.value, router)}>
                                {["en", "cz"].map(lang => (
                                    <option key={lang} value={lang}>
                                        {lang.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
