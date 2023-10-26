import { useMenu } from "@/utils/MenuContext";
import { ClassNames } from "@emotion/react";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
    const { menu } = useMenu();
    const _menu = (aktifMenu: string): string => {
        if (aktifMenu == menu) {
            return "nav-item active";
        }
        return "nav-item";
    }
    return (<div className="az-header">
        <div className="container">
            <div className="az-header-left">
                <a href="index.html" className="az-logo"><span /> k3 admin</a>
                <a href="#" id="azMenuShow" className="az-header-menu-icon d-lg-none"><span /></a>
            </div>
            <div className="az-header-menu">
                <div className="az-header-menu-header">
                    <a href="index.html" className="az-logo"><span /> azia</a>
                    <a href="#" className="close">×</a>
                </div>
                <ul className="nav">
                    <li className={_menu("dashboard")}>
                        <Link href="/" className="nav-link"><i className="typcn typcn-chart-area-outline" /> Dashboard</Link>
                    </li>
                    <li className={_menu("slide-show")}>
                        <Link href={"/slide-banner.html"} className="nav-link"><i className="typcn typcn-image" />Slide Banner</Link>
                    </li>
                    <li className={_menu("pengertian")}>
                        <Link href={"/pengertian.html"} className="nav-link"><i className="typcn typcn-document" />Pengertian</Link>
                    </li>
                    <li className={_menu("artikel")}>
                        <Link href={"/artikel.html"} className="nav-link"><i className="typcn typcn-news" />Artikel Keselamatan</Link>
                    </li>
                    <li className={_menu("peralatan")}>
                        <Link href={"/peralatan.html"} className="nav-link"><i className="typcn typcn-spanner-outline" /> Peralatan</Link>
                    </li>
                    <li className={_menu("tips")}>
                        <Link href="/tips.html" className="nav-link"><i className="typcn typcn-chart-bar-outline" /> Tips</Link>
                    </li>
                    <li className={_menu("rambu")}>
                        <Link href="rambu-rambu.html" className="nav-link"><i className="typcn typcn-book" /> Rambu-rambu</Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}

export default Header;