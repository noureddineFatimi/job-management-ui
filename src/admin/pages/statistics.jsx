import { Card, message, Spin, Statistic, Typography } from "antd"
import {  UserAddOutlined, TeamOutlined, CarryOutOutlined} from '@ant-design/icons';
import CountUp from 'react-countup';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Line, Doughnut } from 'react-chartjs-2';
import { Chart as LinechartJS, LineElement, CategoryScale, LinearScale, PointElement, Title } from "chart.js";
import { getStatistics } from "../api/api";
import { useState,useEffect } from "react";

  function generateColors(n) {
  return Array.from({ length: n }, () =>
    `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
  );
}

const formatter = value => <CountUp end={value} />;
ChartJS.register(ArcElement, Tooltip, Legend);

LinechartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const Statistics = () => {

  const [statistics, setStatistics] = useState(null)

   const [loading, setLoding] = useState(true)

   const [messageApi, contextHolder] = message.useMessage();

  const error = (content) => {
      messageApi.open({
        key:"error",
        type: 'error',
        content: content,
      });
    }; 

  useEffect(() => {
         const fetchData = async () => {
          try {
            const result = await getStatistics()
          if (result && result.result) {
            setStatistics(result.statistics)
          }else {
            if(result && result.status === 401 ) {
              error("Votre session a expiré. Veuillez vous reconnecter..");
            }else {
              error("Nous rencontrons des problèmes, veuillez ressayer plus tard !")
            }
          }
          } catch (e) {
            console.error(e)
          }finally {
            setLoding(false)
          }
         }
         fetchData()
        }, [])

        const moisOffresArray = statistics ? statistics.repartition_par_mois_anne_courante : null

        const data = {
  labels: [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ],
  datasets: [
    {
      label: "Nombre d'offres publiées",
      data: moisOffresArray ? moisOffresArray.map(object => object.nombre) : [], 
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(54, 162, 235, 0.3)",
      fill: true,
      tension: 0.3,
    },
  ],
};

const actuelleDate = new Date()

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: `Offres publiées par mois - Année courante (${actuelleDate.getFullYear()})`,
      padding: { top: 10, bottom: 20 },
      family:"Arial"
    },
    legend:{
    display:false
  },
    
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
  
};

        const secteursOffresArray = statistics ? statistics.repartition_par_secteurs_activite : null

const secteursData = {
  labels: secteursOffresArray? secteursOffresArray.map(object => object.secteur) : [], 
  datasets: [
    {
      label: "Nombre d'offres",
      data: secteursOffresArray? secteursOffresArray.map(object => object.nombre) : [],
      backgroundColor: generateColors(secteursOffresArray ? secteursOffresArray.length : 0),
      hoverOffset: 4,
    },
  ],
};

const secteursOptions = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Répartition des secteurs d'activité",
      position:"left"
    },
    legend: {
      position: "left",
    },
  },
};
    const contratOffresArray = statistics ? statistics.repartition_par_type_de_contrat : null

  const contratData = { 
    labels: contratOffresArray? contratOffresArray.map(object => object.type) : [], 
    datasets: [
    {
      label: "Nombre d'offres",
      data:  contratOffresArray? contratOffresArray.map(object => object.nombre) : [], 
      backgroundColor: generateColors(contratOffresArray ? contratOffresArray.length : 0),
      hoverOffset: 4,
    },
  ],
};

const contratOptions = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: `Répartition des contrats`,
      position:"left"
    },
    legend: {
      position: "left",
    },
  },
};

    return <div style={{padding:"1rem"}}>{contextHolder}
      <Typography><h1 style={{fontWeight:"bold", fontSize:"30px"}}>Dashborad</h1>
                          <p style={{color:"gray",marginBottom:"3rem"}}>Statistiques pour les offres</p> 
            {loading ? <div style={{width:"100%",display
          :"flex", height:"50vh",alignItems:"center" ,  justifyContent:"center" }}> <Spin size="large" /></div>:<div style={{display:"flex", flexDirection:"column", gap:"1rem",width:"100%" }}>
                <div style={{display:"flex", gap:"1rem", width:"100%"}}>
                    <Card variant="borderless"style={{width:"100%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"}}>
                        <Statistic
                        title="Nombre d'offres"
                        value={statistics && statistics.nombre_offres_publies ? statistics.nombre_offres_publies : 0}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<CarryOutOutlined style={{width:"20px"}}/>}
                        formatter={formatter}
                        />
                    </Card>
                     <Card variant="borderless"style={{width:"100%", boxShadow: "0 4px 12px rgba(0,0,0,0.1)"}}>
                        <Statistic
                        title="Nombre d'employés à recruter"
                        value={statistics && statistics.nombre_employes_a_recruter ? statistics.nombre_employes_a_recruter : 0}
                        valueStyle={{ color: 'purple' }} 
                        prefix={<UserAddOutlined style={{width:"20px"}}/>}
                        formatter={formatter}
                        />
                    </Card>
                       <Card variant="borderless"style={{width:"100%" , boxShadow: "0 4px 12px rgba(0,0,0,0.1)"}}>
                        <Statistic
                        title="Nombre de candidatures reçues"
                        value={statistics && statistics.nombres_candidatures_recues ? statistics.nombres_candidatures_recues : 0}
                        valueStyle={{ color: '#cf1322' }}    
                        prefix={<TeamOutlined style={{width:"20px"}}/>}  
                        formatter={formatter}
                        />
                    </Card>
                    </div>
                    <div style={{display:"flex", gap:"1rem", width:"100%"}}>
                        <div style={{width:"50%", height:"50%",padding:"1rem",boxShadow: "0 4px 12px rgba(0,0,0,0.1)",borderRadius:'8px'}}>
                        <Pie data={contratData} options={contratOptions}/>
                        </div>
                        <div style={{width:"50%", height:"50%",padding:"1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)",borderRadius:'8px'}}>
                        <Doughnut data={secteursData} options={secteursOptions}/>
                        </div>
                    </div>
                    <div style={{boxShadow: "0 4px 12px rgba(0,0,0,0.1)",borderRadius:'8px', padding:"1rem", height:"400px"}} >
                          <Line data={data} options={options} />
                    </div>
            </div>}
            </Typography>
        </div>
}

export default Statistics