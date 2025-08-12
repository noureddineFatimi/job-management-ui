import { Layout } from "antd"
import { Card, Flex } from "antd"
import { useState, useEffect, useCallback, useRef} from "react"
import "../assets/home.css"
import instance from "../api/api"
import JobsSearch from "../components/job/jobsSearch"
import { useResources } from "../hook/useResources"
import { useFilters } from "../hook/useFilters"
import Footer from "../components/layout/footer"
import Header from "../components/layout/header"
import Hero from '../components/layout/hero'
import SearchBar from "../components/search/searchBar"
import Filter from "../components/search/filter"
import Pagination from "../components/job/pagination"

const { Content } = Layout;

const Home = () => {
  console.log("home rendu")

  const offresRef = useRef(null)

  const {filters, updateFilters} = useFilters()
  
  const {resources} = useResources()

  const [offres, setOffres] = useState([])
  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const limit = 10

  const handleRechercher = useCallback((page) => {
      const offset = (page - 1) * limit
      instance.get("offres/search", {
        params:
        {
          mot_cle: filters.motsCles,
          secteur_activite_id: filters.idSecteur,
          fonction_id: filters.idFonction,
          ville_id: filters.idVilleSelectionne,
          annees_experience_min: filters.minAnneeExpMin, 
          types_offre: filters.typesOffre,
          limit: limit,
          offset: offset
      },
      paramsSerializer: {
        indexes: null
      }
      }).then(response => {
        setOffres(response.data.offres)
        setTotal(response.data.total)
      })
      .catch(e => console.error("Erreur:" + e))
      .finally(() => setLoading(false))
    },
    [filters, limit]
  )

    useEffect(() => {
      handleRechercher(currentPage)
    }, [currentPage])
    
  const handleResetClick = useCallback(() => {
    updateFilters("idSecteur", null)
    updateFilters("idFonction", null)
    updateFilters("minAnneeExpMin", null)
    updateFilters('typesOffre', [])
    }, 
    [updateFilters]
  )

  const scroll = useCallback(
    () => {
      offresRef.current.scrollIntoView({ behavior: "smooth" })
    },
    [],
  )
  

  return (
    <Layout style={{ background: "#fff" }}>
      <Header/>
      <div ref={offresRef}>
     <Hero/>
      <SearchBar onChangeLoading ={setLoading} villes={resources.villes} onChangeMotCle={updateFilters} onChangeVille={updateFilters} handleSearch={handleRechercher} setCurrentPageToFirstPage={setCurrentPage} scroll= {scroll}/>
      
      <div style={{ padding: "0 48px" }}>
        
        <Layout style={{ padding: "24px 0", background: "#fff", gap: "2rem" }}>
          <Content style={{ padding: "0 24px", minHeight: 280, background: "#fff" }}>
            <div style={{ marginBottom: "1rem" }}>Résultats ({total})</div>
            <Flex gap="middle" align="start" vertical>
                {loading ? Array.from({ length: 10 }).map((_, index) => (<Card key={`skeleton-${index}`} loading={true} style={{ minWidth: 300, width: "100%" }} />)) : <JobsSearch offres={offres} loading={loading}/> }
            </Flex>
          </Content>
          <Filter secteurs={resources.secteurs_activite} fonctions={resources.fonctions} idSecteur={filters.idSecteur} idFonction={filters.idFonction} typesOffre={filters.typesOffre} onChangeFontion={updateFilters} onChangeTypesOffre={updateFilters} onChangeMotCle={updateFilters} onChangeSecteur={updateFilters} onChangeMinAnnExp={updateFilters} minAnneeExpMin={filters.minAnneeExpMin} handleResetClick= {handleResetClick}/>
        </Layout>
        
        <Pagination onChangeCurrentPage={setCurrentPage} onChangeLoading={setLoading} scroll={scroll} total={total} limit={limit} currentPage={currentPage} />
      </div>
      <Footer/>
      </div>
    </Layout>
  )
}

export default Home
