import MenuAktif from "@/utils/MenuAktif";
import { baseUrl } from "@/utils/config";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import router from "next/router";
import React, { useEffect, useState } from "react";

interface data {
    id_rambu: string,
    nama_rambu: string,
    warna: string,
    deskripsi: string,
}
const Rambu_rambu: React.FC = () => {
    const [data, setData] = useState<data[]>([])
    const [reload, setReload] = useState<number>(0);
    const _getData = () => {
        axios.get(baseUrl("admin/rambu-rambu")).then((respon: AxiosResponse<any, any>) => {
            setData(respon.data.data);
        })
    }
    const _deleteData = (id: string) => {
        const confirm: boolean = window.confirm("Apakah anda ingin menghapus dat ini?");
        if (confirm)
            axios.delete(baseUrl("admin/rambu-rambu/" + id))
                .then((respon: AxiosResponse<any, any>) => {
                    if (respon.data.status == "data_terhapus") {
                        setReload(reload + 1);
                        alert("Data berhasil di hapus");
                    }
                })
    }
    useEffect(() => {
        _getData();
    }, [reload])
    return (<>

        <MenuAktif menu="rambu" />
        <div className="az-content-breadcrumb">
            <span><Link href="/">Dashboard</Link></span>

            <span>Rambu-rambu</span>
        </div>
        <div>
            <button
                onClick={() => {
                    router.push("/rambu-rambu/tambah-rambu-rambu.html")
                }}
                className="btn btn-primary float-right">Tambah Data</button>
        </div>
        <br />
        <h2 className="az-content-title">Data Pengertian</h2>
        <table className="table">
            <thead>
                <tr>
                    <td>No</td> <td>Img</td> <td>Judul</td> <td>Deskripsi</td><td>Aksi</td>
                </tr>
            </thead>
            <tbody>
                {data.map((list, index) => (
                    <tr key={`dfa${index}`}>
                        <td>{index + 1}</td>
                        <td>
                            <img style={{ width: "70px" }} src={baseUrl("images/rambu-rambu?size=100&source=" + list.id_rambu)} />
                        </td>
                        <td>{list.nama_rambu}</td> <td dangerouslySetInnerHTML={{ __html: list.deskripsi }}></td>
                        <td>
                            <button className="btn btn-warning">Edit</button>
                            {" "}
                            <button onClick={() => {
                                _deleteData(list.id_rambu)
                            }} className="btn btn-danger">Hapus</button>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    </>);
}

export default Rambu_rambu;