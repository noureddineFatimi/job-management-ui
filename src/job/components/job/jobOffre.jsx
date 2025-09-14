
import { Flex, Card, Tag, Skeleton} from "antd"
import {EnvironmentOutlined,DollarOutlined, ClockCircleOutlined, TeamOutlined, BookOutlined} from "@ant-design/icons"
import { BriefcaseIcon, CheckBadgeIcon, CheckIcon, DocumentTextIcon ,} from "@heroicons/react/24/outline";

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
      return <div><ClockCircleOutlined/> Expérience: De {annees_experience_min} à {annees_experience_max} ans</div>
    }
    
    if (annees_experience_min !== null) {
      return <div><ClockCircleOutlined/> Expérience: Au moin {annees_experience_min} ans d'experience </div> 
    }
    if (annees_experience_max !== null) {
      return <div><ClockCircleOutlined/> Expérience: Au plus {annees_experience_max} ans d'experience </div> 
    }
    return 
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
    return  (!loading ? <Card loading={loading} style={{ minWidth: 300, marginBottom: "1.5rem", borderRadius: "15px",
    border: "1px solid #d9d9d9",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",  }}>
        {!loading && offre && <Flex gap="2rem" align="start">
            {logo && <img src={logo} alt="logo" style={{ height: "45px" }} />}
        <Card.Meta style={{width:"100%"}}
                  title={<div style={{fontSize:"1.2rem"}}>{offre.titre}</div>}
                  description={
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div style={{fontWeight:"500"}}>{offre.fonction.nom_fonction} {" - "} {offre.secteur_activite.nom_secteur}</div>
                      <div style={{ display: "flex", gap: "1rem", fontWeight:"500" }}>
                        {checkAnneeExperience(offre.annees_experience_min, offre.annees_experience_max)} 
                        <div><EnvironmentOutlined/> {offre.nbr_employes_demande} poste(s) sur {offre.ville.nom_ville}</div>
                        <div><BookOutlined/> {offre.niveau_etude_requis} - {offre.diplome_requis ? offre.diplome_requis : "Aucun diplôme / Niveau scolaire" } </div>
                      </div>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center", fontWeight:"500" }}>
                          <div style={{display:"flex", alignItems:"flex-start", gap:"0.25rem"}}><BriefcaseIcon style={{width:"20px"}}/> <div> Télétravail: {offre.teletravail} </div></div>
                        
                         <div style={{display:"flex", alignItems:"flex-start", gap:"0.25rem"}}><DocumentTextIcon style={{width:"20px"}}/> <div>  {offre.type_offre} </div></div>

                        <div><TeamOutlined/> {offre.nbr_candidats} candidatures</div>
                      </div>
                      <div></div>
                      <div style={{ display: "flex",justifyContent: "space-between" , width:"100%", fontWeight:"500"}}>
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
      </Card> : <div style={{display:"flex", gap:"1rem", flexDirection:"column"}}> <Card > <Skeleton avatar/> </Card><Card  loading  /> <Card  loading  /></div>)
}

export default JobOffre