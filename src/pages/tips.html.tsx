import MenuAktif from "@/utils/MenuAktif";
import { baseUrl } from "@/utils/config";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";

interface data {
    id_tips: string,
    judul: string,
    deskripsi: string
}
const Tips: React.FC = () => {
    const [data, setData] = useState<data[]>([]);
    const [reload, setReload] = useState<number>(0)
    const _getData = () => {
        axios.get(baseUrl("admin/tips"))
            .then((respon: AxiosResponse<any, any>) => {
                setData(respon.data.data);
            })
    }
    const _deleteData = (id: string) => {
        const confirm: boolean = window.confirm("Apakah anda ingin menghapus data ini ?");
        if (confirm)
            axios.delete(baseUrl("admin/tips/" + id))
                .then((respon: AxiosResponse<any, any>) => {
                    if (respon.data.status == "data_deleted") {
                        alert("Data terhapus");
                        setReload(reload + 1);
                    }
                })
    }
    useEffect(() => {
        _getData();
    }, [reload])
    return (<>
        <MenuAktif menu="tips" />
        <div className="az-content-breadcrumb">
            <span><Link href="/">Dashboard</Link></span>

            <span>Data Tips</span>
        </div>
        <div>
            <button
                onClick={() => {
                    router.push("/tips/tambah-tips.html")
                }}
                className="btn btn-primary float-right">Tambah Data</button>
        </div>
        <br />
        <h2 className="az-content-title">Data Tips Keselamatan & Kesehatan Kerja</h2>
        <hr />
        <div className="col-12">
            <table className="table">
                <thead>
                    <tr>
                        <td>
                            No
                        </td>
                        <td>
                            Judul
                        </td>

                        <td>
                            Aksi
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((list, index) => (
                        <tr>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {list.judul}
                            </td>

                            <td style={{ textAlign: "right" }} width={"200px"}>
                                <button className="btn btn-warning btn sm">Edit</button>
                                {" "}
                                <button onClick={() => {
                                    _deleteData(list.id_tips)
                                }} className="btn btn-danger btn sm">Hapus</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

    </>);
}

export default Tips;