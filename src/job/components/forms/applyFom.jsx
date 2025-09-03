import { message} from 'antd';
import {  useState, useEffect } from "react";
import {InboxOutlined} from "@ant-design/icons"
import instance from "../../api/api"
import { Button, Form, Input, Upload} from 'antd';

const ApplyForm =  ({loading, deadline_postulation, idOffre}) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [loadingMessage, loadingContextHolder] = message.useMessage()
      const [loadingMessageState, setLoadingMessageState] = useState(false)

      useEffect(() => {
              if (loadingMessageState === true) {
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
            }, [loadingMessageState])
        

const error = (content) => {

    messageApi.open({
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

  
  const [fileList, setFileList] = useState([])

  const beforeUpload = (file) =>{
    const isAllowed = file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
     if (!isAllowed) {
      error("Seuls les fichiers PDF ou DOCX sont autorisés !")
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

  const ajouterCV = async () => {
    if (fileList.length === 0) {
      error("Ajouter votre cv !")
    return false;
  }
  const formData = new FormData();
  formData.append("file", fileList[0].originFileObj);
  try {
    const response = await instance.post("candidats/cv", formData)
    return response.data.id_fichier
  } catch (err) {
    error("Nous rencontrons des problèmes, veuillez ressayer plus tard !")
    console.error(err)
    return false
  }
  }

const validateMessages = {
  required: '${label} est obligatoire!',
  types: {
    email: '${label} est non valide!',
  }
};

const onFinish = async (values) => {
  try {
    setLoadingMessageState(true)
    const id_fichier = await ajouterCV()
    if (!id_fichier) {
      console.error("Erreur : CV non uploadé !");
      return;
    }  
    const data = {...values, cv_id: id_fichier}
    const response = await instance.post(`offres/${idOffre}/postuler`, data);
    success("Votre candidature est prise en compte !")
    console.log(response.data);
  } catch (err) {
    if(err.response.data.detail === "Vous avez déjà posté à cet offre") {
      error(err.response.data.detail)
    }
    else {
      error("Nous rencontrons des problèmes, veuillez ressayer plus tard !")
    }
    console.error(err)
  }
  finally{
    setLoadingMessageState(false)
  }
}

      const deadline = (deadline_postulation) => {
    const dateLimite = new Date(deadline_postulation)
    const dateActuelle = new Date()
    if (dateLimite > dateActuelle) {

      return true
    }
    return false
  }

    return <> {contextHolder}{loadingContextHolder}{!loading && <div>
        <div style={{ display:"flex",justifyContent:"center", fontSize: "30px", color: "#7253ce "}}><h3>Postulez maintenant!</h3></div>
<div style={{display:"flex", justifyContent: "center"}}>

     {deadline(deadline_postulation) ? <Form
    layout='vertical'
    name="candidature-form"
    onFinish={onFinish}
    style={{ width: "50%" }}
    validateMessages={validateMessages}
  >
    <Form.Item name='nom' label={<span style={{fontWeight:"500"}}>Nom</span>} validateDebounce={1000} hasFeedback rules={[{ required: true} , {pattern:/^[a-zA-Z\-\s]{3,10}$/, message: "Nom inconvable"}]}>
      <Input />
    </Form.Item>
    <Form.Item name='prenom' label={<span style={{fontWeight:"500"}}>Prénom</span>}  hasFeedback validateDebounce={1000}  rules={[{ required: true} , {pattern:/^[a-zA-Z\-\s]{3,10}$/, message: "Prénom incovenable"}]}>
      <Input />
    </Form.Item>
    <Form.Item name='email' label={<span style={{fontWeight:"500"}}>Email</span>} hasFeedback validateDebounce={1000}  rules={[{ type: 'email', required:true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="numero_tel" label={<span style={{fontWeight:"500"}}>Numero de télephone</span>} validateDebounce={1000}  hasFeedback rules={[{ required: true}, {pattern:/^(05|06|07)\d{8}$/ , message:"Numero de télephone incovenable"}]}>
        <Input addonBefore="+212" />
    </Form.Item>
   <Form.Item label={<span style={{fontWeight:"500"}}>CV</span>} required = "true">
        <Upload.Dragger name="cv"  maxCount={1} multiple={false} fileList={fileList} beforeUpload={beforeUpload} onChange={handleChange} onRemove={handleRemove} accept=".pdf,.docx" >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Cliquer ou glisser pour l'upload de votre cv</p>
          <p className="ant-upload-hint">Ajouter un seul cv</p>
        </Upload.Dragger>
    </Form.Item>
    <Form.Item label={null}>
      <Button type="primary" htmlType="submit" style={{width:"100%"}}>
        Postuler
      </Button>
    </Form.Item>
  </Form>:  <div style={{ color: "red", fontWeight: "bold" }}>
          La date limite de postulation est dépassée!
        </div>}

      
</div>
</div>} </>
}

export default ApplyForm