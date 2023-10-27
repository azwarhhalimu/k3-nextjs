import LoadingTable from "@/componen/LoadingTable";
import NoData from "@/componen/NoData";
import MenuAktif from "@/utils/MenuAktif";
import { baseUrl } from "@/utils/config";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";
interface data {
    id_slide_show: string,
    deskripsi: string
}
const Slide_banner: React.FC = () => {
    const [data, setData] = useState<data[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [reload, setReload] = useState<number>(0);
    const _getData = () => {
        setLoading(true);
        axios.get(baseUrl("admin/slide-show"))
            .then((respon: AxiosResponse<any, any>) => {
                setData(respon.data.data);
                setLoading(false);
            })
    }
    const _delete = (id: string) => {

        const confir: boolean = window.confirm("Apakah anda ingin hapus data ini ?");
        if (confir)
            axios.delete(baseUrl("admin/slide-show/" + id))
                .then((respon: AxiosResponse<any, any>) => {
                    if (respon.data.status == "data_deleted") {
                        window.alert("Data berhasil di hapus");
                        setReload(reload + 1);
                    }
                })
    }
    useEffect(() => { _getData() }, [reload])
    return (<>
        <MenuAktif menu="slide-show" />
        <div>
            <div className="az-content-breadcrumb">
                <span><Link href="/">Dashboard</Link></span>

                <span>Slide Show</span>
            </div>
            <div>
                <button
                    onClick={() => {
                        router.push("/slide-show/tambah-slide-show.html")
                    }}
                    className="btn btn-primary float-right">Tambah Data</button>
            </div>
            <br />
            <h2 className="az-content-title">Data  Slide show</h2>
            <table className="table">
                <thead>
                    <tr>
                        <td>No</td>
                        <td>Img</td>
                        <td>Keterangan</td>
                        <td>Opsi</td>
                    </tr>
                </thead>
                <tbody>
                    {(loading && data.length == 0) ? <LoadingTable baris={8} kolom={4} /> : data.map((list, index) => (
                        <tr key={`dfa${index}`}>
                            <td>{index + 1}</td>
                            <td>
                                <img style={{ width: "60px" }} src={baseUrl('images/slide-show?size=100&source=' + list.id_slide_show)} />
                            </td>
                            <td>{list.deskripsi}</td>
                            <td style={{ textAlign: "right" }}>
                                <button onClick={() => {
                                    _delete(list.id_slide_show);

                                }} className="btn btn-danger">Hapus</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {(data.length == 0 && !loading) && <NoData pesan="Data masih kosong" />}
        </div>
    </>);
}

export default Slide_banner;