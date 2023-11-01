import Link from "next/link";
import { useRouter } from "next/router";
import { Editor } from '@tinymce/tinymce-react';
import { ChangeEvent, EventHandler, FormEvent, useEffect, useRef, useState } from "react";
import Height from "@/componen/Height";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import axios from "axios";
import { baseUrl } from "@/utils/config";
import { AxiosResponse } from "axios";
import Head from "next/head";
import MenuAktif from "@/utils/MenuAktif";
import tokenCreate from "@/componen/tokenCreate";


const Edit_artikel: React.FC = () => {
    const editorRef = useRef<any>(null);

    const [src, setSrc] = useState<any>();
    const [width, setWidth] = useState<any>();
    const [height, setHeight] = useState<any>();
    const [x, setX] = useState<any>();
    const [img, setImg] = useState<any>();
    const [y, setY] = useState<any>();
    const [judul, setJudul] = useState<string>("");
    const [post_by, setPost_by] = useState<string>("");

    const router = useRouter();


    const _saveArtikel = (e: FormEvent) => {

        e.preventDefault();
        const formData: FormData = new FormData();
        formData.append("id_artikel", dataUrl[2]);
        formData.append("judul", judul);
        formData.append("post_by", post_by);
        formData.append("isi", editorRef.current.getContent());
        formData.append("foto", img);
        formData.append("x", x);
        formData.append("y", y);
        formData.append("width", width);
        formData.append("height", height);

        axios.post(baseUrl("admin/artikel"), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": tokenCreate(),
            }
        }).then
            ((respon: AxiosResponse<any, any>) => {

                if (respon.data.status != "not_authorization") {
                    if (respon.data.status == "data_saved") {
                        if (respon.data.status == "data_saved") {
                            alert("Data berhasil di simpan");
                            router.push("/artikel.html")
                        }
                    }
                }
                else {
                    alert("Token tidak benar")
                    router.push("/login.html");
                }


            });
    }

    const dataUrl: string[] | [] = typeof window !== "undefined" ? window.location.pathname.split("/") : [];


    const [deskripsi, setDeskripsi] = useState("");
    const getData = () => {

        axios.get(baseUrl("admin/artikel/" + dataUrl[2]), {
            headers: {
                "Authorization": tokenCreate()
            }
        })
            .then((respon: AxiosResponse<any, any>) => {
                if (respon.data.status != "not_authorization") {
                    setJudul(respon.data.data.judul);
                    setPost_by(respon.data.data.post_by);
                    setDeskripsi(respon.data.data.isi);
                }
                else {
                    alert("Token tidak benar")
                    router.push("/login.html");
                }


            })
    }
    useEffect(() => {
        getData();
    }, []);
    return (<>
        <MenuAktif menu="aritkel" />
        <Head>
            <title>Edit Artikel</title>
        </Head>
        <div className="az-content-breadcrumb">
            <span><Link href="/">Dashboard</Link></span>

            <span>Artikel</span>
        </div>
        <div>

        </div>
        <br />
        <button
            onClick={() => {
                router.push("/artikel.html")
            }}
            className="btn btn-danger ">Kembali</button>
        <h2 className="az-content-title">Edit Artikel</h2>
        <div className="row">
            <div className="col-7">
                <form onSubmit={_saveArtikel}>
                    <div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Judul Artikel</label>
                            <input value={judul} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setJudul(e.target.value)
                            }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Contoh : Aturan Pemerintah tentang Ketenaga kerjaan" />
                            <small id="emailHelp" className="form-text text-muted">Masukkan judul artike bertema keselamatan kerja</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Post By</label>
                            <input value={post_by} required onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPost_by(e.target.value)
                            }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Misal : Jhon Die" />
                            <small id="emailHelp" className="form-text text-muted">Nama pemosting</small>
                        </div>
                        Isi Berita
                        <Editor
                            apiKey="vey2226sscpy44f23ngqtzej83xdwbmc0u7tyy2snygmddb8"
                            onInit={(evt, editor) => editorRef.current = editor}

                            initialValue={deskripsi}
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
                        <Height height={20} />

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
                            type="file" />
                        <Height height={50} />
                        <button type="submit" className="btn btn-primary">Simpan</button>

                        <Height height={40} />
                    </div>

                </form>
            </div>
            <div className="col-5">
                <Cropper
                    style={{ height: 400, width: "100%" }}
                    // zoomTo={0.5}
                    // initialAspectRatio={1}
                    // preview=".img-preview"
                    src={src}
                    modal={true}
                    viewMode={1}
                    aspectRatio={2 / 1.3}
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
    </>);
}

export default Edit_artikel;