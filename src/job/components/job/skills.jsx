import { Flex, Progress} from 'antd';

const Skills = ({loading, competences}) => { 

    return <>{!loading && competences !== null && competences !== undefined && competences.length > 0 && 
<div><div style={{fontWeight:"500", fontSize: "15px", marginBottom:"10px"}}>Competences: </div>
<Flex gap="small" style={{marginBottom:"1.5rem", width:"30%", marginLeft:"0.6rem"}} vertical>
     {
      competences.map( (competence) =>{
        if (competence.niveau === "fort"){
          return <div style={{display:"flex", gap:"1rem"}}>{competence.nom_competence} <Progress  percent={50} showInfo={false}/> {competence.niveau}</div>
        }
        if (competence.niveau === "moyen") {
          return <div style={{display:"flex", gap:"1rem"}}>{competence.nom_competence} <Progress  percent={30} showInfo={false}/> {competence.niveau}</div>
        }
        return <div style={{display:"flex", gap:"1rem"}}>{competence.nom_competence} <Progress  percent={30} showInfo={false}/> {competence.niveau}</div>
      }   
      )
     }
    </Flex>
    </div>
}</>

}

export default Skills