import { Button, message, Typography } from "antd"
import { useState } from "react"
import { deleteCompte } from "../api/api"
import { WarningOutlined} from '@ant-design/icons';

const DeleteAccount = () => {

    const [loading, setLoading] = useState(false)

     const [messageApi,contextHolder] = message.useMessage()

    const error = (content) => {
      messageApi.open({
        key:"error",
        type: 'error',
        content: content,
      });
    };

    const handleDelete = async () => {
        try {
            setLoading(true)
            const deleteResult = await deleteCompte()
            if(deleteResult.result) {
                window.location.href = "/login"
            }else {
                if(deleteResult && deleteResult.status === 401 ) {
                    error("Votre session a expiré. Veuillez vous reconnecter..");
                }else {
                    error("Nous rencontrons des problèmes, veuillez ressayer plus tard !")
                }
            }
        } catch (err) {
            console.error(err)
        }
        finally {
            setLoading(false)
        }
    }

    return <Typography><div style={{padding:"1rem", fontFamily: "'Inter', 'Segoe UI', sans-serif"}}> {contextHolder}
            <h1 style={{fontWeight:"bold", fontSize:"30px"}}>Supprimer le compte</h1>
                <p style={{color:"gray",marginBottom:"3rem"}}>Suppression définitive</p>
              <div style={{color:"gray"}}>
                En supprimant le compte :
                <ul>
                    <li>Vous suppimmez vos données définitivement</li>
                    <li>Vous suppimmez vos offres publiés</li>
                    <li>Vous suppimmez les candidatures reçues</li>
                </ul></div>
                <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
                        <Button loading={loading} danger type="primary" style={{fontWeight:"500",paddingLeft:"1rem",paddingRight:"1rem"}} onClick={handleDelete}><WarningOutlined/>Supprimer le compte définitivement</Button>
                </div>
            </div>
            </Typography>
}
export default DeleteAccount