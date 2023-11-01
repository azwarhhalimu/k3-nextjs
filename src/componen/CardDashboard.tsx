import React from "react";


interface dataProps {
    icon: string,
    background: string,
    title: string,
    sub_title: string,
    value: string,
}
const CardDashboard: React.FC<dataProps> = (props) => {
    return (
        <div style={{ background: props.background, color: "white", padding: "10px", borderRadius: "5px" }}>
            <table width={"100%"}>
                <tbody>
                    <tr>
                        <td width={"50px"}>
                            <i style={{ fontSize: "50px" }} className={props.icon} />
                        </td>
                        <td >
                            <div style={{ textAlign: "right" }}>
                                {props.title}
                            </div>
                            <div style={{ textAlign: "right", fontSize: "26px", fontWeight: "bold" }}>
                                {props.value} <span style={{ fontSize: "11px" }}>{props.sub_title}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CardDashboard;