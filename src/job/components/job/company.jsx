import { BuildingOffice2Icon } from "@heroicons/react/24/outline"

const Company = ({entreprise,loading} ) => {
    return <> {!loading && <div style={{minWidth: 300, marginBottom: "1.5rem", borderRadius: "15px",
    border: "1px solid #d9d9d9", background:"#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",padding:"1.2rem"}}> <div style={{fontWeight:"500", fontSize: "1.2rem", marginBottom:"1.2rem"}}>Entreprise </div>
      <p style={{marginLeft:".6rem"}}><div style={{display:"flex", alignItems:"flex-start", gap:"0.25rem", fontWeight:"500", marginBottom:"1rem"}}><BuildingOffice2Icon style={{width:"20px"}}/> <div> {entreprise.nom_entreprise} </div></div>{entreprise.adresse !== null && entreprise.adresse !== undefined && ( <span style={{color:"gray"}}> {entreprise.adresse},</span>)}<span style={{color:"gray"}}> {entreprise.ville.nom_ville}</span></p> </div>} </>
}

export default Company