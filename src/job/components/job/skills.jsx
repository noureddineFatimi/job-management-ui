import { Flex, Progress} from 'antd';

const Skills = ({loading, competences}) => { 
  console.log(competences)
    return <>{!loading && competences !== null && competences !== undefined && competences.length > 0 && 
<div><div style={{fontWeight:"500", fontSize: "15px", marginBottom:"10px"}}>Competences: </div>
<Flex 
  gap="small" 
  style={{
    marginBottom: "1.5rem", 
    width: "100%", 
    maxWidth: "500px",
    marginLeft: "0.6rem",
    padding: "1.5rem",
    backgroundColor: "#fafafa",
    borderRadius: "12px",
    border: "1px solid #e8e8e8",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)"
  }} 
  vertical
>

  {competences.map((competence, index) => {
    const getCompetenceConfig = (niveau) => {
      switch (niveau) {
        case "Novice":
          return {
            percent: 50,
            color: "#52c41a",
            bgColor: "#f6ffed",
            badgeColor: "#52c41a",
            badgeText: "Novice"
          };
        case "Intermédiaire":
          return {
            percent: 75,
            color: "#1890ff",
            bgColor: "#e6f7ff",
            badgeColor: "#1890ff",
            badgeText: "Intermédiaire"
          };
        case "Avancé":
          return {
            percent: 100,
            color: "#722ed1",
            bgColor: "#f9f0ff",
            badgeColor: "#722ed1",
            badgeText: "Avancé"
          };
        case null:
        default:
          return {
            percent: 25,
            color: "#d9d9d9",
            bgColor: "#f5f5f5",
            badgeColor: "#8c8c8c",
            badgeText: "Basique"
          };
      }
    };

    const config = getCompetenceConfig(competence.niveau);

    return (
      <div 
        key={index}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
          padding: "1rem",
          backgroundColor: "white",
          borderRadius: "8px",
          border: "1px solid #f0f0f0",
          transition: "all 0.2s ease",
          cursor: "default"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(4px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* En-tête avec nom de compétence et badge niveau */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem"
        }}>
          <span style={{
            fontSize: "0.95rem",
            fontWeight: "500",
            color: "#262626",
            flex: 1
          }}>
            {competence.nom_competence}
          </span>
          <span style={{
            fontSize: "0.8rem",
            fontWeight: "500",
            color: config.badgeColor,
            backgroundColor: config.bgColor,
            padding: "0.2rem 0.6rem",
            borderRadius: "12px",
            border: `1px solid ${config.color}20`
          }}>
            {config.badgeText}
          </span>
        </div>

        {/* Barre de progression stylisée */}
        <div style={{ width: "100%" }}>
          <Progress 
            percent={config.percent}
            showInfo={false}
            strokeColor={{
              '0%': config.color,
              '100%': config.color + '80'
            }}
            trailColor="#f5f5f5"
            strokeWidth={8}
            style={{
              '.ant-progress-bg': {
                borderRadius: '4px'
              }
            }}
          />
        </div>

        {/* Indicateur de pourcentage */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.85rem",
          color: "#8c8c8c"
        }}>
          <span>Niveau requis</span>
          <span style={{
            fontWeight: "600",
            color: config.color
          }}>
            {config.percent}%
          </span>
        </div>
      </div>
    );
  })}

</Flex>
    </div>
}</>

}

export default Skills