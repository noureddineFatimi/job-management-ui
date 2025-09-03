import {  Select, Checkbox, InputNumber } from "antd"
import Sider from "antd/es/layout/Sider"
import { memo, useCallback } from "react"


const Filter = memo(function Filter({secteurs, fonctions, setSearchQueryParams, searchQueryParams}) {
    console.log("filter rendu")

   /*  const handleOnChangeTypesOffres = (valeur) => {
      if (valeur.target.checked){
        updatePersoHook("typesOffre",[...typesOffre, valeur.target.value])
      }
      else {
        updatePersoHook("typesOffre", typesOffre.filter(v => v !==  valeur.target.value))
      }
    } */

       const handleOnChangeTypesOffres = (valeur) => {
        const params = new URLSearchParams(searchQueryParams)
        if (valeur.target.checked){
          params.append("typesOffre", valeur.target.value)
        }
        else {
          const oldTypesOffre = params.getAll("typesOffre")
          params.delete("typesOffre")
          oldTypesOffre.forEach(oldTypeOffre => {
            if (oldTypeOffre !== valeur.target.value) {
              params.append("typesOffre", oldTypeOffre)
            }
          });
        }
        params.set("page", 1)
        setSearchQueryParams(params)
      } 
      
    const handleResetClick = useCallback(() => {
        const params = new URLSearchParams(searchQueryParams)
        params.delete("idSecteur")
        params.delete("idFonction")
        params.delete("minAnneeExpMin")
        params.delete("typesOffre")
        setSearchQueryParams(params)
        /* setSearchQueryParams({...searchQueryParams,idSecteur:""})
        setSearchQueryParams({...searchQueryParams,idFonction:""})
        setSearchQueryParams({...searchQueryParams,minAnneeExpMin:""}) */
        //updatePersoHook('typesOffre', [])
        }, 
        [setSearchQueryParams]
      )

    
    return <Sider
  style={{
    background: "#fff",
    maxHeight: "calc(100vh - 160px)",
    overflowY: "auto",
    padding: "1rem",
    borderRadius: "15px",
    border: "1px solid #d9d9d9",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    position: "sticky",
    top: "100px", 
    transition: "all 0.3s ease-in-out",
    alignSelf: "start",
  }}
  width={300}
>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              <span>Filtre</span>
              <span
                className="reset"
                onClick={handleResetClick}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "15px",
                  fontWeight: "500",
                  fontFamily: "'Inter', 'Segoe UI', sans-serif",
                  color: "#7253ceff",
                }}
              >
                Réinitialiser
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1.5rem",
                gap: "0.5rem",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}
            >
              <span style={{ fontWeight: "450", fontSize: "17px" }}>Secteur d'activité</span>
              <Select
                id="secteurActiviteField"
                style={{ marginLeft: "0.8rem" }}
                value={searchQueryParams.get("idSecteur") ? parseInt(searchQueryParams.get("idSecteur")) : ""}
                showSearch
                optionFilterProp="label"
                defaultValue=""
                onChange = {(value) => {
                  const params = new URLSearchParams(searchQueryParams)
                    if (value) {
                      params.set("idSecteur", value); 
                    } else {
                      params.delete("idSecteur");    
                    }
                    params.set("page", 1)
                    setSearchQueryParams(params);
              }}
                options={[
                  {
                    value: "",
                    label: "Tous les secteurs",
                  },
                  ...secteurs.map(secteur =>(
                  {
                    value: secteur.id,
                    label: secteur.nom_secteur
                  }
                  ) 
                )
                ]}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1.5rem",
                gap: "0.5rem",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}
            >
              <span style={{ fontWeight: "450", fontSize: "17px" }}>Fonction</span>
              <Select
                style={{ marginLeft: "0.8rem" }}
                showSearch
                value={searchQueryParams.get("idFonction") ? parseInt(searchQueryParams.get("idFonction")) : ""}
                optionFilterProp="label"
                defaultValue=""
                onChange = {(value) => {
                  const params = new URLSearchParams(searchQueryParams)
                    if (value) {
                      params.set("idFonction", value); 
                    } else {
                      params.delete("idFonction");    
                    }
                    params.set("page", 1)
                    setSearchQueryParams(params);
              }}
                options={[
                  {
                    value: "",
                    label: "Tous les fonctions",
                  },
                  ...fonctions.map(fonction =>(
                  {
                    value: fonction.id,
                    label: fonction.nom_fonction
                  }
                  ) 
                )
                ]}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1.5rem",
                gap: "0.5rem",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}
            >
              <span style={{ fontWeight: "450", fontSize: "17px" }}>Type d'offre</span>
              <Checkbox style={{ marginLeft: "0.8rem" }} value="CDD" checked ={searchQueryParams.getAll("typesOffre").includes("CDD") }  onChange={handleOnChangeTypesOffres} >
                CDD
              </Checkbox>
              <Checkbox style={{ marginLeft: "0.8rem" }} value="CDI"  checked ={searchQueryParams.getAll("typesOffre").includes("CDI")}   onChange={handleOnChangeTypesOffres} >
                CDI
              </Checkbox>
              <Checkbox style={{ marginLeft: "0.8rem" }} value="Stage" checked ={searchQueryParams.getAll("typesOffre").includes("Stage")} onChange={handleOnChangeTypesOffres}  >
                Stage
              </Checkbox>
              <Checkbox style={{ marginLeft: "0.8rem" }} value="Intérim"  checked ={searchQueryParams.getAll("typesOffre").includes("Intérim")} onChange={handleOnChangeTypesOffres} >
                Intérim
              </Checkbox>
              <Checkbox style={{ marginLeft: "0.8rem" }} value="Freelance"  checked ={searchQueryParams.getAll("typesOffre").includes("Freelance")} onChange={handleOnChangeTypesOffres} >
                Freelance
              </Checkbox>
              <Checkbox style={{ marginLeft: "0.8rem" }} value="Autre contrat" checked ={searchQueryParams.getAll("typesOffre").includes("Autre contrat")}   onChange={handleOnChangeTypesOffres} >
                Autre
              </Checkbox>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1.5rem",
                gap: "0.5rem",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}
            >
              <span style={{ fontWeight: "450", fontSize: "17px" }}>Minimum d'années d'experience</span>
              <div style={{ marginLeft: "0.8rem" }}>
                <InputNumber placeholder="Maximum: 10 ans" min = {1} max={10} style={{ width: "100%" }} onChange = {(value) => {
                  const params = new URLSearchParams(searchQueryParams)
                    if (value) {
                      params.set("minAnneeExpMin", value); 
                    } else {
                      params.delete("minAnneeExpMin");    
                    }
                    params.set("page", 1)
                    setSearchQueryParams(params);
              }} value={searchQueryParams.get("minAnneeExpMin")}/>
              </div>
            </div>
          </Sider>
})

export default Filter