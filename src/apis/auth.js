import AxiosInstance from "./base"

const AuthApis = {
    login: ()=>{
        return AxiosInstance.post('/login')
    }
}

export default AuthApis