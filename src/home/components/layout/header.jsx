import websitelogo from "../../../assets/images/websiteLogo.png"
import { memo } from "react"
import "../../assets/home.css"
import { useNavigate } from "react-router-dom"

const Header = memo(function Header() {


    console.log("header rendu")
    return <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "#fff",
          borderBottom: "1px solid #d9d9d9",
          transition: "all 0.3s ease",
          height: "85px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "0 3.5rem 0 0",
          }}
        >
          <a href="/" style={{ display: "flex" }}>
            <img src={websitelogo} alt="logo" style={{ height: "45px", marginLeft: "3.5rem" }} />
          </a>
          <div style={{ display: "flex", gap: "3rem", alignItems: "center", marginRight: "1.5rem"}}>
            <span style={{ fontSize: "18px", fontWeight: "500" }}>
              <a href="/" style={{ color: "#1f1f1f" }}>
                <span className="nav-link">Chercher un emploi</span>
              </a>
            </span>
            <span style={{ fontSize: "18px", fontWeight: "500" }}>
              <a href="/register" style={{ color: "#1f1f1f" }} className="nav-link" target="_blank">
                <span className="nav-link">Poster un offre d'emploi</span>
              </a>
            </span>
          </div>
        </div>
      </div>
})
export default Header