import { Button, Form, Input } from 'antd';


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
        <Input size="large" />
      </Form.Item>
      
      <Form.Item
        label="Mot de passe"
        style={{fontWeight:"bold"}}
        name="password"
        rules={[{ required: true, message: 'Veuillez entrez votre mot de passe!' }]}
      >
        <Input.Password size="large" />
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