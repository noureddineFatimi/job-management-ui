import { useState } from "react"
import instance from "../api/api"
import { useEffect } from "react"

export const useJobData = (idOffre, onChangeLoading) => {

    const [data, setData] = useState({data: {}, logo: null})

    const getOffre = async (idOffre) => {
    try {
      const data = (await instance.get(`offres/${idOffre}`)).data
      return data
    } catch (error) {
      console.error(error)
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
        } catch (error) {
          console.error(error)
        }
        }
        fetchData()
    }, [])

    return {data}

}