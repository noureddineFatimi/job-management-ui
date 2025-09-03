import { useNavigate, useParams } from "react-router-dom"
import ApplyTable from "../components/apply/applyTable"
import {cvCandidat, getCandidatures, getOffreToUpdate} from "../api/api"
import { useEffect, useState } from "react"
import { message, Spin, Typography, Empty } from "antd"
import download from "downloadjs"
import {ArrowLeftOutlined, LeftCircleFilled} from "@ant-design/icons"
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline"

const ShowCandidatures = () => {
    
    const {id_offre} = useParams()

    const navigate = useNavigate()

    const [messageApi, contextHolder] = message.useMessage()
    const error = (content) => {
      messageApi.open({
        key:"error",
        type: 'error',
        content: content,
      });
    };

     const [offre, setOffre] = useState({})
      useEffect(() => {
       const fetchData = async () => {
        try {
          const result = await getOffreToUpdate(id_offre)
        if (result && result.result) {
          setOffre(result.offre)
        }else {
          if(result && result.status === 401 ) {
            error("Votre session a expiré. Veuillez vous reconnecter..");
          }else {
            error("Nous rencontrons des problèmes, veuillez ressayer plus tard !")
          }
        }
        } catch (e) {
          console.error(e)
        }finally {
        }
       }
       fetchData()
      }, [])

    const [loading, setLoading]= useState(true)

    const[copyMessageApi, copyMessageContextHolder] = message.useMessage()
    const success = () => {
      copyMessageApi.open({
        type: 'success',
        content: "Email copié",
      });
    };

    const copy_email = async (email) => {
      try {
        await navigator.clipboard.writeText(email)
        success()
      } catch (error) {
        console.error(error)
      }
    }

    const [loadingDownload, setLoadingDownload] = useState(false)

    const download_cv = async (cv_id, nom_candidat, prenom_candidat) => {
      try {
        setLoadingDownload(true)
        const response = await cvCandidat(cv_id)
        if(response.result) {
           console.log(response.cv.type)
          if (response.cv.type === "application/pdf") {
            const nom_cv = nom_candidat.toUpperCase() + "-"+ prenom_candidat.toUpperCase() + "-CV.pdf"
            download(response.cv, nom_cv)
          } 
          else {
            if (response.cv.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
              const nom_cv = nom_candidat.toUpperCase() + "-"+ prenom_candidat.toUpperCase() + "-CV.docx"
              download(response.cv, nom_cv)
            }else {
              error('Fichier non supporté')
            }
          }
        }
        else {
          if(result && result.status === 401 ) {
            error("Votre session a expiré. Veuillez vous reconnecter..");
          }else {
            error("Nous rencontrons des problèmes, veuillez ressayer plus tard !")
          }
        }
      } catch (error) {
        console.error(error)
      }
      finally{
        setLoadingDownload(false)
      }
    }

    const [data, setData] = useState(null)

      useEffect(() => {
        setLoading(true)
       const fetchData = async () => {
        try {
          const result = await getCandidatures(id_offre)
        if (result && result.result) {
          setData(result.applicationsList)
        }else {
          if(result && result.status === 401 ) {
            error("Votre session a expiré. Veuillez vous reconnecter..");
          }else {
            error("Nous rencontrons des problèmes, veuillez ressayer plus tard !")
          }
        }
        } catch (e) {
          console.error(e)
        }finally {
          setLoading(false)
        }
       }
       fetchData()
      }, [])

    return <div style={{padding:"1rem"}}>{contextHolder}{copyMessageContextHolder}
      <ArrowLeftCircleIcon style={{width:"36px", cursor:"pointer"}} onClick={() => navigate("/dashboard/offres")} />
        <Typography><h1 style={{fontWeight:"bold", fontSize:"30px"}}>Les candidatures reçues pour cet offre</h1>
        <p style={{color:"gray",marginBottom:"3rem"}}>Parcourir les candidatures reçues par offre</p> </Typography>
            {loading ? <div style={{width:"100%",display
          :"flex", height:"50vh",alignItems:"center" ,  justifyContent:"center" }}> <Spin size="large" /></div> :<> <Typography><h5>{offre && offre.titre}: {offre && offre.nbr_employes_demande} poste(s) à recruter</h5></Typography><ApplyTable data={data} copy_email={copy_email} download_cv={download_cv} loadingDownload={loadingDownload} /> </>}
        </div>
}

export default ShowCandidatures