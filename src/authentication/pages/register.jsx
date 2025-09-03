import FormToRegister from "../components/register/form"
import { WelcomeSignUp } from "../components/layouts/welcomeSignUp";
import '../assets/auth.css'
import websiteLogo from "../../assets/images/websiteLogo.png"
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  return (
    <div style={{
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: "20px",
            background: "linear-gradient(90deg, #e6ecfa 0%, #f4f1fd 100%)",
      backgroundAttachment: "fixed"
    }}>
      
      <div style={{
        textAlign: "center",
        marginBottom: "40px",
      }}>
        <WelcomeSignUp/>
      </div>
      
      <div style={{
        backgroundColor: "white",
        padding: "40px",
            paddingBottom:20,

        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "500px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)"
      }}>
        
        <div style={{ 
          textAlign: "center", 
          marginBottom: "30px" 
        }}>
          <img 
                  src={websiteLogo} 
                  alt="logo" 
                  style={{
                    height: "80px",
                    width: "auto",
                    marginBottom: "20px"
                  }}
                />
         
          <p style={{
            margin: "8px 0 0",
            color: "#666",
            fontSize: "14px"
          }}>
            Créez votre compte professionnel
          </p>
        </div>
        
        <FormToRegister/>
        
        <div style={{
          paddingTop:"20px",
          textAlign: "center", 
          width: "100%",
          marginTop: "30px",
          padding: "20px 0",
          borderTop: "1px solid #f0f0f0",
          fontSize: "14px",
          color: "#666"
        }}>
          Vous avez déjà un compte ?{' '}
          <Link 
            to='/login' 
            style={{
              color: "#667eea",
              textDecoration: "none",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
            className='sign-up-link'
            onMouseEnter={(e) => {
              e.target.style.color = "#764ba2";
              e.target.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#667eea";
              e.target.style.textDecoration = "none";
            }}
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register