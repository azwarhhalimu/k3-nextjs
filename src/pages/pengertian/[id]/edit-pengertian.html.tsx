import TextField from "@mui/material/TextField";
import Link from "next/link";
import router, { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Height from "@/componen/Height";

import { Editor } from '@tinymce/tinymce-react';
import axios, { AxiosResponse } from "axios";

import { baseUrl } from "@/utils/config";


import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { Context } from "vm";
import { off } from "process";
import tokenCreate from "@/componen/tokenCreate";

interface dataProps {
    id: string
}


interface dataRespon {
    id_pengertian: string, judul: string, isi: string
}


interface arLocation {
    data: string[],
}

const Edit_pengertian: React.FC<dataProps> = ({ id }) => {
    const router = useRouter();
    const c: string[] | [] = typeof window !== "undefined" ? window.location.pathname.split("/") : [];


    const [src, setSrc] = useState();
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [x, setX] = useState();
    const [img, setImg] = useState();
    const [y, setY] = useState();

    const [crop, setCrop] = useState(false);


    const [judul, setJudul] = useState<string>("");
    const [deskripsi, setDeskripsi] = useState<string>("");
    const [readyState, setReadyState] = useState<boolean>(false);
    const _handleForm = (e: FormEvent) => {
        e.preventDefault();
        const formdata: any = new FormData();
        formdata.append("judul", judul);
        formdata.append("id_pengertian", c[2]);
        formdata.append("isi", editorRef.current.getContent());
        formdata.append("foto", img);
        formdata.append("x", x);
        formdata.append("y", y);
        formdata.append("width", width);
        formdata.append("height", height);

        if (editorRef.current.getContent() == "") {
            alert("Keterangan harus di isi");
        }
        else


            axios.post(baseUrl("admin/pengertian"),
                formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": tokenCreate(),
                    }
                }
            ).then((respon: AxiosResponse<any, any>) => {
                if (respon.data.status == "sukses") {
                    alert("Data berhasil di simpan");
                    router.push("/pengertian.html");

                }
            })
    }
    const editorRef = useRef<any>(null);
    const log = () => {
        if (editorRef.current) {
            setDeskripsi(editorRef.current.getContent());
        }
    };



    const [dataMap, setDataMap] = useState<dataRespon>();
    const load_data = () => {
        axios.get(baseUrl("admin/pengertian/" + c[2]), {
            headers: {
                Authorization: tokenCreate(),
            }
        }).then(
            (respon: AxiosResponse<any, any>) => {
                if (respon.data.status != "not_authorization") {
                    setDataMap(respon.data.data);
                    setJudul(respon.data.data.judul);
                    setDeskripsi(respon.data.data.isi)
                }

                else {
                    alert("Token tidak benar")
                    router.push("/login.html");
                }

            }
        );
    }

    useEffect(() => {
        if (c[3] == "edit-pengertian.html") {
            load_data();
        }
    }, [])

    return (<>
        <div className="az-content-breadcrumb">
            <span><Link href="/">Dashboard</Link></span>
            <span><Link href="/pengertian.html">Pengertian</Link></span>

            <span>Tambah Pengertian</span>
        </div>
        <div>
            <button
                onClick={() => {
                    router.back();
                }}
                className="btn btn-danger">
                Kembali</button>
        </div>
        <br />
        <h2 className="az-content-title">Tambah Data Pengertian</h2>
        <div className="container-fluid">
            <div className="row">
                <div className="col-7">
                    <div>
                        <form onSubmit={_handleForm}>
                            <TextField
                                value={judul}
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setJudul(e.target.value);
                                }}
                                fullWidth helperText="Masukkan judul dari data di atas" label="Judul Data" variant="filled" />

                            <br />
                            <br />
                            Keterngan
                            <Editor
                                apiKey="vey2226sscpy44f23ngqtzej83xdwbmc0u7tyy2snygmddb8"
                                onInit={(evt, editor) => editorRef.current = editor}

                                initialValue={deskripsi}
                                init={{
                                    height: 200,
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
                                setCrop(true);
                            }}
                                accept="image/png, image/gif, image/jpeg"
                                type="file" />
                            <br />
                            <br />
                            <button className="btn btn-success">Simpan</button>
                        </form>




                    </div>
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
        </div>


    </>);
}

export default Edit_pengertian;