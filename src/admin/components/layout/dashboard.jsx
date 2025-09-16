import { useState,useEffect } from 'react';
import websiteLogo from "../../../assets/images/websiteLogo.png"
import { BriefcaseIcon, AdjustmentsHorizontalIcon, UserCircleIcon, CodeBracketSquareIcon, EyeIcon , Cog6ToothIcon, TrashIcon, PlusIcon, CodeBracketIcon, ChartPieIcon} from "@heroicons/react/24/outline";
import {PieChartOutlined} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Spin, Empty,message, Button } from 'antd';
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, useNavigate, Routes, useLocation, Outlet } from 'react-router-dom';
import MyOffres from '../../pages/myOffres';
import Profil from '../../pages/profil';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import UpdateProfil from '../../pages/updateProfil';
import UpdatePassword from '../../pages/updatePassword';
import UpdateJobOffre from '../../pages/updateOffre';
import { deconnexion, profil } from '../../api/api';

const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Tableau de bord","/dashboard",<ChartPieIcon style={{ width: "16px" }}/>),
  getItem("Gestion des offres d'emploi", "sub1", <BriefcaseIcon style={{ width: "16px" }} />, [
    getItem("Mes offres", "/dashboard/offres", <AdjustmentsHorizontalIcon style={{ width: "16px" }} />),
    getItem("Publier un offre", "/dashboard/offres/add", <PlusIcon style={{ width: "16px" }} />),
  ]),
  getItem("Espace Compte", "sub2", <UserCircleIcon style={{ width: "16px" }} />, [
    getItem("Profil", "/dashboard/profil", <EyeIcon style={{ width: "16px" }} />),
    getItem("Modifier mes informations", "/dashboard/profil/edit", <Cog6ToothIcon style={{ width: "16px" }} />),
    getItem("Modifier mon mot de passe", "/dashboard/profil/edit/password", <LockClosedIcon style={{ width: "16px" }} />),
    getItem("Supprimer mon compte", "/dashboard/profil/delete-account", <LockClosedIcon style={{ width: "16px" }} />),
  ]),getItem("Code source", "/dashboard/code-source", <CodeBracketIcon style={{ width: "16px" }} />)];

 function findPath(items, key) {
  for (let item of items) {
    if (item.key === key) {
      return [{ title: item.label }];
    }
    if (item.children) {
      const childPath = findPath(item.children, key);
      if (childPath.length > 0) {
        return [{ title: item.label }, ...childPath];
      }
    }
  }
  return [];
}


function Dashboard() {


  console.log("dash")

  const [loadingUser, setLoadingUser] = useState(true);

  const token = localStorage.getItem('token')

  if(!token) {
    window.location.href = "/login";
    return null;
  }

  const handleDisconnect = async () => {
    try {
        setLoadingDisconsect(true)
        
          const result = await deconnexion()
          if(result.result) {
            setTimeout(() => {
          window.location.href = "/login"
        }, 1500);
          }
        else{
          if(result && result.status === 401 ) {
            error("Votre session a expiré. Veuillez vous reconnecter..");
          }else {
            error("Nous rencontrons des problèmes, veuillez ressayer plus tard !")
          }
        }
        } catch (e) {
          console.error(e)
  }
  }
    const [messageApi, contextHolder] = message.useMessage();


  const error = (content) => {
  
      messageApi.open({
        key:"error",
        type: 'error',
        content: content,
      });
    };

      const [user, setUser] = useState(null)
    const [loading, setLoading]=useState(true)


  useEffect(() => {
        const fetchUser = async () => {
          try {
              const userResponse = await profil()
              if(userResponse.result) {
                  setUser(userResponse.user)
              }
              else {
        if(userResponse && userResponse.status === 401 ) {
          error("Votre session a expiré. Veuillez vous reconnecter..");
        }else {
          error("Nous rencontrons des problèmes, veuillez ressayer plus tard !")
        }
      }
          } catch (err) {
              console.error(err)
          }
          finally{
              setLoading(false)
              setLoadingUser(false)
          }
        }
         fetchUser()
      }, [])
  
  const location = useLocation();

  const navigate = useNavigate()

    const RechercherItem = (childrensTable, key) => {
      let children = []
      childrensTable.map(item => 
      {
        if (item.key === key) {
          console.log(item.label)
          setPath(prev => [...prev, {title: item.label}])
          children = item.children
        }
      }
      )
      return children
    }
    
    const [path, setPath] = useState(findPath(items, location.pathname))

  const onClick = (menuItem) => {
    navigate(menuItem.key)
    /* setPath([])
    const keyPath = menuItem.keyPath.reverse()
    let nextChildrenTable = items
    for (let index = 0; index < keyPath.length; index++) {        
      nextChildrenTable = RechercherItem(nextChildrenTable, keyPath[index])
    } */
  }

    const [selectedKey, setSelectedKey] = useState([]);


  useEffect(() => {
    console.log(location.pathname)
    const regexModPage = /^\/dashboard\/offres\/edit\/\d+$/
    const regexAppPage = /^\/dashboard\/offres\/\d+\/applications$/
    if(regexModPage.test(location.pathname) || regexAppPage.test(location.pathname)) {
      setPath([{title:"Gestion des offres d'emploi"},{title : "Mes offres"}])
      setSelectedKey("/dashboard/offres")
    }else{
      setPath(findPath(items, location.pathname))
      setSelectedKey([location.pathname])
    }
  }, [location.pathname])

  const [loadingDisconsect, setLoadingDisconsect] = useState(false)
  
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  return loadingUser ? (<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
        <Spin size="large" />
      </div>) : (
    <Layout style={{ minHeight: '100vh' }}>
{contextHolder}
      <Sider  collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
        width={300} 
        collapsedWidth={110}         style={{ overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',}}
        >
        <div onClick={()=>window.location.href='/dashboard'} style={{cursor:"pointer", padding:"1rem", marginBottom:"1rem", marginTop:"1rem",marginRight:"1rem",marginLeft:"1rem",display:"flex", justifyContent:"center", alignItems:"center", background:colorBgContainer, borderRadius:"8px"}} > <img src={websiteLogo} style={{height:"30px"}} alt="logo" /> </div> 
        <Menu theme="dark" selectedKeys={selectedKey} onClick={onClick} mode="inline" items={items} />
      </Sider>
      { loading ? <div style={{width:"100%",display
          :"flex", height:"50vh",alignItems:"center" , justifyContent:"center" }}> <Spin size="large" /></div> : <Layout>
        <Header style={{ alignItems: "center",
            width: "100%", background: colorBgContainer, gap:"1rem",display:"flex", justifyContent:"end",fontWeight:"100", fontSize:"20px" }} > <div> Bonjour {' '}<span style={{fontWeight:"bold"}}> {user && user.first_name && user.first_name.toUpperCase()} </span> {' '} dans votre espace! </div> <Button danger type='default' loading={loadingDisconsect} onClick={handleDisconnect}>Déconnexion</Button> </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={path} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >

             <Suspense
              fallback={
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    height: "50dvh",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spin size="large" />
                </div>
              }
            >
              <Outlet/>
            </Suspense>               
          </div>
        </Content>
        
      </Layout>}
    </Layout>
  );
};

export default Dashboard