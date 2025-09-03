import { useState, useCallback } from "react"

export const useFilters = () => {
  console.log("hook perso rendu")

    const [filters, setFilters] = useState({motsCles: "", idVilleSelectionne: "", idFonction: "", idSecteur: "", typesOffre: [], minAnneeExpMin: ""})

    const updateFilters = useCallback(
      (key, value) => {
        setFilters((prev) => ({...prev, [key]: value}))
      },
      [],
    )

    return {filters, updateFilters}

} 