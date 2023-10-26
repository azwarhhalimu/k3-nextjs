
const NoData: React.FC<{ pesan: string }> = ({ pesan }) => (<>
    <center>
        <img style={{ width: "200px" }} src={"/no-data.jpg"} />
        <br />
        {pesan}
    </center>
</>)

export default NoData;