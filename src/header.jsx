import { Layout, Select, Checkbox, Input, Space, InputNumber, Pagination } from "antd"
import {
  EditOutlined,
  EllipsisOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  UserOutlined,
  TeamOutlined,
  DollarOutlined,
} from "@ant-design/icons"
import { Tag, Card, Flex, Switch } from "antd"
import { useState, useEffect } from "react"
import "./header.css"
import logo from "./assets/logo.png"

const smileIcon = <EnvironmentOutlined />
const handleChange = (value) => {
  console.log(`selected ${value}`)
}
const actions = [<EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]
const { Header, Content, Footer, Sider } = Layout
const onChange = (value) => {
  console.log(`selected ${value}`)
}
const onSearch = (value) => {
  console.log("search:", value)
}

const App = () => {
  const [loading, setLoading] = useState(true)
  const [isSearchSticky, setIsSearchSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // Quand on scroll plus de 300px (hauteur approximative avant la zone de recherche)
      setIsSearchSticky(scrollPosition > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Layout style={{ background: "#fff" }}>
      {/* Bande haute sticky */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "#fff",
          borderBottom: "1px solid #e6e6e6",
          transition: "all 0.3s ease",
          height: "85px", // Hauteur fixe pour la cohérence
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
            <img src={logo} alt="logo" style={{ height: "45px", marginLeft: "3.5rem" }} />
          </a>
          <div style={{ display: "flex", gap: "3rem", alignItems: "center", marginRight: "1.5rem" }}>
            <span style={{ fontSize: "18px", fontWeight: "500" }}>
              <a href="/" style={{ color: "#1f1f1f" }}>
                <span className="nav-link">Chercher un emploi</span>
              </a>
            </span>
            <span style={{ fontSize: "18px", fontWeight: "500" }}>
              <a href="/" style={{ color: "#1f1f1f" }} className="nav-link">
                <span className="nav-link">Poster un offre d'emploi</span>
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Header principal avec gradient */}
      <Header
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
        {/* Centre : Titre + description */}
        <div style={{ textAlign: "center", color: "#1f1f1f" }}>
          <h1 style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "0.5rem" }}>
            La meilleure plateforme pour trouver un emploi
          </h1>
          <p style={{ fontSize: "20px", color: "#555", marginBottom: "2rem" }}>
            Découvrez les dernières offres d'emploi et postulez rapidement.
          </p>
        </div>
      </Header>

      {/* Zone de recherche sticky */}
      <div
        style={{
          position: "sticky",
          top: isSearchSticky ? "85px" : "auto", // Ajustement pour correspondre à la bande haute
          zIndex: 999,
          background: "#fff",
          padding: "1.5rem 0",
          borderBottom: isSearchSticky ? "1px solid #e6e6e6" : "none",
          boxShadow: isSearchSticky ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
          transition: "all 0.3s ease",
          marginTop: isSearchSticky ? "0" : "-2rem", // Évite l'espace vide
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Space.Compact style={{ width: "50%" }} size="large">
            <Input addonBefore={<SearchOutlined />} placeholder="Mots clés(ex. Devoloppeur)" />
          </Space.Compact>
          <Select
            size="large"
            suffixIcon={smileIcon}
            defaultValue="Tous les villes"
            style={{ width: "20%" }}
            onChange={handleChange}
            options={[
              { value: "Tous les villes", label: "Tous les villes" },
              { value: "Casablanca", label: "Casablanca" },
              { value: "lucy", label: "Rabat" },
              { value: "Yiminghe", label: "Fes" },
            ]}
          />
          <button
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              backgroundColor: "#1f1f1f",
              color: "#fff",
              border: "none",
              fontSize: "15px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Rechercher
          </button>
        </div>
      </div>

      <div style={{ padding: "0 48px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff", gap: "2rem" }}>
          <Content style={{ padding: "0 24px", minHeight: 280, background: "#fff" }}>
            <div style={{ marginBottom: "1rem" }}>Résultats (152)</div>
            <Flex gap="middle" align="start" vertical>
              <Switch checked={!loading} onChange={(checked) => setLoading(!checked)} />
              <Card loading={loading} style={{ minWidth: 300, width: "100%" }}>
                <Card.Meta
                  title="Developpeur H/F"
                  description={
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
                        <span style={{ color: "#000" }}>
                          {" "}
                          <TeamOutlined /> Weserveit
                        </span>
                        <span>
                          {" "}
                          <EnvironmentOutlined /> A distance
                        </span>
                        <Tag color="geekblue">50 candidatures</Tag>
                      </div>
                      <p style={{ color: "#000" }}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est temporibus nesciunt excepturi enim
                        ullam sunt deleniti quasi repudiandae totam mollitia odit iure quo fugit, reprehenderit labore
                        ratione ut praesentium fugiat Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad illum
                        provident repellendus saepe numquam unde esse aliquam obcaecati nulla. Officiis laudantium earum
                        accusamus dolorum soluta maiores incidunt nisi sapiente nihil? Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Quibusdam adipisci possimus inventore earum totam ab porro
                        explicabo provident aspernatur laborum! Tenetur dolor autem saepe perferendis voluptates impedit
                        sequi dolores minus.
                      </p>
                      <div style={{ display: "flex", gap: "0.2rem" }}>
                        <Tag color="default">CSS</Tag>
                        <Tag color="default">Java</Tag>
                        <Tag color="default">Web Developper</Tag>
                        <Tag color="default">UI/UX</Tag>
                      </div>
                      <div style={{ display: "flex", gap: "1.2rem" }}>
                        <span>
                          <DollarOutlined /> 25.000 - 50.000dh
                        </span>
                        <span>
                          <UserOutlined /> 5 employes
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <a href="#"> Plus d'information</a>
                        <button
                          style={{
                            padding: "12px 24px",
                            borderRadius: "10px",
                            backgroundColor: "#1f1f1f",
                            color: "#fff",
                            border: "none",
                            fontSize: "15px",
                            cursor: "pointer",
                            fontWeight: "500",
                          }}
                        >
                          Postuler
                        </button>
                      </div>
                    </div>
                  }
                />
              </Card>
              <Card loading={loading} style={{ minWidth: 300, width: "100%" }}>
                <Card.Meta
                  title="Card title"
                  description={
                    <>
                      <p>This is the description</p>
                      <p>This is the description</p>
                    </>
                  }
                />
              </Card>
               <Card loading={loading} style={{ minWidth: 300, width: "100%" }}>
                <Card.Meta
                  title="Card title"
                  description={
                    <>
                      <p>This is the description</p>
                      <p>This is the description</p>
                    </>
                  }
                />
              </Card>
               <Card loading={loading} style={{ minWidth: 300, width: "100%" }}>
                <Card.Meta
                  title="Card title"
                  description={
                    <>
                      <p>This is the description</p>
                      <p>This is the description</p>
                    </>
                  }
                />
              </Card>
               <Card loading={loading} style={{ minWidth: 300, width: "100%" }}>
                <Card.Meta
                  title="Card title"
                  description={
                    <>
                      <p>This is the description</p>
                      <p>This is the description</p>
                    </>
                  }
                />
              </Card>
               <Card loading={loading} style={{ minWidth: 300, width: "100%" }}>
                <Card.Meta
                  title="Card title"
                  description={
                    <>
                      <p>This is the description</p>
                      <p>This is the description</p>
                    </>
                  }
                />
              </Card>
               <Card loading={loading} style={{ minWidth: 300, width: "100%" }}>
                <Card.Meta
                  title="Card title"
                  description={
                    <>
                      <p>This is the description</p>
                      <p>This is the description</p>
                    </>
                  }
                />
              </Card>
               <Card loading={loading} style={{ minWidth: 300, width: "100%" }}>
                <Card.Meta
                  title="Card title"
                  description={
                    <>
                      <p>This is the description</p>
                      <p>This is the description</p>
                    </>
                  }
                />
              </Card>
            </Flex>
          </Content>

          {/* Sidebar sticky */}
          <Sider
  style={{
    background: "#fff",
    maxHeight: "calc(100vh - 160px)",
    overflowY: "auto",
    padding: "1rem",
    borderRadius: "15px",
    border: "1px solid #d9d9d9",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    position: "sticky",
    top: "180px", // Ajustement plus doux, fixe à 110px
    transition: "all 0.3s ease-in-out",
    alignSelf: "start",
  }}
  width={300}
>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              <span>Filtre</span>
              <span
                className="reset"
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "15px",
                  fontWeight: "500",
                  fontFamily: "'Inter', 'Segoe UI', sans-serif",
                  color: "#7253ceff",
                }}
              >
                Réinitialiser
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1.5rem",
                gap: "0.5rem",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}
            >
              <span style={{ fontWeight: "450", fontSize: "17px" }}>Secteur d'activité</span>
              <Select
                style={{ marginLeft: "0.8rem" }}
                showSearch
                placeholder="Select a person"
                optionFilterProp="label"
                defaultValue={null}
                onChange={onChange}
                onSearch={onSearch}
                options={[
                  {
                    value: null,
                    label: "Tous les secteurs",
                  },
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "tom",
                    label: "Tom",
                  },
                ]}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1.5rem",
                gap: "0.5rem",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}
            >
              <span style={{ fontWeight: "450", fontSize: "17px" }}>Fonction</span>
              <Select
                style={{ marginLeft: "0.8rem" }}
                showSearch
                optionFilterProp="label"
                defaultValue={null}
                onChange={onChange}
                onSearch={onSearch}
                options={[
                  {
                    value: null,
                    label: "Tous les fonctions",
                  },
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "tom",
                    label: "Tom",
                  },
                ]}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1.5rem",
                gap: "0.5rem",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}
            >
              <span style={{ fontWeight: "450", fontSize: "17px" }}>Type d'offre</span>
              <Checkbox style={{ marginLeft: "0.8rem" }} onChange={onChange}>
                CDD
              </Checkbox>
              <Checkbox style={{ marginLeft: "0.8rem" }} onChange={onChange}>
                CDI
              </Checkbox>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1.5rem",
                gap: "0.5rem",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}
            >
              <span style={{ fontWeight: "450", fontSize: "17px" }}>Minimum d'années d'experience</span>
              <div style={{ marginLeft: "0.8rem" }}>
                <InputNumber min={1} max={10} defaultValue={3} style={{ width: "100%" }} onChange={onChange} />
              </div>
            </div>
          </Sider>
        </Layout>
        <div style={{width:"100%" , display:"flex", justifyContent:"center", marginBottom:"0.5rem"}}><Pagination defaultCurrent={1} total={50} /></div>
      </div>
      
      <Footer style={{ textAlign: "center", paddingTop:"0.5rem", paddingBottom:"0.5rem"}}>PFA project 2025</Footer>
    </Layout>
  )
}

export default App
