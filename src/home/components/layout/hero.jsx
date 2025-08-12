import { Header } from "antd/es/layout/layout"
import { memo } from "react"

const Hero = memo(function Hero() {
    console.log("hero rendu")
    return  <Header
        style={{
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2.5rem",
          paddingTop: "0",
          paddingRight: "0",
          paddingLeft: "0",
          background: "linear-gradient(180deg, #e6ecfa 0%, #f4f1fd 100%)",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
        }}
      >
        <div style={{ textAlign: "center", color: "#1f1f1f", width:"60%" }}>
          <h1 style={{ fontSize: "60px", fontWeight: "bold", marginBottom: "0.5rem" }}>
            La meilleure plateforme pour trouver un emploi
          </h1>
          <p style={{ fontSize: "20px", color: "#555", marginBottom: "2rem" }}>
            Découvrez les dernières offres d'emploi et postulez rapidement.
          </p>
        </div>
      </Header>
})

export default Hero