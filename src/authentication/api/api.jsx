import axios from "axios"

const instance = axios.create({baseURL: import.meta.env.VITE_API_BASE_URL})

export const loginAPI = async (values) => {
    try {
        const valuesURLEncoded = new URLSearchParams({username: values.username, password: values.password}).toString();
        const loginResult = await instance.post("token", valuesURLEncoded)
        localStorage.setItem("token", loginResult.data.access_token)
        return {resultat: true, msg: "success"}
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return {resultat:false, msg:"Mot de passe ou Email incorrect!"}
        }
        return {resultat: false, msg:"Une erreur est survenue, veuillez ressayez plus tard!"}
    }
}

export const signUpAPI = async (informations) => {
   try {
    await instance.post("users", informations)
    return {resultat:true, msg: "succes"}
   } catch (error) {
    if (error.response && error.response.status === 400) {
            return {resultat:false, msg:"Email déjà utlisé!"}
        }
        return {resultat: false, msg:"Une erreur est survenue, veuillez ressayez plus tard!"}
   }
}