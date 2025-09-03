import { Footer } from "antd/es/layout/layout"
import { memo } from "react"

const FooterBloock = memo((function FooterBloock () {
    console.log("footer rendu")
    return <Footer style={{ textAlign: "center", paddingTop:"0.5rem", paddingBottom:"0.5rem"}}>&copy; PFA project 2025</Footer>
}))

export default FooterBloock