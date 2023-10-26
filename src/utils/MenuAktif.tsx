import { useEffect } from "react";
import { useMenu } from "./MenuContext";

interface dataProps {
    menu: string,
}
const MenuAktif: React.FC<dataProps> = ({ menu }) => {
    const { setMenu } = useMenu();
    useEffect(() => {
        setMenu(menu)
    }, [])
    return (<></>);
}

export default MenuAktif;