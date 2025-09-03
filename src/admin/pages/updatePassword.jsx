import {  Button, Form, Input,message, Typography } from 'antd';
import { useState, useEffect, useReducer } from 'react';
import { deconnexion, updateProfil } from '../api/api';
import {LockOutlined, MailOutlined, UserOutlined, QuestionCircleOutlined} from"@ant-design/icons"

const UpdatePassword = () => {

     const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)
    const [errorMessageApi, errorContextHolder] = message.useMessage();
        const [succesMessageApi, succesContextHolder] = message.useMessage();

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

    const [validPassword, setValidPassword] = useState(false)
    
        const onChangeConfirmedMotDePasse = (value) => {
           setConfirmedPassword((value.target.value))
        }
    
        const [showRules, setShowRules] = useState(false)
    
        const onFocusPassword = () => {
          setShowRules(true)
        }
    
        const minisculePattern = /[a-z]/
        const majusculePattern = /[A-Z]/
        const chiffrePattern = /\d/
        const caractereSpecialePattern = /[#?!@$%^&*-]/
    
    
        const chekedRulesVerified = (rules, action) => {
          switch (action.type) {
            case "rule1":
              return { ...rules, rule1: minisculePattern.test(action.value)}
            case "rule2":
              return { ...rules, rule2: majusculePattern.test(action.value)}
            case "rule3":
              return { ...rules, rule3: chiffrePattern.test(action.value)}
            case "rule4":
              return { ...rules, rule4: caractereSpecialePattern.test(action.value)}
          }
        }
    
        const [rules, dispatcher] = useReducer(chekedRulesVerified, {rule1: false, rule2: false, rule3:false, rule4:false})
    
        const [motDePasse, setMotDePasse]= useState("")
        const [confirmedPassword, setConfirmedPassword] = useState("")
    
        const [motDePasseIdentique, setmotDePasseIdentique] = useState(true)
    
        const requiredRulesOnPassword = [{rule: <span><QuestionCircleOutlined/> Au mois une lettre miniscule</span>,  key:1}, {rule: <span><QuestionCircleOutlined/> Au mois une lettre majuscule</span>,  key:2}, {rule: <span><QuestionCircleOutlined/> Au moins un chiffre</span>, key:3}, {rule: <span><QuestionCircleOutlined/> Au moins un caractère spéciale</span>, key:4}]    

        const onChangeMotDePasse = (value) => {
            const motDePasseEntree = value.target.value
            setMotDePasse(motDePasseEntree)
            dispatcher({type: "rule1", value: motDePasseEntree})
            dispatcher({type: "rule2", value: motDePasseEntree})
            dispatcher({type: "rule3", value: motDePasseEntree})
            dispatcher({type: "rule4", value: motDePasseEntree})
        }
    
        useEffect(() => {
          if(showRules) {
            document.getElementById(1).style = rules.rule1 ?  "color:green; opacity:0.5" : "color:red"
            document.getElementById(2).style = rules.rule2 ?  "color:green;opacity:0.5" : "color:red"
            document.getElementById(3).style = rules.rule3 ?  "color:green;opacity:0.5" : "color:red"
            document.getElementById(4).style = rules.rule4 ?  "color:green;opacity:0.5" : "color:red"
            rules.rule1 === rules.rule2 === rules.rule3 === rules.rule4 === true ? setValidPassword(true) : setValidPassword(false)
          }
        }, [rules, showRules])
    
        useEffect(() => {
            motDePasse === confirmedPassword ? setmotDePasseIdentique(true) : setmotDePasseIdentique(false)
        }, [motDePasse, confirmedPassword])

    const validateMessages = {
  required: '${label} est obligatoire!',
  types: {
    email: '${label} est non valide!',
  }
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

    const onFinish = async (values) => {
          try {
            if (!validPassword) {
              return
            }
            setLoading(true)
            const {confirmed_password, ...informations} = values
            const updateResult = await updateProfil(informations)
            if (updateResult.result) {
                console.log(informations)
                success("Modifications apportées!")
                localStorage.removeItem("token")
                setTimeout(() => {
                  windows.location.href = "/login"
                }, 1500);
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
    


    return <div style={{padding:"1rem"}}>
        <Typography><h1 style={{fontWeight:"bold", fontSize:"30px"}}>Mot de passe</h1>
        <p style={{color:"gray",marginBottom:"3rem"}}>Modification des données sensibles</p> </Typography> <div style={{
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: "20px",
              backgroundAttachment: "fixed"
            }}>
              
              <div style={{
                textAlign: "center",
                marginBottom: "40px",
              }}>
              </div>
              
              <div style={{
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "20px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                width: "100%",
                maxWidth: "500px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)"
              }}>
                <Form
      name="basic"
      layout="vertical"
      style={{ width: "100%" }}
      onFinish={onFinish}
      autoComplete="off"
      validateMessages={validateMessages}
    >{errorContextHolder}
{succesContextHolder}
    <Form.Item
        label="Mot de passe"
        style={{fontWeight:"bold", marginBottom:"0.4rem"}}
        name="password_hash"
        rules={[{ required: true}, {min:8, max:25, message:"Mot de passe doit être entre 8 et 25 caractères" }]} validateDebounce={1000} hasFeedback
      >
        <Input size="large" onFocus={onFocusPassword} onChange={onChangeMotDePasse}/>
      </Form.Item>

<div style={{
    marginBottom: "24px",
    transition: "all 0.5s ease-in-out",
    opacity: showRules ? 1 : 0,
    maxHeight: showRules ? "200px" : "0", 
    overflow: "hidden"
}}>
    {showRules && requiredRulesOnPassword.map(rule => <div id={rule.key} style={{color: "red"}} >{rule.rule}</div> )}
</div>
      <Form.Item
        label="Confirmation du mot de passe"
        style={{fontWeight:"bold",  marginBottom:"0.5rem"}}
        name="confirmed_password"
        rules={[{ required: true}]}
      >
        <Input size="large" onChange={onChangeConfirmedMotDePasse}/>
      </Form.Item>

      {!motDePasseIdentique && <div style={{padding:"0.5rem", color:"red", fontWeight:"500"}}>les mots de passes sont pas identiques!</div>}
      {contextHolder}
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          size="large"
          style={{ width: "100%" ,background:'orange'}}
        >
          Modifier
        </Button>
</Form.Item>
        
         </Form>

         </div>
         </div>
         </div>

}

export default UpdatePassword