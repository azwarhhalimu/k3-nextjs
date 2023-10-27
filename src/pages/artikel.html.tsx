import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '@/utils/config';
import NoData from '@/componen/NoData';
import { useMenu } from '@/utils/MenuContext';
import MenuAktif from '@/utils/MenuAktif';
import LoadingTable from '@/componen/LoadingTable';
interface data {
    id_artikel: string,
    judul: string,
    tanggal_post: string,
    post_by: string
}
const Artikel: React.FC = () => {
    const [data, setData] = useState<data[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [reload, setReload] = useState<number>(0)
    const router: NextRouter = useRouter();
    const _getData = () => {
        setLoading(true);
        axios.get(baseUrl("admin/artikel"))

            .then((respon: AxiosResponse<any, any>) => {
                setData(respon.data.data);
                setLoading(false);

            })
    }
    const _deleteData = (id: string) => {
        const x = window.confirm("Apakah anda ingin menghapus data ini?");
        if (x)
            axios.delete(baseUrl("admin/artikel/" + id))
                .then((respon: AxiosResponse<any, any>) => {
                    if (respon.data.status == "data_terhapus") {
                        alert("Data terhaspu")
                        setReload(reload + 1);
                    }
                })
    }
    const { setMenu } = useMenu();
    useEffect(() => {
        _getData();

    }, [reload])
    return (<>
        <MenuAktif menu="artikel" />
        <div className="az-content-breadcrumb">
            <span><Link href="/">Dashboard</Link></span>

            <span>Artikel</span>
        </div>
        <div>
            <button
                onClick={() => {
                    router.push("/artikel/tambah-artikel.html")
                }}
                className="btn btn-primary float-right">Tambah Data</button>
        </div>
        <br />
        <h2 className="az-content-title">Data Pengertian</h2>

        <hr />
        <div>
            <table className='table'>
                <thead>
                    <tr style={{ fontWeight: "bold", color: "blue !importent" }}>
                        <td>No</td>
                        <td></td>
                        <td>Judul</td>
                        <td>Tanggal Post</td>
                        <td>Post By</td>
                    </tr>
                </thead>
                <tbody>
                    {(loading && data.length == 0) ? <LoadingTable baris={10} kolom={6} /> : data.map((list, index) => (
                        <tr key={index + "df"}>
                            <td>{index + 1}</td>
                            <td>
                                <img style={{ width: "100px", borderRadius: "5px" }} src={baseUrl(`images/artikel?source=${list.id_artikel}&size=200`)} />
                            </td>
                            <td>{list.judul}</td>
                            <td>{list.tanggal_post}

                            </td>
                            <td>{list.post_by}
                                <div style={{ textAlign: "right" }}>
                                    <button className='btn btn-warning btn-sm'>Edit </button>
                                    {" "}
                                    <button onClick={(e) => {
                                        _deleteData(list.id_artikel);
                                    }} className='btn btn-danger btn-sm'>Hapus</button>
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {(data.length == 0 && !loading) && <NoData pesan={'Data masih kosong'} />}
        </div>
    </>);
}

export default Artikel;