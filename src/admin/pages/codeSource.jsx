import { Flex, Tag, Typography } from "antd"
import {GithubOutlined} from '@ant-design/icons';
const CodeSource = () => {
    return <div style={{padding:"1rem"}}>
                <Typography><h1 style={{fontWeight:"bold", fontSize:"30px"}}>Code source du projet</h1>
                    <p style={{color:"gray",marginBottom:"3rem"}}>Thalla :)</p> 
                    <div style={{display:"flex", justifyContent:"center",alignItems:"center",gap:"3rem"}}>
                        <a href="https://github.com/noureddineFatimi/job-management-api" target="_blank">
                            <Tag  icon={<GithubOutlined />} color="black" >
                                Github (Back-end)
                            </Tag>
                        </a>
                        <a href="https://github.com/noureddineFatimi/job-management-ui" target="_blank">
                            <Tag icon={<GithubOutlined />} color="black">
                                Github (Front-end)
                            </Tag>
                        </a>
                    </div>
                </Typography>
            </div>
}
export default CodeSource