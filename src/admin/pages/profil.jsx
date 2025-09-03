import { Avatar,message,Typography,Spin } from "antd"
import {UserOutlined} from "@ant-design/icons"
import { Content } from "antd/es/layout/layout"
import { useEffect, useState } from "react"
import { profil } from "../api/api"

const Profil = () => {
    
    const [user, setUser] = useState(null)
    const [loading, setLoading]=useState(true)
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
            setLoading(false)
        }
      }
       fetchUser()
    }, [])

    
    return <div style={{padding:"1rem", fontFamily: "'Inter', 'Segoe UI', sans-serif"}}> {contextHolder}
    <Typography><h1 style={{fontWeight:"bold", fontSize:"30px"}}>Vue sur le profil</h1>
    <p style={{color:"gray",marginBottom:"3rem"}}>Informations personelles sur votre compte</p> </Typography>
    {loading ? <div style={{width:"100%",display
          :"flex", height:"50vh",alignItems:"center" ,  justifyContent:"center" }}> <Spin size="large" /></div> : <Content style={{fontWeight:"500", display:"flex", flexDirection:"column",padding:"1rem", justifyContent:"center",alignItems:"center",borderRadius:"20px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",width:"70%",marginLeft:"auto",marginRight:"auto"}}>
    <Avatar size={64} icon={<UserOutlined />} />
    <p>{user && user.first_name}{' '}{user && user.last_name}{' | '}{user && user.role && user.role.role_name}</p>
    <p>{user && user.email}</p>
    </Content>}
    </div>
}

export default Profil