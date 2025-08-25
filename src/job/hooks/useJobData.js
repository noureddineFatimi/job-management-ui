import { useState } from "react"
import instance from "../api/api"
import { useEffect } from "react"

export const useJobData = (idOffre, onChangeLoading) => {

    const [data, setData] = useState({data: {}, logo: null})
  const [error, setError] = useState(null)
    const getOffre = async (idOffre) => {
    try {
      const data = (await instance.get(`offres/${idOffre}`)).data
      return data
    } catch (error) {
      if (error.response && error.response.status === 404) {
      throw new Error("not_found") 
    }
    throw error
    }
    }

    const getLogo = async (id_fichier) => {
        try {
        const response = await instance.get(`fichiers/${id_fichier}`, { responseType: 'blob' });
        return URL.createObjectURL(response.data);
        } catch (error) {
        console.error(error)
        }
    }

     useEffect(() => {
        const fetchData = async () => {
          try {
        const offre = await getOffre(idOffre)
        setData(prev => ({...prev, data: offre}))
        const logo = await getLogo(offre.entreprise.logo.id)
        setData(prev => ({...prev, logo: logo}))
        onChangeLoading(false)
        } catch (err) {
           if (err.message === "not_found") {
          setError("not_found")
        } else {
          setError("Une erreur est survenue")
        }
        }
        }
        fetchData()
    }, [])

    return {data,error}

}