import { DatePicker, Input, Select,Upload, Button, InputNumber, Card, message, Steps, Divider, Typography, ConfigProvider, Image } from "antd"
import Form from "antd/es/form/Form"
import FormItem from "antd/es/form/FormItem"
import { useState, useEffect } from "react"
import { ressourcesAPI, postOffre, uploadLogoToServer } from "../api/api"
import { CloseOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { BriefcaseIcon,  BuildingOfficeIcon, LightBulbIcon} from "@heroicons/react/24/outline";

const AddJobOffre = () => {

  const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

   const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Ajouter Image</div>
    </button>
  );

const [current, setCurrent] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();
  const [loadingMessage, loadingContextHolder] = message.useMessage()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
        if (loading === true) {
          loadingMessage.open({
            key:"loading",
          type: 'loading',
          content: 'Postulation en cours..',
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
      return Upload.LIST_IGNORE;
    }
      return false;
    }

    const handleChange = ({ fileList: newList }) => {
    setFileList(newList);
  };

  const handleRemove = (file) => {
    setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const ajouterLogo = async () => {
      if (fileList.length === 0) {
      return 1;
    }
    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj);
    try {
      const uploadResult = await uploadLogoToServer(formData)
      if (!uploadResult.result) {
        if(uploadResult.status === 401 ) {
            error("Votre session a expiré. Veuillez vous reconnecter..");
        }
        else {
        error("Nous rencontrons des problèmes, veuillez ressayer plus tard !")
        }
      }
      return uploadResult.logo_id
    } catch (err) {
      console.error(err)
      return false
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

    const onFinish= async (values) => {
      console.log(values.deadline_postulation)
     try {
      setLoading(true)
       const fichier_id = await ajouterLogo()
      if(!fichier_id) {
        console.error("erreur")
        return
      }
        const data = {...values}
        for (let key in data) {
          if (data[key] === undefined || (Array.isArray(data[key]) && data[key].length === 0)) {
            data[key] = null
          }
        }
        const date = new Date(values.deadline_postulation.$y, values.deadline_postulation.$M, values.deadline_postulation.$D, 23,59)
        const postResult = await postOffre({...data, fichier_id: fichier_id, deadline_postulation: date})
        if(!postResult.result) {
         if( postResult.status === 401 ) {
            error("Votre session a expiré. Veuillez vous reconnecter..");
        }
        else {
        error("Nous rencontrons des problèmes, veuillez ressayer plus tard !")
        }
        }else{
          success("Votre offre est bien ajouté!")
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
<FormItem label={< span style={{fontWeight:"600"}}>Titre</span>} name="titre" hasFeedback validateDebounce={1000}  rules={[{ required: true, message:"Le titre est obligatoire"} , {pattern:/^[a-zA-Z0-9_'/\"\s]{2,35}$/, message: "Titre incovenable"}]}>
            <Input placeholder="ex. Développeur Junior H/F" />
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Télétravail</span>} name="teletravail" required initialValue="Non">
             <Select 
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

<FormItem label={< span style={{fontWeight:"600"}}>Niveau d'étude</span>} name="niveau_etude_requis" required initialValue="Qualification avant Bac">
             <Select
                id="niveau_etude_requisField"
                
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



         <FormItem label={< span style={{fontWeight:"600"}}>Diplome</span>} name="diplome_requis" required initialValue={null}>
             <Select
                id="diplome_requisField"
                
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

        <FormItem label={< span style={{fontWeight:"600"}}>Type de contrat</span>} name="type_offre" required initialValue="Autre contrat"> 
            <Select
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
                  },
                   {
                    value:"Freelance",
                    label:"Freelance"
                  }
                ]}
              />
        </FormItem>


        <FormItem label={< span style={{fontWeight:"600"}}>Ville</span>} name="id_ville_offre" required initialValue={1}>
            <Select
                id="id_ville_offreField"
                showSearch
                
                options={ ressources?.villes ? [
                   ...ressources.villes.map( ville => (
                   { value: ville.id,
                    label: ville.nom_ville}
                  )
                  )
                ]: []}
              />
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Secteur d'activté</span>} name="id_secteur_activite" required initialValue={1}>
            <Select
                id="id_secteur_activiteField"
             
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

        <FormItem label={< span style={{fontWeight:"600"}}>Fonction</span>} name="id_fonction" required initialValue={1}>
            <Select
                id="id_fonctionField"
                showSearch
              
                options={ ressources?.fonctions ? [
                  ...ressources.fonctions.map( fct => (
                   { value: fct.id,
                    label: fct.nom_fonction}
                  )
                  )
                ] : []}
              />
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Nombre d'employés demandé</span>} name="nbr_employes_demande" required initialValue={1}>
          <InputNumber min={1} style={{width:"50%"}}/>
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600" }}>Salaire minimum</span>} name="salaire_min">
          <InputNumber min={1} placeholder="Non défini" style={{width:"50%"}} />
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Salaire maximum</span>} name="salaire_max">
          <InputNumber min={1} placeholder="Non défini" style={{width:"50%"}}/>
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Minimum d'années d'expérience</span>} name="annee_experience_min">
          <InputNumber min={1}  placeholder="Non défini" style={{width:"50%"}}/>
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Maximum d'années d'expérience</span>} name="annee_experience_max">
          <InputNumber min={1} placeholder="Non défini" style={{width:"50%"}}/>
        </FormItem>

      <FormItem label={< span style={{fontWeight:"600"}}>Description</span>} name="description">
        <Input.TextArea maxLength={1000} placeholder="description sur l'offre.."/>
      </FormItem>

                <FormItem label={< span style={{fontWeight:"600"}}>Date limite de Postulation</span>} name="deadline_postulation" rules={[{required: true, message:"La date limite de postulation est obligatoire"}]} >
                  <DatePicker style={{width:"50%"}}/>
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
           <FormItem label={< span style={{fontWeight:"600"}}>Nom du l'entreprise</span>} name="nom_entreprise"  rules={[{ required: true, message:"Le nom du l'entreprise est obligatoire"} , {pattern:/^[a-zA-Z0-9_\-'\s]{2,15}$/, message: "Nom incovenable"}]}hasFeedback validateDebounce={1000}  >
            <Input placeholder="ex. Capgemini"/>
        </FormItem>

<FormItem label={< span style={{fontWeight:"600"}}>Ville</span>} name="ville_id_entreprise" required initialValue={1}>
             <Select
                id="id_ville_entreprise_Field"
                showSearch
                
                options={ressources?.villes ? [
                  ...ressources.villes.map( ville => (
                   { value: ville.id,
                    label: ville.nom_ville}
                  )
                  )
                ] : []}
              />
        </FormItem>

         <FormItem label={< span style={{fontWeight:"600"}}>Adresse</span>} name="adresse">
        <Input.TextArea maxLength={50} placeholder="adresse du l'entreprise.."/>
      </FormItem>




             






         <Form.Item label={< span style={{fontWeight:"600"}}>Logo du l'entreprise</span>}>
                        <Upload name="logo" maxCount={1} multiple={false} beforeUpload={beforeUpload} fileList={fileList} listType="picture-card" onChange={handleChange} onRemove={handleRemove} accept=".jpeg,.png" onPreview={handlePreview}>
                          {uploadButton}
                        </Upload>
 {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: visible => setPreviewOpen(visible),
            afterOpenChange: visible => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
                        

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

                <FormItem  name={[field.name, 'nom_competence']}  rules={[{ required: true,message:"Le nom du competence à inserer est obligatoire"} , {pattern:/^[a-zA-Z\s]{5,15}$/, message: "Nom incovenable"}]} hasFeedback validateDebounce={1000} >
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
                    value:"Intermédiaire",
                    label:"Intermédiaire"
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
    return <div style={{padding:"1rem"}}>
    <Typography><h1 style={{fontWeight:"bold", fontSize:"30px"}}>Créer un offre d'emploi</h1>
    <p style={{color:"gray",marginBottom:"3rem"}}>Remplissez les informations pour publier votre offre</p> </Typography>
    <ConfigProvider theme={{
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
          backgroundColor:"rgba(22, 163, 88, 1)",
    display: current === 2 ? "block" : "none"
  }}     
        >
          Publier
        </Button>         

</div>
                   </Form></div>
}

export default AddJobOffre