import { useMenu } from "@/utils/MenuContext";
import { session } from "@/utils/config";
import { ClassNames } from "@emotion/react";
import Link from "next/link";
import React from "react";
import router from 'next/router';

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
                <Link href="/" className="az-logo"><span /> k3 admin</Link>
                <Link href="#" id="azMenuShow" className="az-header-menu-icon d-lg-none"><span /></Link>
            </div>
            <div className="az-header-menu">
                <div className="az-header-menu-header">
                    <a href="/" className="az-logo"><span /> azia</a>
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
                        <Link href="/rambu-rambu.html" className="nav-link"><i className="typcn typcn-book" /> Rambu-rambu</Link>
                    </li>
                    <li className={""}>
                        <button onClick={() => {
                            const x: boolean = window.confirm("Apakah anda ingin menghapus data ini?");
                            if (x) {
                                window.localStorage.removeItem(session);
                                router.push("/login.html").catch((e) => {
                                    if (!e) {
                                        throw e
                                    }
                                });
                            }

                        }} className="nav-link btn-link btn"><i className="typcn typcn-export-outline" /> logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}

export default Header;