import { Alert, Button, Form, Input,message } from 'antd';
import { useState, useEffect, useReducer } from 'react';
import { loginAPI, signUpAPI } from '../../api/api';
import {LockOutlined, MailOutlined, UserOutlined, QuestionCircleOutlined} from"@ant-design/icons"

const FormToRegister = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)
    const [errorMessageApi, errorContextHolder] = message.useMessage();

    const displayError = (content)=> {
      errorMessageApi.open({type:"error", content:content})
    }

   useEffect(() => {
      if (loading === true) {
        messageApi.open({
        type: 'loading',
        content: 'Creation de votre compte en cours..',
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

    const onFinish = async (values) => {
      try {
        if (!validPassword) {
          return
        }
        setLoading(true)
        const {confirmed_password, ...informations} = values
        const signUpResult = await signUpAPI(informations)
        if (!signUpResult.resultat) {
          displayError(signUpResult.msg)
        }
        else {
          const loginResult = await loginAPI({username: informations.email, password: informations.password})
          if (!loginResult.resultat) {
            console.error(loginResult.msg)
          }
          else {
            console.log("auth reusii")
                      window.location.href="/dashboard"

          }
        }
      } catch (error) {
       console.error(error) 
      }
      finally {
        setLoading(false)
      }
    }

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
        ]} validateDebounce={1000} hasFeedback
       >
        <Input size="large"  prefix={<span style={{marginRight:"0.5rem"}}>{<UserOutlined/>}</span>} placeholder='Entrez votre nom'/>
      </Form.Item>
      
      <Form.Item
      style={{fontWeight:"bold"}}
        label="Prénom"
        name="first_name"
        rules={[{ required: true }, {pattern:/^[a-zA-Z\-\s]{3,15}$/, message:"Prénom inconvenable"}]}  validateDebounce={1000} hasFeedback
      >
        <Input size="large" prefix= {<span style={{marginRight:"0.5rem"}}>{<UserOutlined/>}</span>} placeholder='Entrez votre prénom'/>
      </Form.Item>

      <Form.Item
      style={{fontWeight:"bold"}}
        label="Email"
        name="email"
        rules={[{ required: true , type:"email"}]}  validateDebounce={1000} hasFeedback
      >
        <Input size="large"  prefix= {<span style={{marginRight:"0.5rem"}}>{<MailOutlined/>}</span>} placeholder='Entrez votre email'/>
      </Form.Item>
      
      <Form.Item
        label="Mot de passe"
        style={{fontWeight:"bold", marginBottom:"0.4rem"}}
        name="password"
        rules={[{ required: true}, {min:8, max:25, message:"Mot de passe doit être entre 8 et 25 caractères" }]} validateDebounce={1000} hasFeedback
      >
        <Input.Password size="large" onFocus={onFocusPassword} onChange={onChangeMotDePasse} prefix={<span style={{marginRight:"0.5rem"}}>{<LockOutlined/>}</span>} placeholder='Entrez le mot de passe'/>
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
        <Input.Password size="large" onChange={onChangeConfirmedMotDePasse}  prefix={<span style={{marginRight:"0.5rem"}}>{<LockOutlined/>}</span>} placeholder='Confirmez le mot de passe'/>
      </Form.Item>

      {!motDePasseIdentique && <div style={{padding:"0.5rem", color:"red", fontWeight:"500"}}>les mots de passes sont pas identiques!</div>}
      {contextHolder}
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          size="large"
          style={{ width: "100%", marginTop:"20px" }}
        >
          Creer un compte
        </Button>
      </Form.Item>
    </Form>

}

export default FormToRegister