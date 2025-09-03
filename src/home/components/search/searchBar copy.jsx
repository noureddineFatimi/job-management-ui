import {  Select, Input, Space } from "antd"
import {EnvironmentOutlined, SearchOutlined } from "@ant-design/icons"
import { useState, useEffect, memo} from "react"

const SearchBar = memo(function SearchBar({onChangeLoading ,villes , setSearchQueryParams, searchQueryParams, scroll, handleEntrerClick}) {

      const [isSearchSticky, setIsSearchSticky] = useState(false)

      useEffect(() => {
        const handleScroll = () => {
          const scrollPosition = window.scrollY
          setIsSearchSticky(scrollPosition > 300)
        }
    
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
      }, [])

    return  <div
        style={{
          position: "sticky",
          top: isSearchSticky ? "0px" : "auto",
          zIndex: 999,
          background: "#fff",
          padding: "1.5rem 0",
          borderBottom: isSearchSticky ? "1px solid #e6e6e6" : "none",
          boxShadow: isSearchSticky ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
          transition: "all 0.3s ease",
          marginTop: isSearchSticky ? "0" : "-2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Space.Compact style={{ width: "50%" }} size="large">
            <Input addonBefore={<SearchOutlined />} placeholder="Mots clés (ex. Développeur)" value={searchQueryParams.get("motsCles")} onChange={(value) => {{
        const motsClesTraite = value.target.value.trim()
        const params = new URLSearchParams(searchQueryParams)
        if (motsClesTraite.length === 0){
          params.delete("motsCles")
        }
        else{
          params.set("motsCles", motsClesTraite)
        }
        params.set("page", 1)
        setSearchQueryParams(params)
      } } }  onKeyDown={handleEntrerClick}/>
          </Space.Compact>
          <Select
            size="large"
            showSearch
            optionFilterProp="label"
            suffixIcon={<EnvironmentOutlined/>}
            value={searchQueryParams.get("idVilleSelectionne") ? parseInt(searchQueryParams.get("idVilleSelectionne")) : ""}
            defaultValue= ""
            style={{ width: "20%" }}
            onChange={value =>  {
              const params = new URLSearchParams(searchQueryParams)
              if (value) {
                params.set("idVilleSelectionne", value); 
              } else {
                params.delete("idVilleSelectionne");    
              }
              params.set("page", 1)
              setSearchQueryParams(params);
          }}
            options={[
              { 
              value: "", 
              label: "Tous les villes" 
              },
              ...villes.map(ville => (
              {
                value: ville.id, 
                label: ville.nom_ville 
              }
              ))
            ]}
          />
         {/*  <button
            onClick={() => {
              setCurrentPage(prev => ({currentPage: 1, tick: prev.tick + 1}))
              onChangeLoading(true)
              scroll()
            }
            }
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              backgroundColor: "#1f1f1f",
              color: "#fff",
              border: "none",
              fontSize: "15px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Rechercher
          </button> */}
        </div>
      </div>
})

export default SearchBar