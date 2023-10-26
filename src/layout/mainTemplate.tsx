import React, { ReactNode } from "react";
import Header from "./header";
import Footer from "./Footer";
import Height from "@/componen/Height";
import { createContext } from "react"
import { MenuProvider } from "@/utils/MenuContext";

interface props {
    children: ReactNode
}
const MainTemplate: React.FC<props> = ({ children }) => {
    return (<>

        <MenuProvider>
            <Header />
            <div className="container">
                <Height height={30} />
                <div className="row">
                    <div className="col-lg-12">
                        {children}
                    </div>

                </div>
            </div>
            <Footer />
        </MenuProvider>

    </>);
}

export default MainTemplate;