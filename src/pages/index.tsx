import Head from 'next/head'

import { Inter } from 'next/font/google'
import MenuAktif from '@/utils/MenuAktif'
import CardDashboard from '@/componen/CardDashboard'
import Height from '@/componen/Height'
import axios, { AxiosResponse } from 'axios'
import { baseUrl, key_enc } from '@/utils/config'
import { useEffect, useState } from 'react'
import tokenCreate from '@/componen/tokenCreate'
import router from 'next/router';

const inter = Inter({ subsets: ['latin'] })
interface datax {

  dashboard: any,
  slide_show: any,
  pengertian: any,
  peralatan: any,
  tips: any,

}
export default function Home() {

  const token = tokenCreate();

  const [data, setData] = useState<datax>();
  const _getData = () => {
    axios.get(baseUrl("admin/dashboard"), {
      headers: {
        "Authorization": tokenCreate(),
      }
    })
      .then((respon: AxiosResponse<any, any>) => {
        if (respon.data.status != "not_authorization")
          setData(respon.data.data);
        else {
          alert("Token tidak benar")
          router.push("/login.html");
        }

      })
  }
  useEffect(() => {
    tokenCreate();
    _getData();
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MenuAktif menu="dashboard" />
      <h4>Dashboard</h4>
      <div className='row'>
        <div className='col-lg'>
          <CardDashboard
            icon={'typcn typcn-camera-outline'} background={'#1783FF'} title={'Slide Show'} sub_title={'Data'}
            value={data?.slide_show} />
        </div>
        <div className='col-lg'>
          <CardDashboard icon={'typcn typcn-book'}
            background={'#FF98F7'} title={'Data Pengertain'}
            sub_title={'Data'} value={data?.pengertian} />
        </div>
        <div className='col-lg'>
          <CardDashboard
            icon={'typcn typcn-cog-outline'}
            background={'#FF9D60'} title={'Data Peralatan'}
            sub_title={'Data'} value={data?.peralatan} />
        </div>
        <div className='col-lg'>
          <CardDashboard icon={'typcn typcn-flow-merge'}
            background={'#FCCA71'} title={'TIPS'}
            sub_title={'Data'} value={data?.tips} />
        </div>
      </div>


      <Height height={30} />
      <div style={{ minHeight: "50vh" }}>
        <div className='row'>
          <div className='col-lg-4'>
            <div style={{ background: "#FFF", borderRadius: "10px", padding: "10px", border: "2px solid #F0F8FA" }} className='card'>
              <div style={{ textAlign: "center" }} className='card-body'>
                <img style={{ width: "90px", borderRadius: "100%" }} src="/ff.jpg" />
                <Height height={10} />
                <div style={{ fontWeight: "bold" }}>Indry Informatika</div>
                <Height height={35} />
                <div>03 490 349</div>
                <div>Unversitas Dayanu Iksanuddin</div>
              </div>
            </div>
          </div>
          <div className='col-lg-8'>

          </div>
        </div>
      </div>

    </>
  )
}
