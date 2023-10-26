import NoData from "@/componen/NoData";
import MenuAktif from "@/utils/MenuAktif";
import { useMenu } from "@/utils/MenuContext";
import { baseUrl } from "@/utils/config";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

interface itData {
    no: number,
    id_pengertian: string,
    judul: string,
    isi: string,
    time_create: string,
}
const Pengertian: React.FC = () => {
    const [data, setData] = useState<itData[]>([]);
    const [reload, setReload] = useState<number>(0);
    const router: NextRouter = useRouter();
    const _getData = () => {
        axios.get(baseUrl("admin/pengertian"))
            .then((respon: AxiosResponse<any, any>) => {
                setData(respon.data.data);
            })
    }
    const _deleteData = (id: string) => {
        axios.delete(baseUrl("admin/pengertian/" + id))
            .then((respon: AxiosResponse<any, any>) => {
                if (respon.data.status == "deleted") {
                    alert("Derhasil di hapus");
                    setReload(reload + 1);
                }
            })

    }
    const { setMenu } = useMenu();
    useEffect(() => {
        _getData();

    }, [reload])
    return (<>
        <MenuAktif menu="pengertian" />
        <div>
            <div className="az-content-breadcrumb">
                <span><Link href="/">Dashboard</Link></span>

                <span>Pengertian</span>
            </div>
            <div>
                <button
                    onClick={() => {
                        router.push("/pengertian/tambah-pengertian.html")
                    }}
                    className="btn btn-primary float-right">Tambah Data</button>
            </div>
            <br />
            <h2 className="az-content-title">Data Pengertian</h2>

            <hr />
            <div style={{ width: "100%", background: "#FFFFFF" }}>
                <table className="table">
                    <thead>
                        <tr style={{ fontWeight: "bold" }}>
                            <td>No</td><td>Img</td><td>Judul</td><td>Isi</td><td>Tanggal Data</td><td width={"150px"}>Aksi</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((list, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <img

                                        style={{ width: "60px", borderRadius: "4px" }
                                        } src={baseUrl("images/pengertian?size=80&source=" + list.id_pengertian)} />
                                </td>
                                <td>{list.judul}</td>
                                <td dangerouslySetInnerHTML={{ __html: list.isi }}></td>
                                <td>{list.time_create}</td>
                                <td style={{ textAlign: "right" }}>
                                    <button onClick={() => {
                                        const x = confirm("Apakah anda ingin hapus data ini?");
                                        if (x) {
                                            _deleteData(list.id_pengertian);
                                        }

                                    }}>Hapus</button>{" "}
                                    <button>Edit</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                {data.length == 0 && <NoData pesan={"Data masih kosong"} />}
            </div>
        </div>
    </>);

}

export default Pengertian;