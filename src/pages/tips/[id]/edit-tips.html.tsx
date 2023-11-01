import tokenCreate from '@/componen/tokenCreate';
import { baseUrl } from '@/utils/config';
import { Editor } from '@tinymce/tinymce-react';
import axios, { Axios, AxiosResponse } from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import router from 'next/router';
import queryString from 'query-string';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
const Edit_tips: React.FC = () => {
    const [judul, setJudul] = useState<string>("");
    const [deskripsi, setDeskripsi] = useState<string>("");
    const _saveData = (e: FormEvent) => {
        e.preventDefault();
        const formData: FormData = new FormData();

        axios.post(baseUrl("admin/tips"),
            queryString.stringify({
                id_tips: data_url[2],
                judul: judul,
                deskripsi: editorRef.current.getContent(),
            }),
            {
                headers: {
                    "Authorization": tokenCreate(),
                }
            }
        ).then((respon: AxiosResponse<any, any>) => {
            if (respon.data.status != "not_authorization") {
                if (respon.data.status == "sukses") {
                    alert("Data tips berhasil di simpan");
                    router.push("/tips.html");
                }
            }
            else {
                alert("Token tidak benar")
                router.push("/login.html");
            }

        })

    }
    const editorRef = useRef<any>(null);
    const data_url: string[] | [] = typeof window !== "undefined" ? window.location.pathname.split("/") : [];
    const getDAta = () => {
        axios.get(baseUrl("admin/tips/" + data_url[2]), {
            headers: {
                Authorization: tokenCreate(),
            }
        })
            .then((respon: AxiosResponse<any, any>) => {
                if (respon.data.status != "not_authorization") {
                    if (respon.data.status != "not_authorization") {
                        setJudul(respon.data.data.judul);
                        setDeskripsi(respon.data.data.deskripsi);
                    }
                    else {
                        alert("Token tidak benar")
                        router.push("/login.html");
                    }


                }
                else {
                    alert("Token tidak benar")
                    router.push("/login.html");
                }

            })
    }
    useEffect(() => {
        getDAta();
    }, [])

    return (<>
        <Head>
            <title>Tambah Data Tips</title>
        </Head>
        <div className="az-content-breadcrumb">
            <span><Link href="/">Dashboard</Link></span>
            <span><Link href="/">Tips</Link></span>

            <span>Edit Tips</span>
        </div>
        <div>
            <button
                onClick={() => {
                    router.push("/tips.html")
                }}
                className="btn btn-danger">Kembali</button>
        </div>
        <br />
        <h2 className="az-content-title">Edit Data Tips</h2>
        <div className='row'>
            <div className='col-6' style={{ margin: "auto" }}>
                <form onSubmit={_saveData}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Judul Tips</label>
                        <input value={judul} onChange={(e) => {
                            setJudul(e.target.value);
                        }} required type="text" placeholder='Contoh : Tips Menggunakan Helm' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">Masukkan judul tips.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Keterangan</label>
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
                        <div id="emailHelp" className="form-text">Masukkan penjelas.</div>
                    </div>
                    <button type="submit" className="btn btn-primary">Simpan</button>
                </form>

            </div>
        </div>
    </>);
}

export default Edit_tips;