import { Input, Select, Card, Form, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import { memo } from "react";
import { CloseOutlined} from '@ant-design/icons';


const UpdateJobCompetencesJobForm = memo(function update_job_form_competences_job_form() {
    
    
    return (
            <div>
               <p style={{fontSize: '16px',
              fontWeight: '600',
              color: '#666' ,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'}}>
    Compétences requises        </p>
              <Form.List name="competences">
            {(fields, { add, remove }) => (
              <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                {fields.map(field => (
                  <Card
                    size="small"
                    title={`Comptence ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <FormItem  name={[field.name, 'nom_competence']}  rules={[{ required: true, message:"Le nom du competence à inserer est obligatoire"} , {pattern:/^[a-zA-Z\s]{5,15}$/, message: "Nom incovenable"}]} hasFeedback validateDebounce={1000} >
                      <Input placeholder="ex. Java"/>
                    </FormItem>
                    <FormItem  name={[field.name, 'niveau']} required initialValue={null}>
                       <Select
                    id="niveauField"
                    options={[
                       {
                        value:null,
                        label: "Niveau non requis",
                      },
                      {
                        value: "Novice",
                        label: "Novice",
                      },
                      {
                        value:"Intermédiaire ",
                        label:"Intermédiaire "
                      },
                      {
                        value:"Avancé",
                        label:"Avancé"
                      }
                    ]}
                  />
                    </FormItem>
                  </Card>
                ))}
    
                <Button type="dashed" onClick={() => add()} block>
                  + Ajouter une comptence
                </Button>
              </div>
            )}
          </Form.List>
                    <div>              
                    </div>
           
          
            </div>
          )

})

export default UpdateJobCompetencesJobForm