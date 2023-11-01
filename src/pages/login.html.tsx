import Height from "@/componen/Height";
import { baseUrl, session } from "@/utils/config";
import { aesDenckripsi } from "@/utils/enkripsi";
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import Link from "next/link";
import { env } from "process";
import queryString from "query-string";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import router from 'next/router';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const _handle = (e: FormEvent) => {
        e.preventDefault();
        axios.post(baseUrl("auth/login"),
            queryString.stringify({
                username: username, password: password
            })
        )
            .then((respon: AxiosResponse<any, any>) => {
                if (respon.data.status == "login_sukses") {
                    window.localStorage.setItem(session, respon.data.data);
                    alert("Login berhasil");
                    router.push("/");
                }
                else {
                    alert("Username atau password tidak benar");
                }
            })

    }
    useEffect(() => {


    }, [])
    return (<>
        <Head>
            <title>Login</title>
        </Head>
        <Height height={30} />
        <div className="container">
            <div className="row">

                <div style={{ background: "#EBF6F6", margin: "auto", borderRadius: "20px", padding: "40px" }} className="col-lg-5">
                    <Box onSubmit={_handle} component="form" sx={{ mt: 1 }}>
                        <Height height={20} />
                        <h4>Sistim Informasi K3</h4>
                        <Height height={10} />
                        <h3>Login </h3>
                        <TextField
                            margin="normal"
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setUsername(e.target.value);
                            }}
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPassword(e.target.value);
                            }}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                    </Box>
                </div>
            </div>
        </div>
    </>);
}

export default Login;