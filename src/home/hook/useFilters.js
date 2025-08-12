import { useState, useCallback } from "react"

export const useFilters = () => {
  console.log("hook perso rendu")

    const [filters, setFilters] = useState({motsCles: null, idVilleSelectionne: null, idFonction: null, idSecteur: null, typesOffre: [], minAnneeExpMin: null})

    const updateFilters = useCallback(
      (key, value) => {
        setFilters((prev) => ({...prev, [key]: value}))
      },
      [],
    )

    return {filters, updateFilters}

} 