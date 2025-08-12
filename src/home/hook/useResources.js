import { useCallback, useEffect, useState } from "react"
import instance from "../api/api"

export const useResources = () => {
    const [resources, setResources] = useState({villes:[], secteurs_activite: [], fonctions :[]})

    useEffect(() => {
      instance.get("offres/resources")
            .then(response => setResources(response.data))
            .catch(err => console.error(err))
    }, [])
    
    return {resources}

}