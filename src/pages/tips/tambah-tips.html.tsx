import { baseUrl } from '@/utils/config';
import { Editor } from '@tinymce/tinymce-react';
import axios, { Axios, AxiosResponse } from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import router from 'next/router';
import queryString from 'query-string';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
const Tambah_tips: React.FC = () => {
    const [judul, setJudul] = useState<string>("");
    const [deskripsi, setDeskripsi] = useState<string>("");
    const _saveData = (e: FormEvent) => {
        e.preventDefault();
        const formData: FormData = new FormData();

        axios.post(baseUrl("admin/tips"),
            queryString.stringify({
                judul: judul,
                deskripsi: editorRef.current.getContent(),
            })

        ).then((respon: AxiosResponse<any, any>) => {
            if (respon.data.status == "sukses") {
                alert("Data tips berhasil di simpan");
                router.push("/tips.html");
            }
        })

    }
    const editorRef = useRef<any>(null);

    return (<>
        <Head>
            <title>Tambah Data Tips</title>
        </Head>
        <div className="az-content-breadcrumb">
            <span><Link href="/">Dashboard</Link></span>
            <span><Link href="/">Tips</Link></span>

            <span>Tambah Tips</span>
        </div>
        <div>
            <button
                onClick={() => {
                    router.push("/tips.html")
                }}
                className="btn btn-danger">Kembali</button>
        </div>
        <br />
        <h2 className="az-content-title">Tambah Data Tips</h2>
        <div className='row'>
            <div className='col-6' style={{ margin: "auto" }}>
                <form onSubmit={_saveData}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Judul Tips</label>
                        <input onChange={(e) => {
                            setJudul(e.target.value);
                        }} required type="text" placeholder='Contoh : Tips Menggunakan Helm' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">Masukkan judul tips.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Keterangan</label>
                        <Editor
                            apiKey="vey2226sscpy44f23ngqtzej83xdwbmc0u7tyy2snygmddb8"
                            onInit={(evt, editor) => editorRef.current = editor}

                            initialValue=""
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

export default Tambah_tips;