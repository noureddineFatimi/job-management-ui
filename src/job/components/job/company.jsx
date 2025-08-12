const Company = ({entreprise,loading} ) => {
    return <> {!loading && <> <span style={{fontWeight:"500", fontSize: "15px"}}>Entreprise: </span>
      <p style={{marginLeft:".6rem"}}><span style={{fontWeight:"300"}}>{entreprise.nom_entreprise}</span>{entreprise.adresse !== null && entreprise.adresse !== undefined && ( <span> - {entreprise.adresse}</span>)}, {entreprise.ville.nom_ville}</p> </>} </>
}

export default Company