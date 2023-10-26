import NoData from "@/componen/NoData";
import MenuAktif from "@/utils/MenuAktif";
import { baseUrl } from "@/utils/config";
import axios from "axios";
import { AxiosResponse } from "axios";
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
    const [reload, setReload] = useState<number>(0);
    const _getPeralatan = () => {
        axios.get(baseUrl("admin/peralatan"))
            .then((respon: AxiosResponse<any, any>) => {
                setData(respon.data.data);
            });
    }
    const _deletePeralatan = (id: string) => {
        const c: boolean = confirm("Apakah anda ingin menghapus data ini?")
        if (c) {
            axios.delete(baseUrl("admin/peralatan/" + id))
                .then((respon: AxiosResponse<any, any>) => {
                    if (respon.data.status == "data_terhapus") {
                        alert("Data berhasil di hapus");
                        setReload(reload + 1);

                    }
                })
        }
    }
    useEffect(() => {
        _getPeralatan();
    }, [reload])
    return (<>
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
                    {data.map((list, index) => (
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
                            <td dangerouslySetInnerHTML={{ __html: list.deskripsi }}></td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {data.length == 0 && <NoData pesan={"Data masih kosong"} />}
        </div>
    </>);
}

export default Peralatan;