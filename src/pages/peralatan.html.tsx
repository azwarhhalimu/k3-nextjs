import LoadingTable from "@/componen/LoadingTable";
import NoData from "@/componen/NoData";
import { StripTags } from "@/componen/StripTags";
import tokenCreate from "@/componen/tokenCreate";
import MenuAktif from "@/utils/MenuAktif";
import { baseUrl } from "@/utils/config";
import axios from "axios";
import { AxiosResponse } from "axios";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";

interface iData {
    id_peralatan: string,
    nama_peralatan: string
    deskripsi: string
}
const Peralatan: React.FC = () => {
    const [data, setData] = useState<iData[]>([]);
    const [selengkapnya, setSelengkapnya] = useState<string>("");
    const [reload, setReload] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const _getPeralatan = () => {
        setLoading(true);
        axios.get(baseUrl("admin/peralatan"), {
            headers: {
                Authorization: tokenCreate(),
            }
        })
            .then((respon: AxiosResponse<any, any>) => {
                if (respon.data.status != "not_authorization") {
                    if (respon.data.data.length > 0) {
                        setData(respon.data.data);
                    }
                    setLoading(false);

                }
                else {
                    alert("Token tidak benar")
                    router.push("/login.html");
                }

            }).catch((e) => {
                alert('Periksa Kembali Internet anda');
                const bo: boolean = window.confirm("Apakah anda ingin mencoba lagi?");
                if (bo) {
                    _getPeralatan();
                }

            });
    }
    const _deletePeralatan = (id: string) => {
        const c: boolean = confirm("Apakah anda ingin menghapus data ini?")
        if (c) {
            axios.delete(baseUrl("admin/peralatan/" + id), {
                headers: {
                    Authorization: tokenCreate(),
                }
            })
                .then((respon: AxiosResponse<any, any>) => {
                    if (respon.data.status != "not_authorization") {
                        if (respon.data.status == "data_terhapus") {
                            alert("Data berhasil di hapus");
                            setReload(reload + 1);
                        }
                    }

                    else {
                        alert("Token tidak benar")
                        router.push("/login.html");
                    }

                })
        }
    }
    useEffect(() => {
        _getPeralatan();
    }, [reload])
    return (<>
        <Head><title>Peralatan</title></Head>
        <MenuAktif menu="peralatan" />
        <div>
            <div className="az-content-breadcrumb">
                <span><Link href="/">Dashboard</Link></span>

                <span>Data Peralantan Keselamatan Kerja</span>
            </div>
            <div>
                <button
                    onClick={() => {
                        router.push("/peralatan/tambah-peralatan.html")
                    }}
                    className="btn btn-primary float-right">Tambah Data</button>
            </div>
            <br />
            <h2 className="az-content-title">Data Pelatan Keselamatan Kerja</h2>
        </div>
        <div>
            <table className="table ">
                <thead>
                    <tr>
                        <td>
                            Opsi
                        </td>
                        <td>No</td>
                        <td>Gambar</td>
                        <td>Nama Peralatan</td>
                        <td>Penjelasan  Singkat</td>

                    </tr>
                </thead>
                <tbody>
                    {(loading && data.length == 0) ? <LoadingTable baris={10} kolom={5} /> : data.map((list, index) => (
                        <tr key={`dfda${index}`}>
                            <td>
                                <button>Edit</button>
                                {" "}
                                <button onClick={() => {
                                    _deletePeralatan(list.id_peralatan)
                                }}>Hapus</button>
                            </td>
                            <td>{index + 1}</td>
                            <td>
                                <img style={{ width: "60px", borderRadius: "4px" }} src={baseUrl(`images/peralatan?size=100&source=${list.id_peralatan}`)} />
                            </td>
                            <td>{list.nama_peralatan}</td>
                            <td ><span dangerouslySetInnerHTML={{ __html: selengkapnya == list.id_peralatan ? list.deskripsi : StripTags(list.deskripsi).slice(0, 190) + "...." }}></span>
                                <button onClick={() => {
                                    setSelengkapnya(selengkapnya == list.id_peralatan ? "" : list.id_peralatan);
                                }} className="btn btn-link">{selengkapnya == list.id_peralatan ? "Tutup" : "Selengkapnya"}</button>

                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {(data.length == 0 && !loading) && <NoData pesan={"Data masih kosong"} />}
        </div>
    </>);
}

export default Peralatan;