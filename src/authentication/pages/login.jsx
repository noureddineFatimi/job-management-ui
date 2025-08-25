import { Button, Form, Input, message, Alert } from 'antd';
import { loginAPI } from '../api/api';
import { useEffect, useState } from 'react';
import websiteLogo from "../../assets/images/websiteLogo.png"
import "../assets/auth.css"
import { WelcomeLogin } from '../components/layouts/welcomeLogin';
import FormToLogin from '../components/login/form';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {


  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage]= useState(null)

    useEffect(() => {
      if (loading === true) {
        messageApi.open({
        type: 'loading',
        content: 'Authentification en cours..',
        duration: 0
        });
      }
      else {
        messageApi.destroy()
      }
    }, [loading])

    const onFinish = async (values) => {
      try {
        setErrorMessage(null)
        setLoading(true)
        const loginResult = await loginAPI(values)
        if (!loginResult.resultat) {
          setErrorMessage(loginResult.msg)
        }else {
          window.location.href="/dashboard"
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    };

  return <div style={{
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  display: "flex", 
  height: "100vh",
  alignItems: "center", 
  justifyContent: "center", 
  flexDirection:" column",
  padding: "0 5px",
  gap:"2rem",
  background: "linear-gradient(90deg, #e6ecfa 0%, #f4f1fd 100%)"
}}> {contextHolder}

<WelcomeLogin/>
  <div style={{
    backgroundColor: "white",
    paddingTop:"40px",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px"
  }}>
    <div style={{ textAlign: "center", marginBottom: "10px" }}>
      <img 
        src={websiteLogo} 
        alt="logo" 
        style={{
          height: "80px",
          width: "auto",
          marginBottom: "20px"
        }}
      />
    </div>    
    {errorMessage && <Alert message={errorMessage} style={{marginBottom:"1rem"}} type="error" showIcon closable/>}
    <FormToLogin onFinish={onFinish}/>
    <div style={{textAlign:"center", width:"100%"}}>Pas encore de compte ? <Link to='/register' className="sign-up-link" style={{textDecoration:"none"}}>Creer un Compte</Link></div>
  </div>
</div>
};
export default Login;