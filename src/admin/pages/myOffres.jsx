import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Tag, Typography, Space, Popconfirm, Table, Button, Drawer,message, Spin } from "antd";
import { useEffect, useState } from "react";
import {DollarOutlined} from "@ant-design/icons"
import { logoEntreprise, myOffres, deleteOffre } from "../api/api";
import { useNavigate } from "react-router-dom";

const MyOffres = () => {

    const navigate = useNavigate();

  const tagging_type_offre = (typeOffre) => {
    switch (typeOffre) {
        case "CDI":
            return <Tag color="red">{typeOffre}</Tag>
        case "CDD" :
            return <Tag color="lime">{typeOffre}</Tag>
        case "Stage" :
            return <Tag color="volcano">{typeOffre}</Tag>
        case "Autre contrat" :
            return <Tag color="default">{typeOffre}</Tag>
        case "Intérim" :
            return <Tag color="purple">{typeOffre}</Tag>   
    }
}

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    render: id => <a onClick={() => onClick(id)}>{id}</a>
  },
  {
    title: 'Titre',
    dataIndex: 'titre',
    key: 'titre',
    render: titre => <span style={{fontWeight:"500"}}>{titre}</span>
  },
  {
    title: 'Ville',
    dataIndex: ["ville", "nom_ville"],
    key: 'ville',
  },
  {
    title: 'Type de contrat',
    dataIndex: 'type_offre',
    key: 'type_offre',
    render: type_offre => tagging_type_offre(type_offre)
  },
  {
    title: 'Date limite de Postulation',
    dataIndex: 'deadline_postulation',
    key: 'deadline_postulation',
    render: deadline_postulation => <span>{new Date(deadline_postulation).toLocaleDateString()}</span>
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
        <Space>
          <Button type="link" onClick={()=>onClickUpdate(record.id)} icon={<ArrowPathIcon style={{width:"16px"}}/>}>Modifier</Button>
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer cette offre ?"
            okText="Oui"
            cancelText="Non"
            onConfirm={()=>onClickDelete(record.id)}
          >
            <Button danger type="link" icon={<TrashIcon style={{width:"16px"}}/>}>Supprimer</Button>
          </Popconfirm>
        </Space>
      ),
  },
];
const salaire = (salaire_min, salaire_max) => {
    if (salaire_max !== null || salaire_min !== null) {
      if (salaire_max !== null && salaire_min !== null) {
        return <span>
                          <DollarOutlined /> {  (
                <>
                  {salaire_max} - {salaire_min} dh &nbsp;
                </>
              )} </span>
      }
      if (salaire_min !== null) {
        return <span>
                  min: {salaire_min} dh &nbsp;
                </span>
      }
      if (salaire_max !== null) {
         <span>
                
                  max: {salaire_max} dh
                </span>
      }
    }
    return <span>Non défini</span>
  }

  const experience = (min, max) => {
    if (max !== null || min !== null) {
      if (max !== null && min !== null) {
        return <span>
                        
                <>
                  {max} - {min} ans &nbsp;
                </>
              </span>
      }
      if (min !== null) {
        return <span>
                  min: {min} ans &nbsp;
                </span>
      }
      if (max !== null) {
         <span>
                
                  max: {max} ans
                </span>
      }
    }
    return <span>Non défini</span>
  }

  const [offres, setOffres] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const [loadingMessage, loadingContextHolder] = message.useMessage()
  const [loadingState, setLoadingState] = useState(false)
   useEffect(() => {
        if (loadingState === true) {
          loadingMessage.open({
            key:"loading",
          type: 'loading',
          content: 'Suppression en cours..',
          duration: 0
          });
        }
        else {
          loadingMessage.destroy()
        }
      }, [loadingState])

  const error = (content) => {
      messageApi.open({
        key:"error",
        type: 'error',
        content: content,
      });
    };

    const succes = (content) => {
      messageApi.open({
        key:"success",
        type: 'success',
        content: content,
      });
    };

    const [loading, setLoading]= useState(true)
    const [reload, setReload]=useState(false)
  useEffect(() => {
    setLoading(true)
   const fetchData = async () => {
    try {
      const result = await myOffres()
    if (result && result.result) {
      console.log(result.offres)
      setOffres(result.offres)
    }else {
      if(result && result.status === 401 ) {
        error("Votre session a expiré. Veuillez vous reconnecter..");
      }else {
        error("Nous rencontrez des problèmes, veuillez ressayer plus tard !")
      }
    }
    } catch (e) {
      console.error(e)
    }finally {
      setLoading(false)
    }
   }
   fetchData()
  }, [reload])
  
    const [open, setOpen] = useState(false)

    const [showedOffre, setShowedOffre] = useState({})

    const [logo, setLogo] = useState(null)

  const onClick = async (id) => {
    try{
      let logo_id
    offres.map(offre => 
    {
      if (offre.id === id) {
        logo_id = offre.entreprise.logo.id
        setShowedOffre(offre)
        setOpen(true)
      }
    }
    )
    const logoresult = await logoEntreprise(logo_id)
    if (logoresult && logoresult.result) {
      setLogo(logoresult.logo)
    }else {
      if(logoresult && logoresult.status === 401 ) {
        error("Votre session a expiré. Veuillez vous reconnecter..");
      }else {
        error("Nous rencontrez des problèmes, veuillez ressayer plus tard !")
      }
    }
    } catch (e) {
      console.error(e)
    }
  }

  const closeDrawer = () =>{
    setOpen(false)
  }

  const onClickUpdate = (id) => {
    navigate(`edit/${id}`)
  }

  const onClickDelete = async (id) => {
  try {
    setLoadingState(true)
    const deleteResult = await deleteOffre(id)
  if (deleteResult && deleteResult.result) {
      succes("Offre supprimé avec succés")
      setReload(prev => !prev)
    }else {
      if(deleteResult && deleteResult.status === 401 ) {
        error("Votre session a expiré. Veuillez vous reconnecter..");
      }else {
        error("Nous rencontrez des problèmes, veuillez ressayer plus tard !")
      }
    }
    } catch (e) {
      console.error(e)
    }finally {
      setLoadingState(false)
    }
  }
  
    return  <div style={{padding:"1rem"}}> {contextHolder} {loadingContextHolder}
        <Typography><h1 style={{fontWeight:"bold", fontSize:"30px"}}>Mes Offres d'Emploi</h1>
        <p style={{color:"gray",marginBottom:"3rem"}}>Gérez toutes vos offres publiées</p> </Typography>
        

         {loading ? <div style={{width:"100%",display
          :"flex", height:"50vh",alignItems:"center" ,  justifyContent:"center" }}> <Spin size="large" /></div> : <Table columns={columns} dataSource={offres}/>}
    
<Drawer
  placement="right"
  open ={open}
  closeIcon={true}
  onClose={closeDrawer}
  title="Informations sur l'offre"
  size="large"
  style={{      backgroundColor: '#f5f5f5',

            boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.1)',
}}
>
  <div style={{display:"flex", flexDirection:"column", backgroundColor:"#fff",
      borderRadius: '12px',
      padding: '24px',
      color: 'white',
      marginBottom: '20px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)', gap:"0.4rem"}}>
        <div style={{display:"flex", gap:"2rem"}}>
{logo && <img src={logo} alt="logo" style={{height:"45px"}} />}
    <div style={{display:"flex", flexDirection:"column"}}>
        <span  style={{ fontSize: '24px',
      fontWeight: 'bold',
      margin: '0 0 8px 0', color:"black"}}>{showedOffre && showedOffre.entreprise && showedOffre.entreprise.nom_entreprise}</span>
        <span  style={{ opacity: 0.9,
      fontSize: '14px', color:"black"}}>{showedOffre && showedOffre.entreprise && showedOffre.entreprise.adresse}</span>
    </div>
      </div>
  <div style={{fontSize: '32px',
      fontWeight: 'bold', marginBottom:"1rem", color:"black"}}>{showedOffre.titre}</div>
<div style={{ display: 'flex',
      gap: '8px',
      flexWrap: "wrap"}}>
    



    <Tag color="red" >{showedOffre.type_offre}</Tag>
    <Tag color="cyan" >Téleravail: {showedOffre.teletravail}</Tag>
        <Tag color="red">{showedOffre.nbr_candidats} candidature(s)</Tag>        </div>

      </div>



      <div style={{ display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '16px',
      marginBottom: '20px'}}>

        <div style={{ backgroundColor: 'white',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'}} >
        <div style={{fontSize: '14px',
      color: '#666',
      marginBottom: '8px'}}>Salaire</div>
            <div style={{fontSize: '18px',
      fontWeight: 'bold',
      color: '#1890ff'}}>
                {salaire(showedOffre.salaire_min,showedOffre.salaire_max)}
            </div>
        </div>

          <div style={{backgroundColor: 'white',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'}} >
        <div style={{fontSize: '14px',
      color: '#666',
      marginBottom: '8px'}}>Expérince</div>
            <div style={{fontSize: '18px',
      fontWeight: 'bold',
      color: '#1890ff'}}>
                {experience(showedOffre.annees_experience_min, showedOffre.annees_experience_max)}
            </div>
        </div>

 <div style={{ backgroundColor: 'white',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'}} >
        <div style={{fontSize: '14px',
      color: '#666',
      marginBottom: '8px'}}>Poste</div>
            <div style={{fontSize: '18px',
      fontWeight: 'bold',
      color: '#1890ff'}}>
                {showedOffre.nbr_employes_demande}
            </div>
        </div>
      </div>
<div style={{backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'}}>

<div style={{ fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '16px',
      color: '#333',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'}}>Détail du poste</div>

    <div style={{ display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'}}>
    <div style={{      marginBottom: '12px'
}}>
<span style={{ fontWeight: 'bold',
      marginBottom: '4px',
      display: 'block'}}> Secteur d'activité</span>
<Tag style={{marginTop:".2rem"}}  color="#108ee9" >{ showedOffre && showedOffre.secteur_activite &&showedOffre.secteur_activite.nom_secteur}</Tag>
    </div>

    
    <div style={{      marginBottom: '12px'
}}>
<span style={{ fontWeight: 'bold',
      marginBottom: '4px',
      display: 'block'}}> Fonction</span>
 <Tag style={{marginTop:"0.2rem"}} color="#f50">{showedOffre && showedOffre.fonction && showedOffre.fonction.nom_fonction}</Tag>
    </div>
     
    <div style={{      marginBottom: '12px'
}}>
<span style={{ fontWeight: 'bold',
      marginBottom: '4px',
      display: 'block'}}> Diplome requis</span>
 <div > {showedOffre.diplome_requis}</div>
    </div>
     
    <div style={{      marginBottom: '12px'
}}>
<span style={{ fontWeight: 'bold',
      marginBottom: '4px',
      display: 'block'}}> Niveau d'étude</span>
 <div  >{showedOffre.niveau_etude_requis}</div>
    </div>
    
    <div style={{      marginBottom: '12px'
}}>
<span style={{ fontWeight: 'bold',
      marginBottom: '4px',
      display: 'block'}}>Lieu</span>
 <div > {showedOffre && showedOffre.ville && showedOffre.ville.nom_ville}</div>
    </div>
    
    <div style={{      marginBottom: '12px'
}}>
<span style={{ fontWeight: 'bold',
      marginBottom: '4px',
      display: 'block'}}> Date limite de postulation</span>
 <div>{new Date(showedOffre.deadline_postulation).toLocaleDateString()}</div>
    </div>
</div>
</div>

<div style={{backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'}}>
<div style={{fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '16px',
      color: '#333',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'}}>Description</div>
      <p style={{ lineHeight: '1.6', color: '#333' }}>{showedOffre.description}</p>
</div>

<div style={{backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'}}>
<div style={{fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '16px',
      color: '#333',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'}}>Compétences requises</div>

 { showedOffre && showedOffre.competences &&showedOffre.competences.map((competence, index) => (
                <span 
                  key={index}
                  style={{
                     display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '16px',
      color: 'white',
      fontSize: '12px',
      fontWeight: '500',
      marginRight: '8px',
      marginBottom: '8px', 
                    background:"#fa8c16"
                  }}
                >
                  {competence.nom_competence} - {competence.niveau}
                </span>
              ))}

 
      </div>
<div style={{backgroundColor: '#fafafa',
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '24px',
      fontSize: '14px',
      color: '#666'}}>
            <div> Publié le: {new Date(showedOffre.created_at).toLocaleDateString()}</div>
          </div>
</Drawer>
         </div>
}
export default MyOffres