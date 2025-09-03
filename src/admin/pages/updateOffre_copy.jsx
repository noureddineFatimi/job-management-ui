import { DatePicker, Input, Select,Upload, Button, InputNumber, Card, message, Steps, Spin, Typography, ConfigProvider, Image, Empty } from "antd"
import Form from "antd/es/form/Form"
import FormItem from "antd/es/form/FormItem"
import { useState, useEffect, useMemo } from "react"
import { ressourcesAPI, postOffre, uploadLogoToServer, getOffreToUpdate, logoEntreprise, deleteLogo, updateLogoEntreprise, updateOffre } from "../api/api"
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { ArrowLeftCircleIcon, BriefcaseIcon,  BuildingOfficeIcon, LightBulbIcon} from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom"
import UpdateJobFormJobForm from "../components/form/updateJobForm_jobForm"
import UpdateJobFormCompanyForm from "../components/form/updateJobForm_compayForm"
import UpdateJobCompetencesJobForm from "../components/form/updateJobForm_competencesForm"
import { useCallback } from "react"

const UpdateJobOffreCoppy = () => {

  const { id_offre } = useParams();

  const navigate = useNavigate()

  if (!/^\d+$/.test(id_offre)) {
    return <div style={{height:"100%", display:"flex",justifyContent:"center",alignItems:"center"}}> <Empty description="404 - Page introuvable"/></div>
    }

  const [processingLogo, setProcessingLogo] = useState(false)

  const [current, setCurrent] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();
  const [loadingMessage, loadingContextHolder] = message.useMessage()
  const [loading, setLoading] = useState(false)

  const [loadingOffreData, setLoadingOffreData] = useState(true)
  
  const [offre, setOffre] = useState({})

  const [updateData, setUpdateData] = useState({})

  const [logo, setLogo] = useState({logo:null, id:null})

    useEffect(() => {
      const fetchData = async (id_offre)  => {
        try {
            const res = await getOffre(id_offre)
            if (res.res) {
                getAndSetLogoEntreprise(res.data.entreprise.logo.id)
                setOffre(res.data)
                console.log(res.data)
            }
        } catch (err) {
            console.error(err)
      }
        finally{
            setLoadingOffreData(false)
        }
      }

      fetchData(id_offre)
     
    }, [])
    

  useEffect(() => {
        if (loading === true) {
          loadingMessage.open({
            key:"loading",
          type: 'loading',
          content: 'Modification en cours..',
          duration: 0
          });
        }
        else {
          loadingMessage.destroy()
        }
      }, [loading])
  

  const error = (content) => {
  
      messageApi.open({
        key:"error",
        type: 'error',
        content: content,
      });
    };
  
    const success = (content) => {
  
      messageApi.open({
        type: 'success',
        content: content,
      });
    };

  const [ressources, setRessources] = useState({villes:[], secteurs_activite: [], fonctions :[]})

    const getAndSetLogoEntreprise = useCallback(
    async (idLogo) => {
       try {
       const logoResult = await logoEntreprise(idLogo)
                if (logoResult.result) {
                  setLogo({logo:logoResult.logo,id:idLogo})
                }else{
                   if(logoResult && logoResult.status === 401) {
                    error("Votre session a expiré. Veuillez vous reconnecter..");
                    }
                    else {
            error("Nous rencontrons des problèmes lors du chargement des données du l'offre, veuillez ressayer plus tard !")
                    }
                }
    } catch (err) {
      console.error(err)
    }
    },
    [logoEntreprise ],
  )

  const getOffre = useCallback(
    async (id_offre) => {
       try {
        const offreResult = await getOffreToUpdate(id_offre)
        if (offreResult.result) {
          return {res: true, data:offreResult.offre}
        }else {
          if(offreResult && offreResult.status === 401) {
              error("Votre session a expiré. Veuillez vous reconnecter..");
              return {res: false, data:null}
                    }
                    else {
                      if (offreResult && offreResult.status === 404) {
                        setNotFound(true)
                        return {res: false, data:null}
                      }else {
                         error("Nous rencontrons des problèmes lors du chargement des données du l'offre, veuillez ressayer plus tard !")
            return {res: false, data:null}
                      }
                    }
        }
      } catch (err) {
        console.error(err)
      }
    },
    [getOffreToUpdate ],
  )

  const onChange = useCallback(
    async (file) => {
       try {
        setProcessingLogo(true)
        const formData = new FormData()
        formData.append("file", file.file)
        const updateResult = await updateLogoEntreprise(offre.entreprise.id, formData)
    if (updateResult.result) {
      success("Logo Modifié")
      const offreResult = await getOffre(id_offre)
      if(offreResult.res) {
        getAndSetLogoEntreprise(offreResult.data.entreprise.logo.id)
      }
    }
    else {
      if(updateResult && updateResult.status === 401) {
        
                    error("Votre session a expiré. Veuillez vous reconnecter..");
                    }
                    else {
                      
            error("Nous rencontrons des problèmes lors du chargement des données du l'offre, veuillez ressayer plus tard !")
                    }
    }
    } catch (err) {
     console.error(err) 
    } finally{
      setProcessingLogo(false)
    }
    },
    [offre, getAndSetLogoEntreprise, getOffre,updateLogoEntreprise,processingLogo],
  )

  const [notFound, setNotFound] = useState(false)

  

  const handleRemove = useCallback(
    async () => {
       try {
        setProcessingLogo(true)
       const deleteResult = await deleteLogo(offre.entreprise.id)
    if (deleteResult.result) {
      success("Logo supprimé")
      const offreResult = await getOffre(id_offre)
      if(offreResult.res) {
        getAndSetLogoEntreprise(offreResult.data.entreprise.logo.id)
      }
    }
    else {
      if(deleteResult && deleteResult.status === 401) {
                    error("Votre session a expiré. Veuillez vous reconnecter..");
                    }
                    else {
            error("Nous rencontrons des problèmes lors du chargement des données du l'offre, veuillez ressayer plus tard !")
                    }
    }
    } catch (err) {
     console.error(err) 
    }
    finally{
      setProcessingLogo(false)
    }
    },
    [getOffre, getAndSetLogoEntreprise, deleteLogo,offre, processingLogo],
  )
  
  useEffect(() => {
    const fetchRessoucres = async ()=> {
      const data =  await ressourcesAPI()
      setRessources(data)
    }
    fetchRessoucres()
  }, [])

  
  const onFinishFailed = () => {
    error("Vérifier que vous avez bien entrer les données")
  }

  const onFinish = useCallback(
    async () => {
      setLoading(true)
       console.log(updateData)
     try {
        const patchResult = await updateOffre(id_offre, updateData)
        if(!patchResult.result) {
         if(patchResult.status === 401 ) {
            error("Votre session a expiré. Veuillez vous reconnecter..");
        }
        else {
        error("Nous rencontrons des problèmes, veuillez ressayer plus tard !")
        }
        }else{
          success("Votre offre est bien modifié!")
        }
     } catch (e) {
      console.error(e)
     }
     finally{
      setLoading(false)
     }
    },
    [updateOffre, updateData],
  )

const validateMessages = {
  required: '${label} est obligatoire!',
};

const previousStep = () => {
  setCurrent(prev => prev - 1)
}

const nextStep = () => {
  setCurrent(prev => prev + 1)
}

  const steps = useMemo(() =>{ 
    const tableau = [
    {
      icon: <BriefcaseIcon style={{width:"24px", color:current === 0 ? '#1890ff' : (current < 0 ? '#666' : '#ffa94d')}}/>,
      key:"Informations sur l'offre",
      content: <UpdateJobFormJobForm setUpdateData= {setUpdateData} offre={offre} ressources={ressources} />
    },
    {      icon: <BuildingOfficeIcon style={{width:"24px",color: current === 1 ? '#1890ff' : (current < 1 ? '#666' : '#ffa94d'),
}}/>,

      key:"Informations sur l'entreprise",
      
      content: <UpdateJobFormCompanyForm onChange={onChange} handleRemove={handleRemove} setUpdateData={setUpdateData} offre={offre} ressources = {ressources} logo={logo} error={error} processingLogo={processingLogo}/>
    }, {
            icon: <LightBulbIcon style={{width:"24px", color: current === 2 ? '#1890ff' : (current < 2 ? '#666' : '#ffa94d')}}/>,

      key:"Compétences requises",
      
      content:<UpdateJobCompetencesJobForm/>
    }
  ]
    return tableau
  } 
    , [setUpdateData, offre, ressources, onChange, handleRemove, logo, current])


  const onChangeSteps = value => {
    setCurrent(value);
  };

  const recupererCompetences = (chnangedValues,allValues) => {
    if(allValues.competences){
      setUpdateData(prev => ({...prev, competences: allValues.competences}))
    }
  }

    useEffect(() => {
      
    
     console.log(notFound)
    }, [notFound])
    
 
   if (notFound) {
    return <div style={{height:"100%", display:"flex",justifyContent:"center",alignItems:"center"}}> <Empty description="404 - Page introuvable"/></div>
   }

    return <div style={{padding:"1rem"}}>
      <ArrowLeftCircleIcon style={{width:"36px", cursor:"pointer"}} onClick={() => navigate("/dashboard/offres")} />
    <Typography><h1 style={{fontWeight:"bold", fontSize:"30px"}}>Modifier votre offre d'emploi</h1>
    <p style={{color:"gray",marginBottom:"3rem"}}>Reremplire les champs souhaitables pour effectuer les modifications sur l'offre</p> </Typography>
    {!loadingOffreData ? <><ConfigProvider theme={{
    token: {
      colorPrimary: "#ffa94d"
    },
  }}> <Steps
        current={current}
        onChange={onChangeSteps} items={steps} style={{width:"80%", marginLeft:"auto", marginRight:"auto"}} /> </ConfigProvider>
    <Form 
    onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        layout="vertical"
        validateMessages={validateMessages}
        style={{  marginLeft:"auto", marginRight:"auto" , width:"50%"}}
        initialValues={{competences : offre.competences}}
        onValuesChange={recupererCompetences}
      >
 {contextHolder} {loadingContextHolder}
        
  <div style={{backgroundColor:" #f9fafb",
  borderRadius: "0.75rem",     
  padding:" 1.5rem",         
  marginBottom: "2rem", marginTop:"2rem"}}>
<div style={{ display: current === 0 ? 'block' : 'none' }}>{steps[0].content}</div>
<div style={{ display: current === 1 ? 'block' : 'none' }}>{steps[1].content}</div>
<div style={{ display: current === 2 ? 'block' : 'none' }}>{steps[2].content}</div> </div>

<div style={{display:"flex", justifyContent:"space-between"}}>

    <div style={{display:"flex", gap:"0.25rem"}}>
   <Button 
          type="primary"  
         disabled = {current === 0 ? true : false} onClick={previousStep}
        >
          Précédent
        </Button> 
        <Button onClick={() => navigate("/dashboard/offres")} 
          danger 
          type="primary"
        >
          Annuler
        </Button>   
</div>
    <Button 
          type="primary"
  style={{
    display: current === 2 ? "none" : "block"
  }}        onClick={nextStep}  
        >
          Suivant
        </Button>    
         <Button 
          type="primary"
          htmlType="submit" 
         style={{
          backgroundColor:"#ffa94d",
    display: current === 2 ? "block" : "none"
  }}     
        >
          Modifier
        </Button>         

</div>
                   </Form> </> : <div style={{width:"100%",display
          :"flex", height:"50vh",alignItems:"center" ,  justifyContent:"center" }}> <Spin size="large" /></div> }</div>  
}

export default UpdateJobOffreCoppy 
