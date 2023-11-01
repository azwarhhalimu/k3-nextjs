import LoadingTable from "@/componen/LoadingTable";
import NoData from "@/componen/NoData";
import tokenCreate from "@/componen/tokenCreate";
import MenuAktif from "@/utils/MenuAktif";
import { baseUrl } from "@/utils/config";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";
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
    const [loading, setLoading] = useState<boolean>(false);
    const _getData = () => {
        setLoading(true);
        axios.get(baseUrl("admin/tips"), {
            headers: {
                Authorization: tokenCreate(),
            }
        })
            .then((respon: AxiosResponse<any, any>) => {
                if (respon.data.status != "not_authorization") {
                    setData(respon.data.data);
                    setLoading(false);
                }
                else {
                    alert("Token tidak benar")
                    router.push("/login.html");
                }
            })
    }
    const _deleteData = (id: string) => {
        const confirm: boolean = window.confirm("Apakah anda ingin menghapus data ini ?");
        if (confirm)
            axios.delete(baseUrl("admin/tips/" + id), {
                headers: {
                    Authorization: tokenCreate(),
                }
            })
                .then((respon: AxiosResponse<any, any>) => {
                    if (respon.data.status != "not_authorization") {
                        if (respon.data.status == "data_deleted") {
                            alert("Data terhapus");
                            setReload(reload + 1);
                        }
                    }
                    else {
                        alert("Token tidak benar")
                        router.push("/login.html");
                    }
                })
    }
    useEffect(() => {
        _getData();
    }, [reload])
    return (<>
        <Head>
            <title>Tips Keselamatan</title>
        </Head>
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
                    {loading && data.length == 0 ? <LoadingTable baris={10} kolom={3} /> : data.map((list, index) => (
                        <tr key={`dfa${index}`}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {list.judul}
                            </td>

                            <td style={{ textAlign: "right" }} width={"200px"}>
                                <button onClick={() => {
                                    router.push("/tips/" + list.id_tips + "/edit-tips.html");
                                }} className="btn btn-warning btn sm">Edit</button>
                                {" "}
                                <button onClick={() => {
                                    _deleteData(list.id_tips)
                                }} className="btn btn-danger btn sm">Hapus</button>
                            </td>
                        </tr>
                    ))}


                </tbody>
            </table>
            {(data.length == 0 && !loading) && <NoData pesan={"Data masih kosong"} />}
        </div>

    </>);
}

export default Tips;