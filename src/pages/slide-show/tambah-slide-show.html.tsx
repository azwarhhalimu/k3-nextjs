import MenuAktif from "@/utils/MenuAktif";
import Link from "next/link";
import router from "next/router";
import { FormEvent, useState } from "react";



import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Height from "@/componen/Height";
import axios, { AxiosResponse } from "axios";
import { baseUrl } from "@/utils/config";

const Tambah_slide_show: React.FC = () => {

    const [src, setSrc] = useState<any>();
    const [width, setWidth] = useState<any>();
    const [height, setHeight] = useState<any>();
    const [x, setX] = useState<any>();
    const [img, setImg] = useState<any>();
    const [y, setY] = useState<any>();

    const [crop, setCrop] = useState(false);

    const [deskripsi, setDeskripsi] = useState<string>("");

    const _simpan = (e: FormEvent) => {
        e.preventDefault();
        const formData: FormData = new FormData();
        formData.append("x", x);
        formData.append("y", y);
        formData.append("width", width);
        formData.append("height", height);
        formData.append("deskripsi", deskripsi);
        formData.append("foto", img);
        axios.post(baseUrl("admin/slide-show"), formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((respon: AxiosResponse<any, any>) => {
                if (respon.data.status == "data_saved") {
                    alert("Data berhasil disimpan");
                    router.push("/slide-banner.html");
                }
            })
    }
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
                        router.push("/slide-banner.html")
                    }}
                    className="btn btn-danger">Kembali</button>
            </div>
            <br />
            <h2 className="az-content-title">Data  Slide show</h2>
            <div>
                <form onSubmit={_simpan}>
                    {crop && <Cropper
                        style={{ height: 400, width: "100%" }}
                        // zoomTo={0.5}
                        // initialAspectRatio={1}
                        // preview=".img-preview"
                        src={src}
                        modal={true}
                        viewMode={1}
                        aspectRatio={2 / 1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        crop={(event: any) => {
                            setWidth(event.detail.width.toFixed(2));
                            setHeight(event.detail.height.toFixed(2));
                            setY(event.detail.y.toFixed(2));
                            setX(event.detail.x.toFixed(2));
                        }}
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        onInitialized={(instance) => {
                            // setCropper(instance);
                        }}
                        guides={true}
                    />}
                    <Height height={20} />
                    <label>Pilih Foto</label>
                    <Height height={1} />
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                        e.preventDefault();
                        let files: any;
                        if (e.target) {
                            files = e.target.files;
                        }
                        const reader: any = new FileReader();
                        reader.onload = () => {
                            setSrc(reader.result);
                        }

                        reader.readAsDataURL(files[0]);
                        setImg(files[0]);
                        setCrop(true);
                    }}
                        accept="image/png, image/gif, image/jpeg"
                        type="file" required />
                    <Height height={10} />
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Deksripsi</label>
                        <textarea onChange={(e) => { setDeskripsi(e.target.value) }} className="form-control" placeholder="Masukkan dskripsi dari slide show"></textarea>
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>

                    <br />
                    <br />
                    <button type="submit" className="btn btn-primary">Simpan</button>
                </form>

            </div>
        </div>
    </>);
}

export default Tambah_slide_show;