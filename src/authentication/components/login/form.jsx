import { Button, Form, Input } from 'antd';
import {LockOutlined, MailOutlined} from"@ant-design/icons"

const FormToLogin = ({onFinish}) => {
    return <Form
      name="basic"
      layout="vertical"
      style={{ width: "100%" }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
      style={{fontWeight:"bold"}}
        label="Email"
        name="username"
        rules={[{ required: true, message: 'Veuillez entrez votre email!' }]}
      >
        <Input size="large" prefix= {<span style={{marginRight:"0.5rem"}}>{<MailOutlined/>}</span>} placeholder='Entrez votre email'/>
      </Form.Item>
      
      <Form.Item
        label="Mot de passe"
        style={{fontWeight:"bold"}}
        name="password"
        rules={[{ required: true, message: 'Veuillez entrez votre mot de passe!' }]}
      >
        <Input.Password size="large" prefix={<span style={{marginRight:"0.5rem"}}>{<LockOutlined/>}</span>} placeholder='Entrez le mot de passe'/>
      </Form.Item>
      
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          size="large"
          style={{ width: "100%" }}
        >
          Se connecter
        </Button>
      </Form.Item>
    </Form>

}

export default FormToLogin