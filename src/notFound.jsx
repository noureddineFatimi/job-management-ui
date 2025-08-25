import { Empty, Layout } from "antd"
import Header from "./home/components/layout/header"
import { Content } from "antd/es/layout/layout"


const NotFound= () => {
    return <Layout style={{ background: "#fff" }}>       

    <Header/>
    <Content style={{margin:"1.5rem" ,display:"flex",height:"50vh", justifyContent:"center",alignItems:"center"}}> 
        <Empty description="404 - Page introuvable"/>
        </Content></Layout>
}
export default NotFound