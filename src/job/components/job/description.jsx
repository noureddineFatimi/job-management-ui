const Description = ({description, loading} ) => {
    return <> {!loading && <div style={{minWidth: 300, marginBottom: "1.5rem", borderRadius: "15px",
    border: "1px solid #d9d9d9", background:"#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",padding:"1.2rem"}}> <div style={{fontWeight:"500", fontSize: "1.2rem", marginBottom:"1.2rem"}}>Description </div>
      <p style={{marginLeft:".6rem", whiteSpace:"pre-wrap"}}>{description}</p></div>} </>
}

export default Description