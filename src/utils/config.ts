const domain: string = "http://localhost:2000";
// const domain: string = "https://indry.azwarbuton.biz.id";
const baseUrl = (uri:string) :string => {
    return domain+"/"+uri;
}
const key_enc: any = process.env.NEXT_PUBLIC_KEY;

const session = "3dksx";
export { baseUrl, session, key_enc}
 