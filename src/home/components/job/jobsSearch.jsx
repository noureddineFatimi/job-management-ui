import {EnvironmentOutlined, UserOutlined, TeamOutlined, DollarOutlined} from "@ant-design/icons"
import { Button, Card, Empty, Tag } from "antd"
import { memo } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BuildingOffice2Icon,BriefcaseIcon } from "@heroicons/react/24/outline"

const JobsSearch = memo(function JobsSearch({offres, loading}) {

    const navigate = useNavigate()

     const salaire = (salaire_min, salaire_max) => {
    if (salaire_max !== null || salaire_min !== null) {
      if (salaire_max !== null && salaire_min !== null) {
        return <span> <DollarOutlined /> {  (<>{salaire_max} - {salaire_min} dh &nbsp;</>)} </span>
      }
      if (salaire_min !== null) {
        return <span> min: {salaire_min} dh &nbsp; </span>
      }
      if (salaire_max !== null) {
        return <span> max: {salaire_max} dh</span>
      }
    }
  }

    if (offres && offres.length === 0) {
      return <div style={{width:"100%", height:"50vh", display:"flex",justifyContent:"center", alignItems:"center"}}><Empty description="Pas d'offres convenables pour cette recherche"/></div>
    }

    return <>{...offres.map(offre =>{
                 return <Card loading={loading} style={{ minWidth: 300, width: "100%", borderRadius: "15px",
    border: "1px solid #d9d9d9",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)", }}>
                <Card.Meta
                  title={<div style={{display:"flex",justifyContent:"space-between",marginBottom:"1.8rem"}}><span style={{fontSize:"1.2rem"}}>{offre.titre}</span><span><Tag bordered={false} color="geekblue" style={{borderRadius:"15px"}}>{offre.nbr_candidats} candidatures</Tag></span></div> }
                  description={
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <span style={{ color: "#000" }}>
                          {" "}
                          <div style={{display:"flex", alignItems:"flex-start", gap:"0.25rem", fontWeight:"500"}}><BuildingOffice2Icon style={{width:"20px"}}/> <div> {offre.entreprise.nom_entreprise} </div></div>
                        </span>
                        <span>
                          {" "}
                          <div style={{display:"flex", alignItems:"flex-start", gap:"0.25rem"}}><BriefcaseIcon style={{width:"20px"}}/> <div> Télétravail: {offre.teletravail} </div></div>
                        </span>
                      </div>
                      {offre.resume && <div style={{ color: "#000" , marginBottom:"0.25rem", marginTop:".5rem"}}>
                        {offre.resume}
                      </div>}
                      {
                        offre.competences !== null && offre.competences !== undefined && offre.competences.length > 0 &&
                        <div style={{ display: "flex", gap: "0.2rem",fontWeight:"500" }}>
                        { offre.competences.map(competence => {
                          return <Tag color="default" style={{borderRadius:"15px"}}>{competence.nom_competence}</Tag>
                        })}
                      </div>
                      }
                      <div style={{ display: "flex", gap: "1.2rem" }}>
                        {salaire(offre.salaire_min, offre.salaire_max)}
                        <span>
                          <UserOutlined /> {offre.nbr_employes_demande} employé(s) demandé(s)
                        </span>
                      </div>
                      
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom:"0.5rem", marginTop:".5rem" }}>
                        <Button onClick={()=>navigate(`/offres/${offre.id}`)} variant="outlined" color="primary"> Plus d'information</Button>
                      </div>
                    </div>
                  }
                />
              </Card>
                })} </>
})

export default JobsSearch