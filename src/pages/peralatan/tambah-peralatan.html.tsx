import { Editor } from '@tinymce/tinymce-react';
import Link from "next/link";
import router from "next/router";
import { ChangeEvent, FormEvent, useRef, useState } from 'react';


import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '@/utils/config';


const Tambah_peralatan: React.FC = () => {
    const editorRef = useRef<any>(null);

    const [namaPeralatan, setNamaPeralatan] = useState<string>("");

    const [src, setSrc] = useState<any>();
    const [width, setWidth] = useState<any>();
    const [height, setHeight] = useState<any>();
    const [x, setX] = useState<any>();
    const [img, setImg] = useState<any>();
    const [y, setY] = useState<any>();


    const _save = (e: FormEvent) => {
        e.preventDefault();

        const formData: FormData = new FormData();
        formData.append("nama_peralatan", namaPeralatan);
        formData.append("deskripsi", editorRef.current.getContent());
        formData.append("x", x);
        formData.append("y", y);
        formData.append("width", width);
        formData.append("height", height);
        formData.append("foto", img);

        axios.post(baseUrl("admin/peralatan"),
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        ).then((respon: AxiosResponse<any, any>) => {
            if (respon.data.status == "data_saved") {
                alert("Data berhasil disimpan");
                router.push("/peralatan.html");
            }
        })
    }

    return (<><div>
        <div className="az-content-breadcrumb">
            <span><Link href="/">Dashboard</Link></span>
            <span><Link href="/peralatan.html">Peralatan</Link></span>

            <span>Tambah Data Peralantan Keselamatan Kerja</span>
        </div>
        <div>
            <button
                onClick={() => {
                    router.push("/peralatan.html")
                }}
                className="btn btn-primary ">Kembali</button>
        </div>
        <br />
        <h2 className="az-content-title">Tambah Data Pelatan Keselamatan Kerja</h2>
    </div>

        <div className="container">
            <div className="row">
                <div className="col-6">
                    <form onSubmit={_save}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Nama Peralatan</label>
                            <input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setNamaPeralatan(e.target.value)
                            }} type="text" placeholder="Misal Helm" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">Masukkan nama peralatan K3</div>
                        </div>
                        <Editor
                            apiKey="vey2226sscpy44f23ngqtzej83xdwbmc0u7tyy2snygmddb8"
                            onInit={(evt, editor) => editorRef.current = editor}

                            initialValue=""
                            init={{
                                height: 300,
                                menubar: false,
                                table_tab_navigation: true,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace table visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | table bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                        <div>Pilih Foto Peralatan</div>
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
                            // setCrop(true);
                        }}
                            accept="image/png, image/gif, image/jpeg"
                            type="file" required />
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                </div>
                <div className="col-6">
                    <Cropper
                        style={{ height: 400, width: "100%" }}
                        // zoomTo={0.5}
                        // initialAspectRatio={1}
                        // preview=".img-preview"
                        src={src}
                        modal={true}
                        viewMode={1}
                        aspectRatio={1 / 1}
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
                    />

                </div>
            </div>
        </div>
    </>);
}

export default Tambah_peralatan;