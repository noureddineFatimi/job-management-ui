import { Layout,message } from "antd"
import { Card, Flex } from "antd"
import { useState, useEffect, useCallback, useRef} from "react"
import "../assets/home.css"
import instance from "../api/api"
import JobsSearch from "../components/job/jobsSearch"
import { useResources } from "../hook/useResources"
//import { useFilters } from "../hook/useFilters copy"
import Footer from "../components/layout/footer"
import Header from "../components/layout/header"
import Hero from '../components/layout/hero'
import SearchBar from "../components/search/searchBar copy"
import Filter from "../components/search/filter copy"
import Pagination from "../components/job/pagination copy"
import websitelogo from "../../assets/images/websitelogo.png"
import { useSearchParams } from "react-router-dom"

const { Content } = Layout;

const Home = () => {

  
  console.log("home rendu")

  const [errorMessage, contextHolder] = message.useMessage()

   const handleEntrerClick = (e) => {
    if(e.key === "Enter") {
      handleRechercher(1)
      scroll()
    }
  }

  //const {filters, updateFilters} = useFilters()
  
  const {resources} = useResources()

  const [offres, setOffres] = useState([])
  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(true)

  //const [currentPage, setCurrentPage] = useState({currentPage: 1, tick: 0})
  const limit = 10

  const [searchQueryParams, setSearchQueryParams] = useSearchParams()

  const handleRechercher = useCallback(() => {
      const page = searchQueryParams.get("page") ? searchQueryParams.get("page") : 1
      const offset = (page - 1) * limit
      let params  = {}
      params =  searchQueryParams.get("motsCles") ? { ...params, mot_cle: searchQueryParams.get("motsCles")} : params
      params =  searchQueryParams.get("idSecteur") ? { ...params, secteur_activite_id: searchQueryParams.get("idSecteur")} : params
      params =  searchQueryParams.get("idFonction") ? { ...params, fonction_id: searchQueryParams.get("idFonction")} : params
      params = searchQueryParams.get("idVilleSelectionne") ? { ...params, ville_id: searchQueryParams.get("idVilleSelectionne")} : params
      params = searchQueryParams.get("minAnneeExpMin") ?{ ...params, annees_experience_min: searchQueryParams.get("minAnneeExpMin")} : params
      params = searchQueryParams.get("typesOffre") ? { ...params, types_offre: searchQueryParams.getAll("typesOffre")} : params
      console.log(params)
      instance.get("offres/search", {
        params:
        {
          ...params,
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
      .catch(e => {
        console.error("Erreur:" + e)
        errorMessage.open({content:"Nous rencontrons des problèmes, veuillez ressayer plus tard !", type:"error"})
      })
      .finally(() => setLoading(false))
    },
    [searchQueryParams, limit]
  )

  const [isFirstRender, setIsFirstRender] = useState(true)

    /* useEffect(() => {  
      if(isFirstRender){
        return
      }
      handleRechercher(currentPage.currentPage)
    }, [currentPage]) */
    
    useEffect(() => {
      console.log(searchQueryParams)
      if (isFirstRender) {
        setIsFirstRender(false)
      }else{
        scroll()
      }
      setLoading(true)
      handleRechercher()
    }, [searchQueryParams])

   /*  useEffect(() => {
      if (isFirstRender) {
        setIsFirstRender(false)
      } else{
        scroll()
      }
      setSearchQueryParams(filters)
      setLoading(true)
      // filtres tbaaadl => useefect3la filters bach searchparams tbadl 3la 7saab lfiters li wla=> useeffect 3la searchparams li ghaywli houwa ki lancer requette 3la 7sab saechparms li wla ola li houwa feeh dès le depart ( 3an taree9 setCurrrentpage b7al dima, i9der ikon chi handle recherhce jdid ki yakhod parmaetres fel argument)
      // tbadlaat lcurrent page => 3ayet 3la handler echerche 3adi bel lprametres li kaynin f search prams actuelle o lcurrent page li kayen
    }, [filters]) */

  const scroll = useCallback(
    () => {
      window.scrollTo(
        {
          top:500,
          behavior:"smooth"
        }
      )
    },[])
  
  return (
    <Layout style={{ background: "#fff" }}>
      <div
              style={{
                background: "#fff",
                borderBottom: "1px solid #d9d9d9",
                transition: "all 0.3s ease",
                height: "85px",
                display: "flex",
                alignItems: "center",
              }}
            >{contextHolder}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "0 3.5rem 0 0",
                }}
              >
                <a href="/" style={{ display: "flex" }}>
                  <img src={websitelogo} alt="logo" style={{ height: "45px", marginLeft: "3.5rem" }} />
                </a>
                <div style={{ display: "flex", gap: "3rem", alignItems: "center", marginRight: "1.5rem"}}>
                  <span style={{ fontSize: "18px", fontWeight: "500" }}>
                    <a href="/" style={{ color: "#1f1f1f" }}>
                      <span className="nav-link">Chercher un emploi</span>
                    </a>
                  </span>
                  <span style={{ fontSize: "18px", fontWeight: "500" }}>
                    <a href="/register" style={{ color: "#1f1f1f" }} className="nav-link" target="_blank">
                      <span className="nav-link">Poster un offre d'emploi</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
     <Hero/>
      <SearchBar onChangeLoading ={setLoading} villes={resources.villes} setSearchQueryParams={setSearchQueryParams} scroll= {scroll} handleEntrerClick={handleEntrerClick} searchQueryParams={searchQueryParams}/>
      <div style={{ padding: "0 48px" }} >
        <Layout style={{ padding: "24px 0", background: "#fff", gap: "2rem" }}>
          <Content style={{ padding: "0 24px", minHeight: 280, background: "#fff" }}>
            <div style={{ marginBottom: "1rem", color:' #afa6a6ff', fontWeight:"500"}}>Résultats ({total})</div>
            <Flex gap="middle" align="start" vertical>
                {loading ? Array.from({ length: 10 }).map((_, index) => (<Card key={`skeleton-${index}`} loading={true} style={{ minWidth: 300, width: "100%" }} />)) : <JobsSearch offres={offres} loading={loading}/> }
            </Flex>
          </Content>
          <Filter secteurs={resources.secteurs_activite} fonctions={resources.fonctions} searchQueryParams={searchQueryParams} setSearchQueryParams={setSearchQueryParams}/>
        </Layout>
        <Pagination  onChangeLoading={setLoading} scroll={scroll} total={total} limit={limit} searchQueryParams={searchQueryParams} setSearchQueryParams={setSearchQueryParams} />
      </div>
      <Footer/>
    </Layout>
  )
}

export default Home
