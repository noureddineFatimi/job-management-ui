import {  Button, Form, Input,message } from 'antd';
import { useState, useEffect } from 'react';
import { deconnexion, updateProfil } from '../../api/api';

const UpdateForm = ({user}) => {

    const [messageApi, contextHolder] = message.useMessage();
        const [succesMessageApi, succesContextHolder] = message.useMessage();

    const [loading, setLoading] = useState(false)
    const [errorMessageApi, errorContextHolder] = message.useMessage();
    const [data, setData] = useState({})

    const displayError = (content)=> {
      errorMessageApi.open({type:"error", content:content})
    }

 const success = (content) => {
      succesMessageApi.open({
        key:"success",
        type: 'success',
        content: content,
      });
    };

   useEffect(() => {
      if (loading === true) {
        messageApi.open({
        type: 'loading',
        content: 'Modifcation en cours..',
        duration: 0
        });
      }
      else {
        messageApi.destroy()
      }
    }, [loading])


   
   const validateMessages = {
  required: '${label} est obligatoire!',
  types: {
    email: '${label} est non valide!',
  }
    };

    const onFinish = async () => {
      try {
        setLoading(true)
        const {confirmed_password, ...informations} = data
        const updateResult = await updateProfil(informations)
        if (updateResult.result) {
            console.log(informations)
            success("Modifications apportées!")
            if("email" in informations) {
              localStorage.removeItem("token")
              setTimeout(() => {
                window.location.href ="/login"
              }, 1500);
            }
            else {
              setTimeout(() => {
                window.location.href = "/dashboard"
              }, 1500); 
            }
        }
        else {
             if(updateResult && updateResult.status === 401 ) {
                    displayError("Votre session a expiré. Veuillez vous reconnecter..");
                }else {
                    displayError("Nous rencontrons des problèmes, veuillez ressayer plus tard !")
                }
        }
      } catch (error) {
       console.error(error) 
      }
      finally {
        setLoading(false)
      }
    }
    return <Form
      name="basic"
      layout="vertical"
      style={{ width: "100%" }}
      onFinish={onFinish}
      autoComplete="off"
      validateMessages={validateMessages}
    >  {errorContextHolder}
        <Form.Item
      style={{fontWeight:"bold"}}
        label="Nom"
        name="last_name"
        rules={[
            { required: true},
            {
            pattern:/^[a-zA-Z\-\s]{3,15}$/, message:"Nom inconvenable"
        }
        ]} validateDebounce={1000} hasFeedback initialValue={user && user.last_name}
       >
        <Input size="large" onChange={(value) =>  setData(prev => ({...prev,last_name:value.target.value
         }))}/>
      </Form.Item>
      
      <Form.Item
      style={{fontWeight:"bold"}}
        label="Prénom"
        name="first_name"
        rules={[{ required: true }, {pattern:/^[a-zA-Z\-\s]{3,15}$/, message:"Prénom inconvenable"}]}  validateDebounce={1000} hasFeedback initialValue={user && user.first_name}
      >
        <Input size="large" onChange={(value) =>  setData(prev => ({...prev,first_name:value.target.value
         }))}/>
      </Form.Item>

      <Form.Item
      style={{fontWeight:"bold"}}
        label="Email"
        name="email"
        rules={[{ required: true , type:"email"}]}  validateDebounce={1000} hasFeedback initialValue={user && user.email} 
      >
        <Input size="large"  onChange={(value) =>  setData(prev => ({...prev,email:value.target.value
         }))}/>
      </Form.Item>
      {succesContextHolder}
      {contextHolder}
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          size="large"
          style={{ width: "100%", background:'orange' }}
          
        >
          Modifier
        </Button>
      </Form.Item>
    </Form>

}

export default UpdateForm