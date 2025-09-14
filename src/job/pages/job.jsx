import Header from "../../home/components/layout/header"
import Layout from "antd/es/layout/layout"
import { useJobData } from "../hooks/useJobData"
import { useState } from "react"
import JobOffre from "../components/job/jobOffre"
import { Content } from "antd/es/layout/layout"
import Skills from "../components/job/skills"
import Company from "../components/job/company"
import ApplyForm from "../components/forms/applyFom"
import { Navigate, useParams } from "react-router-dom"
import Description from "../components/job/description"

const Job = () => {

    const {id_offre} = useParams()

    if (!/^\d+$/.test(id_offre)) {
    return <Navigate to="/Not-found" replace />;
    }

    const [loading, setLoading] = useState(true)
    const {data,error} = useJobData(id_offre, setLoading)
    console.log(error)
    if (error && error === "not_found") {
        return <Navigate to="/not-found" replace />
    }

    return  <Layout style={{ background: "#fff" }}>       
    <Header/>
    <Content style={{margin:"1.5rem", }}>
        <JobOffre data={data} loading={loading}/>
        {data.data && <Skills loading={loading} competences={data.data.competences} />}
        {data.data && <Company loading={loading} entreprise = {data.data.entreprise}/>}
        {data.data && <Description loading={loading} description={data.data.description} />}
        {data.data && <ApplyForm loading={loading} deadline_postulation={data.data.deadline_postulation} idOffre={id_offre}/>}
    </Content>

    </Layout>
   
}

export default Job