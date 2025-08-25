import {EnvironmentOutlined, UserOutlined, TeamOutlined, DollarOutlined} from "@ant-design/icons"
import { Card, Tag } from "antd"
import { memo } from "react"
import { Link } from "react-router-dom"

const JobsSearch = memo(function JobsSearch({offres, loading}) {

     const salaire = (salaire_min, salaire_max) => {
    if (salaire_max !== null || salaire_min !== null) {
      if (salaire_max !== null && salaire_min !== null) {
        return <span> <DollarOutlined /> {  (<>{salaire_max} - {salaire_min} dh &nbsp;</>)} </span>
      }
      if (salaire_min !== null) {
        return <span> min: {salaire_min} dh &nbsp; </span>
      }
      if (salaire_max !== null) {<span> max: {salaire_max} dh</span>
      }
    }
  }

    return <>{...offres.map(offre =>{
                 return <Card loading={loading} style={{ minWidth: 300, width: "100%" }}>
                <Card.Meta
                  title={offre.titre}
                  description={
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
                        <span style={{ color: "#000" }}>
                          {" "}
                          <TeamOutlined /> {offre.entreprise.nom_entreprise}
                        </span>
                        <span>
                          {" "}
                          <EnvironmentOutlined /> {offre.teletravail}
                        </span>
                        <Tag color="geekblue">{offre.nbr_candidats} candidatures</Tag>
                      </div>
                      {offre.description && <p style={{ color: "#000" }}>
                        {offre.description}
                      </p>}
                      {
                        offre.competences !== null && offre.competences !== undefined && offre.competences.length > 0 &&
                        <div style={{ display: "flex", gap: "0.2rem" }}>
                        { offre.competences.map(competence => {
                          return <Tag color="default">{competence.nom_competence}</Tag>
                        })}
                      </div>
                      }
                      <div style={{ display: "flex", gap: "1.2rem" }}>
                        {salaire(offre.salaire_min, offre.salaire_max)}
                        <span>
                          <UserOutlined /> {offre.nbr_employes_demande} employe(s)
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <Link to={`/offres/${offre.id}`}> Plus d'information</Link>
                      </div>
                    </div>
                  }
                />
              </Card>
                })} </>
})

export default JobsSearch