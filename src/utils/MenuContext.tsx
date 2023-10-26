import { ReactNode, createContext, useContext, useState } from "react"
import React from 'react';

interface menuType {
    menu: string,
    setMenu: (menu: string) => void
}
interface itProps {
    children: ReactNode,
}
const MenuContext = createContext<menuType | undefined>(undefined);
export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [menu, setMenu] = useState<string>("");
    return (<MenuContext.Provider value={{ menu, setMenu }}>
        {children}
    </MenuContext.Provider>)
}
export const useMenu = () => {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error('PROVIER TIDAK DI IZINKAN');
    }
    return context;
}
