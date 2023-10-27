import React from 'react';
import { Interface } from 'readline';

interface dataProps {
    baris: number,
    kolom: number
}
const LoadingTable: React.FC<dataProps> = ({ baris, kolom }) => {
    return (<>
        {[...Array(baris)].map((index) => (
            <tr key={"adf" + index}>
                {[...Array(kolom)].map((indexx) => (
                    <td key={indexx + "sdf"}>
                        <div style={{ width: "100%", height: "10px", background: "#EBF6F6" }}></div>
                    </td>
                ))}
            </tr>
        ))}
    </>);
}

export default LoadingTable;