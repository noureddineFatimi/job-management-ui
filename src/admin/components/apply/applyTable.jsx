import { Button, Table, Empty } from "antd";
import {DownloadOutlined, CopyOutlined} from "@ant-design/icons"

const ApplyTable = ({data, copy_email, download_cv, loadingDownload}) => {
  
  const columns = [
  {
    title: 'Nom',
    dataIndex: 'nom',
    key: 'nom',
    render: (n) => <span  style={{fontWeight:"500"}}>{n}</span>
  },
  {
    title: 'Prénom',
    dataIndex: 'prenom',
    key: 'prenom',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (e) => <span><span style={{fontWeight:"500"}}>{e}</span><Button type="link"  style={{paddingLeft:"10px",paddingRight:"10px"}} onClick={()=>copy_email(e)}><CopyOutlined  /></Button></span>
  },
  {
    title: 'Numero de télephone',
    dataIndex: 'numero_tel',
    key: 'numero_tel',
    render: (n) => <span >(+212) <span style={{fontWeight:"500"}}>{n}</span></span>
  },
  {
    title: 'Date de postulation',
    dataIndex: 'date_postulation',
    key: 'date_postulation',
    render: (date) => <span>{new Date(date).toLocaleString()}</span>
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
        <Button type="link" loading={loadingDownload} onClick={()=>download_cv(record.cv_id, record.nom, record.prenom)}> <DownloadOutlined /> Télecharger cv </Button>
    ),
  },
];

    return <Table dataSource={data} columns={columns} scroll={{x: "auto", y: 8 * 55}} locale={{
       emptyText: <Empty description="Pas encore de candidatures reçues pour cet offre" />
    }}/>
}

export default ApplyTable