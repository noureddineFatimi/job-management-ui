import { Button, Dropdown, Form, Image, Input, Select, Space, Spin, Upload } from "antd"
import FormItem from "antd/es/form/FormItem"
import { memo, useState } from "react"
import { DownOutlined, LoadingOutlined, UploadOutlined} from '@ant-design/icons';

const UpdateJobFormCompanyForm = memo(function update_job_form_company_form({setUpdateData, offre,ressources, logo, onChange, handleRemove, error, processingLogo }) {

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

  const items = [
    {
    key: '1',
    label: (
      <span onClick={handleRemove} >Supprimer</span>
    ),
    disabled: logo.id === 1 ? true : false,
    danger:true
  },
  {
    key: '2',
    label: (
      <div style={{ height: "2rem" }}> <Form.Item>
                        <Upload name="logo" maxCount={1} multiple={false} beforeUpload={beforeUpload} accept=".jpeg,.png" fileList={fileList} onChange={onChange} showUploadList={false} >
                           <span >
        {logo.id === 1 ? "Télécharger un logo" : "Changer le logo"}
      </span>
                        </Upload>
                    </Form.Item></div>
       
    )
    
  },
  
];

    

    return (
        <div>
        
          <p style={{fontSize: '16px',
          fontWeight: '600',
          color: '#666' ,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'}}>
      Informations sur l'entreprise {' '}{processingLogo && <Spin indicator={<LoadingOutlined spin />} />}
        </p>
       

<div style={{ position: "relative", marginBottom: "16px", display:"flex", justifyContent:"center", alignItems:"center" }}>
  
  <div
    style={{
      padding: "12px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e8e8e8",
      position: "relative"
    }}
  >
    <Image
      width={200}
      src={logo.logo}
      style={{
        borderRadius: "4px",
        maxHeight: "120px",
        objectFit: "contain"
      }}
    />

   

    <div
      style={{
        position: "absolute",
        top: "8px",
        right: "8px",
      }}
    >
      <Dropdown menu={{ items }} trigger={["click"]}>
        <a onClick={e => e.preventDefault()}>
          <Space>
            <DownOutlined style={{ fontSize: "16px", backgroundColor:"white", borderRadius:"10px",padding:"0.25rem",border:"1px solid" }} />
          </Space>
        </a>
      </Dropdown>
    </div>
  </div>
</div>


           <FormItem label={< span style={{fontWeight:"600"}}>Nom du l'entreprise</span>} name="nom_entreprise"  rules={[{ required: true, message:"Le nom du l'entreprise est obligatoire"} , {pattern:/^[a-zA-Z0-9_\-'\s]{2,15}$/, message: "Nom incovenable"}]}hasFeedback validateDebounce={1000}  initialValue={offre&& offre.entreprise&& offre.entreprise.nom_entreprise}>
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

          
  
        </div>
      )

})

export default UpdateJobFormCompanyForm
