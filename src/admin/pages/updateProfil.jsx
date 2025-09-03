import { message, Spin, Typography } from "antd"
import UpdateForm from "../components/form/updateForm"
import { useEffect, useState } from "react"
import { profil } from "../api/api"
const UpdateProfil= () => {


        const [user, setUser] = useState(null)
        const [loadingSpin, setLoadingSpin] = useState(true)
            const [messageApi,contextHolder] = message.useMessage()
        const error = (content) => {
      messageApi.open({
        key:"error",
        type: 'error',
        content: content,
      });
    };
    useEffect(() => {
             const fetchUser = async () => {
               try {
                   const userResponse = await profil()
                   if(userResponse.result) {
                       setUser(userResponse.user)
                   }
                   else {
             if(userResponse && userResponse.status === 401 ) {
               error("Votre session a expiré. Veuillez vous reconnecter..");
             }else {
               error("Nous rencontrons des problèmes, veuillez ressayer plus tard !")
             }
           }
               } catch (err) {
                   console.error(err)
               }
               finally{
                   setLoadingSpin(false)
               }
             }
              fetchUser()
           }, [])
        
    

    return <div style={{padding:"1rem"}}> {contextHolder}
    <Typography><h1 style={{fontWeight:"bold", fontSize:"30px"}}>Modification du profil</h1>
    <p style={{color:"gray",marginBottom:"3rem"}}>Modifier vos informations personnelles</p> </Typography> <div style={{
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "20px",
          backgroundAttachment: "fixed"
        }}>
          
          <div style={{
            textAlign: "center",
            marginBottom: "40px",
          }}>
          </div>
          
          <div style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "500px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            
            
          {loadingSpin ? <div style={{width:"100%",display
          :"flex", height:"50vh",alignItems:"center" ,  justifyContent:"center" }}> <Spin size="large" /></div> : <UpdateForm user={user}/>}
            
         
          </div>
                    </div>

        </div>

}

export default UpdateProfil