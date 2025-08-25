
import { Flex, Card, Tag} from "antd"
import {EnvironmentOutlined,DollarOutlined} from "@ant-design/icons"

const JobOffre = ({data, loading }) => {

    const publicationDay = (datePublication) => {
  const now = new Date();
  const publicationDate = new Date(datePublication);

  const diffTime = now.setHours(0, 0, 0, 0) - publicationDate.setHours(0, 0, 0, 0);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return <span>aujourd'hui</span>;
  }

  if (diffDays === 1) {
    return <span>hier</span>;
  }

  return <span>il y a {diffDays} jours</span>;
};


  const checkAnneeExperience = (annees_experience_min, annees_experience_max) => {
    if(annees_experience_min !== null && annees_experience_max !== null){
      return <Tag color="default"> De {annees_experience_min} à {annees_experience_max} ans</Tag>
    }
    
    if (annees_experience_min !== null) {
      return <Tag> Au moin {annees_experience_min} ans d'experience </Tag> 
    }
    if (annees_experience_max !== null) {
      return <Tag> Au plus {annees_experience_max} ans d'experience </Tag> 
    }
    }

  const salaire = (salaire_min, salaire_max) => {
    if (salaire_max !== null || salaire_min !== null) {
      if (salaire_max !== null && salaire_min !== null) {
        return <span>
                          <DollarOutlined /> {  (
                <>
                  {salaire_max} - {salaire_min} dh &nbsp;
                </>
              )} </span>
      }
      if (salaire_min !== null) {
        return <span>
                  min: {salaire_min} dh &nbsp;
                </span>
      }
      if (salaire_max !== null) {
         <span>
                
                  max: {salaire_max} dh
                </span>
      }
    }
    return <div></div>
  }


    const offre = data.data
    console.log(offre)

    const logo = data.logo
    return  <Card loading={loading} style={{ minWidth: 300, marginBottom: "1.5rem" }}>
        {!loading && offre && <Flex gap="2rem" align="start">
            {logo && <img src={logo} alt="logo" style={{ height: "45px" }} />}
        <Card.Meta style={{width:"100%"}}
                  title={offre.titre}
                  description={
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div>{offre.fonction.nom_fonction} {" - "} {offre.secteur_activite.nom_secteur}</div>
                      <div>
                        {checkAnneeExperience(offre.annees_experience_min, offre.annees_experience_max)} 
                        <Tag color="default"> {offre.nbr_employes_demande} poste(s) sur {offre.ville.nom_ville}</Tag>
                        <Tag color="default"> {offre.niveau_etude_requis} - {offre.diplome_requis ? offre.diplome_requis : "Aucun diplôme / Niveau scolaire" } </Tag>
                      </div>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
                        
                        <span>
                          {" "}
                          <EnvironmentOutlined /> Télétravail: {offre.teletravail}
                        </span>
                         <span>
                          {" "}
                          <EnvironmentOutlined /> {offre.type_offre}
                        </span>
                        <Tag color="geekblue">{offre.nbr_candidats} candidatures</Tag>
                      </div>
                      <p style={{ color: "#000" }}>
                        {offre.description}
                      </p>
                      <div style={{ display: "flex",justifyContent: "space-between" , width:"100%"}}>
                        {salaire(offre.salaire_min, offre.salaire_max)}
                        
                        <div>Publié {publicationDay(offre.created_at)} -   Postulez avant le {new Date(offre.deadline_postulation).toLocaleDateString("fr-FR", {
  weekday: "short",
  day: "numeric",
  month: "long",
  year: "numeric"
})} </div>

                      </div>
                    </div>
                  }
                />
        </Flex> }
      </Card> 
}

export default JobOffre