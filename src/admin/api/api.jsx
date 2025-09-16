import axios from "axios"

const instance = axios.create({baseURL: import.meta.env.VITE_API_BASE_URL})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
    return Promise.reject(error);
  }
);

export const uploadLogoToServer = async (logo) => {
    try {
      const response = await instance.post("entreprises/logo", logo)
      return {result:true, logo_id:response.data.id_fichier, status:response.status}
    } catch (error) {
      console.log(error)
      return {result:false, logo_id:null, status: error.response ? error.response.status : null}
    }
}

export const ressourcesAPI = async  () => {
    try {
        const ressources =  (await instance.get("offres/resources")).data
        return ressources
    } catch (err) {
        err => console.error(err)
    }
}

export const postOffre = async (data) => {
    try {
        const response = await instance.post("offres", data)
        console.log(response)
        return {result: true, status: response.status}
    } catch (error) {
        console.error(error)
        return {result: false, status: error.response ? error.response.status : null}
    }
}

export const myOffres = async () => {
   try {
        const response = await instance.get("offres/mes")
        return {result: true, status: response.status, offres: response.data}
    } catch (error) {
        return {result: false, status: error.response ? error.response.status : null, offres:null}
    }
}

export const logoEntreprise = async (logo_id) => {
  try {
    const response = await instance.get(`fichiers/${logo_id}`, { responseType: 'blob' })
    return {result: true, status: response.status, logo: URL.createObjectURL(response.data)}
  } catch (error) {
    console.log(error)
    return {result: false, status: error.response ? error.response.status : null, logo:null}
  }
}

export const deleteOffre = async (id) => {
  try {
    const response = await instance.delete(`offres/${id}`)
    return {result: true, status: response.status}
  } catch (error) {
    return {result: false, status: error.response ? error.response.status : null}
  }
}

export const getOffreToUpdate = async (id_offre) => {
  try {
    const response = await instance.get(`offres/${id_offre}`)
    return {result: true, status: response.status, offre: response.data}
  } catch (error) {
    return {result: false, status: error.response ? error.response.status : null, offre:null}
  }
}

export const deleteLogo = async (idEntreprise) => {
  try {
    const response = await instance.delete(`entreprises/${idEntreprise}/logo`)
    return {result: true, status: response.status}
  } catch (error) {
    return {result: false, status: error.response ? error.response.status : null}
  }
}

export const updateLogoEntreprise = async(idEntreprise, formData) => {
  try {
    const response = await instance.patch(`entreprises/${idEntreprise}/logo`, formData)
    console.log(response)
    return {result: true, status: response.status}
  } catch (error) {
    return {result: false, status: error.response ? error.response.status : null}
  }
}

export const updateOffre = async (id_offre, data) => {
    try {
        const response = await instance.patch(`offres/${id_offre}`, data)
        console.log(response)
        return {result: true, status: response.status}
    } catch (error) {
        console.error(error)
        return {result: false, status: error.response ? error.response.status : null}
    }
}

export const profil = async () => {
  try {
    const response = await instance.get("users/moi")
    return {result: true, status: response.status, user: response.data}
  } catch (error) {
    return {result: false, status: error.response ? error.response.status : null, user:null}
  }
}

export const updateProfil = async (data) => {
    try {
        const response = await instance.patch("users", data)
        console.log(response)
        return {result: true, status: response.status}
    } catch (error) {
        console.error(error)
        return {result: false, status: error.response ? error.response.status : null}
    }
}

export const deconnexion = async () => {
  try {
        const deconResult = await instance.delete("users/deconnexion")
        localStorage.removeItem("token")
        return {result: true, status: deconResult.status}
    } catch (error) {
        return {result: false, status: error.response ? error.response.status : null}
    }
}

export const getCandidatures = async(id_offre) => {
  try {
    const response = await instance.get(`offres/${id_offre}/applications`)
    return {result: true, status : response.status, applicationsList : response.data}
  } catch (error) {
    return {result: false, status: error.response ? error.response.status : null, applicationsList: null}
  }
}

export const cvCandidat = async (cv_id) => {
  try {
    const response = await instance.get(`fichiers/${cv_id}`, { responseType: 'blob' })
    console.log(response)
    return {result: true, status: response.status, cv: response.data}
  } catch (error) {
    console.log(error)
    return {result: false, status: error.response ? error.response.status : null, logo:null}
  }
}

export const deleteCompte = async () => {
  try {
    const response = await instance.delete("users")
    console.log(response)
    return {result: true, status: response.status, cv: response.data}
  } catch (error) {
    console.log(error)
    return {result: false, status: error.response ? error.response.status : null, logo:null}
  }
}

export const getStatistics = async() => {
  try {
    const response = await instance.get("offres/dashboard")
    return {result: true, status : response.status, statistics : response.data}
  } catch (error) {
    return {result: false, status: error.response ? error.response.status : null, statistics: null}
  }
}