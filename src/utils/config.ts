// const domain: string = "http://localhost:2000";
const domain: string = "https://indry.azwarbuton.biz.id";
const baseUrl = (uri:string) :string => {
    return domain+"/"+uri;
}
 export  {baseUrl}