import { DatePicker, Input, Select,Upload, Button, InputNumber, Card, message, Steps, Spin, Typography, ConfigProvider, Image, Empty } from "antd"
import Form from "antd/es/form/Form"
import FormItem from "antd/es/form/FormItem"
import { useState, useEffect } from "react"
import { ressourcesAPI, postOffre, uploadLogoToServer, getOffreToUpdate, logoEntreprise, deleteLogo, updateLogoEntreprise, updateOffre } from "../api/api"
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { BriefcaseIcon,  BuildingOfficeIcon, LightBulbIcon} from "@heroicons/react/24/outline";
import dayjs from "dayjs"
import { useParams } from "react-router-dom"


const UpdateJobOffre = () => {

  const { id_offre } = useParams();

  if (!/^\d+$/.test(id_offre)) {
    return <div style={{height:"100%", display:"flex",justifyContent:"center",alignItems:"center"}}> <Empty description="404 - Page introuvable"/></div>
    }

  const updateDate = (oldDate) => {
    const date = dayjs(oldDate)
    return date.set('hour', 23).set('minute', 59).set('second',0).set('millisecond',0)
  }

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

  const [fileList, setFileList] = useState([])

  const beforeUpload = (file) =>{
      const isAllowed = file.type === "image/jpeg" || file.type === "image/png";
       if (!isAllowed) {
        error("Seuls les fichiers jpeg ou png sont autorisés !")
        return Upload.LIST_IGNORE;
      }
    const isLt2M = file.size / 1024 / 1024 < 5
    if (!isLt2M) {
      error("Le fichier doit faire moins de 5 Mo !")
      return Upload.LIST_IGNORE
    }
      return false;
    }

    



    const onChange = async (file) => {
      try {
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
    }
  }

  const [notFound, setNotFound] = useState(false)
    const getOffre = async (id_offre) => {
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
    }

  const handleRemove = async () => {
    try {
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
  }

  const getAndSetLogoEntreprise =  async (idLogo) => {
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
   
  }
  
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

    const onFinish= async() => {
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
      }

const validateMessages = {
  required: '${label} est obligatoire!',
};

const previousStep = () => {
  setCurrent(prev => prev - 1)
}

const nextStep = () => {
  setCurrent(prev => prev + 1)
}

  const steps = [
    {
      icon: <BriefcaseIcon style={{width:"24px", color:current === 0 ? '#1890ff' : (current < 0 ? '#666' : 'green')}}/>,
      key:"Informations sur l'offre",
      content: (<div>
       <p style={{fontSize: '16px',
          fontWeight: '600',
          color: '#666' ,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'}}>
        Informations sur l'offre
        </p>
<FormItem label={< span style={{fontWeight:"600"}}>Titre</span>} name="titre" hasFeedback validateDebounce={1000}  rules={[{ required: true} , {pattern:/^[a-zA-Z0-9_'/\"\s]{2,35}$/, message: "Titre incovenable"}]} initialValue={offre.titre}>
            <Input placeholder="ex. Développeur Junior H/F" onChange={(value)=>setUpdateData(prev=>({...prev, titre:value.target.value}))} />
        </FormItem>
        <FormItem label={< span style={{fontWeight:"600"}}>Télétravail</span>} name="teletravail" required initialValue={offre.teletravail} >
             <Select 
              onChange={(value)=>setUpdateData(prev=>({...prev, teletravail:value}))}
                id="teletravailField"
                
                options={[
                  {
                    value: "Non",
                    label: "Non",
                  },
                  {
                    value:"Oui",
                    label:"Oui"
                  },
                  {
                    value:"Hybride",
                    label:"Hybride"
                  }
                ]}
              />
        </FormItem>

<FormItem label={< span style={{fontWeight:"600"}}>Niveau d'étude</span>} name="niveau_etude_requis" required initialValue={offre.niveau_etude_requis}>
             <Select
                id="niveau_etude_requisField"
                onChange={(value)=>setUpdateData(prev=>({...prev, niveau_etude_requis:value}))}
                options={[
                  {
                    value: "Qualification avant Bac",
                    label: "Qualification avant Bac",
                  },
                  {
                    value:"Autodidacte",
                    label:"Autodidacte"
                  },
                  {
                    value:"Bac",
                    label:"Bac"
                  },
                   {
                    value:"Bac +1",
                    label:"Bac +1"
                  },
                  {
                    value:"Bac +2",
                    label:"Bac +2"
                  },
                  {
                    value:"Bac +3",
                    label:"Bac +3"
                  },
                  {
                    value:"Bac +4",
                    label:"Bac +4"
                  },
                   {
                    value:"Bac +5 et plus",
                    label:"Bac +5 et plus"
                  },
                  
                ]}
              />
        </FormItem>



         <FormItem label={< span style={{fontWeight:"600"}}>Diplome</span>} name="diplome_requis" required initialValue={offre.diplome_requis}>
             <Select
                id="diplome_requisField"
                onChange={(value)=>setUpdateData(prev=>({...prev, diplome_requis:value}))}
                options={[
                  {
                    value: null,
                    label: "Aucun diplôme / Niveau scolaire",
                  },
                  {
                    value:"Diplôme de technicien (DT)",
                    label:"Diplôme de technicien (DT)"
                  },
                  {
                    value:"Diplôme de technicien spécialisé (DTS)",
                    label:"Diplôme de technicien spécialisé (DTS)"
                  },
                   {
                    value:"Baccalauréat",
                    label:"Baccalauréat"
                  },
                  {
                    value:"Licence",
                    label:"Licence"
                  },
                  {
                    value:"Master",
                    label:"Master"
                  },
                  {
                    value:"Doctorat",
                    label:"Doctorat"
                  },
                  
                ]}
              />
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Type de contrat</span>} name="type_offre" required initialValue={offre.type_offre}> 
            <Select
            onChange={(value)=>setUpdateData(prev=>({...prev, type_offre:value}))}
                id="type_offreField"
                options={[
                  {
                    value: "Autre contrat",
                    label: "Autre",
                  },
                  {
                    value:"CDD",
                    label:"CDD"
                  },
                   {
                    value:"CDI",
                    label:"CDI"
                  },
                   {
                    value:"Intérim",
                    label:"Intérim"
                  },
                   {
                    value:"Stage",
                    label:"Stage"
                  }
                ]}
              />
        </FormItem>


        <FormItem label={< span style={{fontWeight:"600"}}>Ville</span>} name="id_ville_offre" required initialValue={offre&& offre.ville && offre.ville.id}>
            <Select
                id="id_ville_offreField"
                showSearch
                onChange={(value)=>setUpdateData(prev=>({...prev,ville_id:value}))}
                options={ ressources?.villes ? [
                   ...ressources.villes.map( ville => (
                   { value: ville.id,
                    label: ville.nom_ville}
                  )
                  )
                ]: []}
              />
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Secteur d'activté</span>} name="id_secteur_activite" required initialValue={offre && offre.secteur_activite && offre.secteur_activite.id}>
            <Select
                id="id_secteur_activiteField"
             onChange={(value)=>setUpdateData(prev=>({...prev,secteur_activite_id:value}))}
                showSearch
                options={ ressources?.secteurs_activite ? [
                  ...ressources.secteurs_activite.map( secteur => (
                   { value: secteur.id,
                    label: secteur.nom_secteur}
                  )
                  )
                ] : []}
              />
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Fonction</span>} name="id_fonction" required initialValue={offre && offre.fonction && offre.fonction.id}>
            <Select
                id="id_fonctionField"
                showSearch
              onChange={(value)=>setUpdateData(prev=>({...prev, fonction_id:value}))}
                options={ ressources?.fonctions ? [
                  ...ressources.fonctions.map( fct => (
                   { value: fct.id,
                    label: fct.nom_fonction}
                  )
                  )
                ] : []}
              />
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Nombre d'employés demandé</span>} name="nbr_employes_demande" required initialValue={offre.nbr_employes_demande}>
          <InputNumber min={1} style={{width:"50%"}} onChange={(value)=>setUpdateData(prev=>({...prev, nbr_employes_demande:value}))} />
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600" }}>Salaire minimum</span>} name="salaire_min" initialValue={offre.salaire_min}>
          <InputNumber min={1} placeholder="Non défini" style={{width:"50%"}} onChange={(value)=>setUpdateData(prev=>({...prev, salaire_min:value}))}/>
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Salaire maximum</span>} name="salaire_max" initialValue={offre.salaire_max}>
          <InputNumber min={1} placeholder="Non défini" style={{width:"50%"}} onChange={(value)=>setUpdateData(prev=>({...prev, salaire_max:value}))}/>
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Minimum d'années d'expérience</span>} name="annee_experience_min" initialValue={offre.annees_experience_min}>
          <InputNumber min={1}  placeholder="Non défini" style={{width:"50%"}} onChange={(value)=>setUpdateData(prev=>({...prev, annees_experience_min:value}))}/>
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Maximum d'années d'expérience</span>} name="annee_experience_max" initialValue={offre.annees_experience_max}>
          <InputNumber min={1} placeholder="Non défini" style={{width:"50%"}} onChange={(value)=>setUpdateData(prev=>({...prev, annees_experience_max:value}))}/>
        </FormItem>

      <FormItem label={< span style={{fontWeight:"600"}}>Description</span>} name="description" initialValue={offre.description}>
        <Input.TextArea maxLength={100} placeholder="description sur l'offre.." onChange={(value)=>setUpdateData(prev=>({...prev, description:value.target.value}))}/>
      </FormItem> 

                <FormItem label={< span style={{fontWeight:"600"}}>Date limit de Postulation</span>} name="deadline_postulation" rules={[{required: true}]} initialValue={dayjs(offre.deadline_postulation)}>
                  <DatePicker style={{width:"50%"}} onChange={(value)=>setUpdateData(prev=>({...prev, deadline_postulation:updateDate(new Date(value))}))}/>
                </FormItem>
      </div>)
    },
    {      icon: <BuildingOfficeIcon style={{width:"24px",color: current === 1 ? '#1890ff' : (current < 1 ? '#666' : 'green'),
}}/>,

      key:"Informations sur l'entreprise",
      
      content: (
        <div>
          <p style={{fontSize: '16px',
          fontWeight: '600',
          color: '#666' ,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'}}>
      Informations sur l'entreprise
        </p>
           <FormItem label={< span style={{fontWeight:"600"}}>Nom du l'entreprise</span>} name="nom_entreprise"  rules={[{ required: true} , {pattern:/^[a-zA-Z0-9_\-'\s]{2,15}$/, message: "Nom incovenable"}]}hasFeedback validateDebounce={1000}  initialValue={offre&& offre.entreprise&& offre.entreprise.nom_entreprise}>
            <Input placeholder="ex. Capgemini" onChange={(value)=>setUpdateData(prev=>({...prev, entreprise:{...prev.entreprise, nom_entreprise:value.target.value}}))}/>
        </FormItem>
<FormItem label={< span style={{fontWeight:"600"}}>Ville</span>} name="ville_id_entreprise" required initialValue={ offre && offre.entreprise && offre.entreprise.ville.id}>
             <Select
                id="id_ville_entreprise_Field"
                showSearch
                onChange={(value)=>setUpdateData(prev=>({...prev, entreprise:{...prev.entreprise,ville_id:value}}))}
                options={ressources?.villes ? [
                  ...ressources.villes.map( ville => (
                   { value: ville.id,
                    label: ville.nom_ville}
                  )
                  )
                ] : []}
              />
        </FormItem>

         <FormItem label={< span style={{fontWeight:"600"}}>Adresse</span>} name="adresse" initialValue={offre && offre.entreprise&& offre.entreprise.adresse}>
        <Input.TextArea maxLength={50} placeholder="adresse du l'entreprise.." onChange={(value)=>setUpdateData(prev=>({...prev, entreprise:{...prev.entreprise,adresse:value.target.value}}))}/>
      </FormItem>

                {logo.logo &&  <Image
    width={200}
    src={logo.logo}
  />}

  <Button color="red" onClick={handleRemove} disabled={logo.id === 1}> Supprimer l'image</Button>

         <Form.Item label={< span style={{fontWeight:"600"}}>Logo du l'entreprise</span>}>
                        <Upload name="logo" maxCount={1} multiple={false} beforeUpload={beforeUpload} accept=".jpeg,.png" fileList={fileList} onChange={onChange}>
                          <Button type="primary" icon={<UploadOutlined />}>
                                Télécharger une image
                                </Button>
                        </Upload>
                    </Form.Item>
        </div>
      )
    }, {
            icon: <LightBulbIcon style={{width:"24px", color: current === 2 ? '#1890ff' : (current < 2 ? '#666' : 'green')}}/>,

      key:"Compétences requises",
      
      content:(
        <div>
           <p style={{fontSize: '16px',
          fontWeight: '600',
          color: '#666' ,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'}}>
Compétences requises        </p>
          <Form.List name="competences">
        {(fields, { add, remove }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields.map(field => (
              <Card
                size="small"
                title={`Comptence ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <FormItem  name={[field.name, 'nom_competence']}  rules={[{ required: true} , {pattern:/^[a-zA-Z\s]{5,15}$/, message: "Nom incovenable"}]} hasFeedback validateDebounce={1000} >
                  <Input placeholder="ex. Java"/>
                </FormItem>
                <FormItem  name={[field.name, 'niveau']} required initialValue={null}>
                   <Select 
                id="niveauField"
                options={[
                   {
                    value:null,
                    label: "Niveau non requis",
                  },
                  {
                    value: "Novice",
                    label: "Novice",
                  },
                  {
                    value:"Intermédiaire ",
                    label:"Intermédiaire "
                  },
                  {
                    value:"Avancé",
                    label:"Avancé"
                  }
                ]}
              />
                </FormItem>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Ajouter une comptence
            </Button>
          </div>
        )}
      </Form.List>
                <div>              
                </div>
       
      
        </div>
      )
    }
  ]

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
    <Typography><h1 style={{fontWeight:"bold", fontSize:"30px"}}>Modifier votre offre d'emploi</h1>
    <p style={{color:"gray",marginBottom:"3rem"}}>Reremplire les champs souhaitables pour effectuer les modifications sur l'offre</p> </Typography>
    {!loadingOffreData ? <><ConfigProvider theme={{
    token: {
      colorPrimary: "#52c41a"
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

   <Button 
          type="primary"  
         disabled = {current === 0 ? true : false} onClick={previousStep}
        >
          Précédent
        </Button>   

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
          backgroundColor:"orange",
    display: current === 2 ? "block" : "none"
  }}     
        >
          Modifier
        </Button>         

</div>
                   </Form> </> : <div style={{width:"100%",display
          :"flex", height:"50vh",alignItems:"center" ,  justifyContent:"center" }}> <Spin size="large" /></div> }</div>  
}

export default UpdateJobOffre