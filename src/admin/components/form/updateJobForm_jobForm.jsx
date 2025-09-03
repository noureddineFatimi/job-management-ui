import { DatePicker, Input, InputNumber, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { memo } from "react";
import dayjs from "dayjs"

const UpdateJobFormJobForm = memo(function update_job_form_job_form({setUpdateData, offre, ressources}) {
    

    const updateDate = (oldDate) => {
        const date = dayjs(oldDate)
        return date.set('hour', 23).set('minute', 59).set('second',0).set('millisecond',0)
      }

    return (
        <div>
       <p style={{fontSize: '16px',
          fontWeight: '600',
          color: '#666' ,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'}}>
        Informations sur l'offre
        </p>
<FormItem label={< span style={{fontWeight:"600"}}>Titre</span>} name="titre" hasFeedback validateDebounce={1000}  rules={[{ required: true, message:"Le titre est obligatoire"} , {pattern:/^[a-zA-Z0-9_'/\"\s]{2,35}$/, message: "Titre incovenable"}]} initialValue={offre.titre}>
            <Input placeholder="ex. Développeur Junior H/F" onChange={(value)=>setUpdateData(prev=>({...prev, titre:value.target.value}))} />
        </FormItem>
        <FormItem label={< span style={{fontWeight:"600"}}>Télétravail</span>} name="teletravail" required initialValue={offre.teletravail} >
             <Select 
              onChange={(value)=>setUpdateData(prev=>({...prev, teletravail:value}))}
                id="teletravailField"
                
                options={[
                  {
                    value: "Non",
                    label: "Non",
                  },
                  {
                    value:"Oui",
                    label:"Oui"
                  },
                  {
                    value:"Hybride",
                    label:"Hybride"
                  }
                ]}
              />
        </FormItem>

<FormItem label={< span style={{fontWeight:"600"}}>Niveau d'étude</span>} name="niveau_etude_requis" required initialValue={offre.niveau_etude_requis}>
             <Select
                id="niveau_etude_requisField"
                onChange={(value)=>setUpdateData(prev=>({...prev, niveau_etude_requis:value}))}
                options={[
                  {
                    value: "Qualification avant Bac",
                    label: "Qualification avant Bac",
                  },
                  {
                    value:"Autodidacte",
                    label:"Autodidacte"
                  },
                  {
                    value:"Bac",
                    label:"Bac"
                  },
                   {
                    value:"Bac +1",
                    label:"Bac +1"
                  },
                  {
                    value:"Bac +2",
                    label:"Bac +2"
                  },
                  {
                    value:"Bac +3",
                    label:"Bac +3"
                  },
                  {
                    value:"Bac +4",
                    label:"Bac +4"
                  },
                   {
                    value:"Bac +5 et plus",
                    label:"Bac +5 et plus"
                  },
                  
                ]}
              />
        </FormItem>



         <FormItem label={< span style={{fontWeight:"600"}}>Diplome</span>} name="diplome_requis" required initialValue={offre.diplome_requis}>
             <Select
                id="diplome_requisField"
                onChange={(value)=>setUpdateData(prev=>({...prev, diplome_requis:value}))}
                options={[
                  {
                    value: null,
                    label: "Aucun diplôme / Niveau scolaire",
                  },
                  {
                    value:"Diplôme de technicien (DT)",
                    label:"Diplôme de technicien (DT)"
                  },
                  {
                    value:"Diplôme de technicien spécialisé (DTS)",
                    label:"Diplôme de technicien spécialisé (DTS)"
                  },
                   {
                    value:"Baccalauréat",
                    label:"Baccalauréat"
                  },
                  {
                    value:"Licence",
                    label:"Licence"
                  },
                  {
                    value:"Master",
                    label:"Master"
                  },
                  {
                    value:"Doctorat",
                    label:"Doctorat"
                  },
                  
                ]}
              />
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Type de contrat</span>} name="type_offre" required initialValue={offre.type_offre}> 
            <Select
            onChange={(value)=>setUpdateData(prev=>({...prev, type_offre:value}))}
                id="type_offreField"
                options={[
                  {
                    value: "Autre contrat",
                    label: "Autre",
                  },
                  {
                    value:"CDD",
                    label:"CDD"
                  },
                   {
                    value:"CDI",
                    label:"CDI"
                  },
                   {
                    value:"Intérim",
                    label:"Intérim"
                  },
                   {
                    value:"Stage",
                    label:"Stage"
                  },
                   {
                    value:"Freelance",
                    label:"Freelance"
                  }
                ]}
              />
        </FormItem>


        <FormItem label={< span style={{fontWeight:"600"}}>Ville</span>} name="id_ville_offre" required initialValue={offre&& offre.ville && offre.ville.id}>
            <Select
                id="id_ville_offreField"
                showSearch
                onChange={(value)=>setUpdateData(prev=>({...prev,ville_id:value}))}
                options={ ressources?.villes ? [
                   ...ressources.villes.map( ville => (
                   { value: ville.id,
                    label: ville.nom_ville}
                  )
                  )
                ]: []}
              />
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Secteur d'activté</span>} name="id_secteur_activite" required initialValue={offre && offre.secteur_activite && offre.secteur_activite.id}>
            <Select
                id="id_secteur_activiteField"
             onChange={(value)=>setUpdateData(prev=>({...prev,secteur_activite_id:value}))}
                showSearch
                options={ ressources?.secteurs_activite ? [
                  ...ressources.secteurs_activite.map( secteur => (
                   { value: secteur.id,
                    label: secteur.nom_secteur}
                  )
                  )
                ] : []}
              />
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Fonction</span>} name="id_fonction" required initialValue={offre && offre.fonction && offre.fonction.id}>
            <Select
                id="id_fonctionField"
                showSearch
              onChange={(value)=>setUpdateData(prev=>({...prev, fonction_id:value}))}
                options={ ressources?.fonctions ? [
                  ...ressources.fonctions.map( fct => (
                   { value: fct.id,
                    label: fct.nom_fonction}
                  )
                  )
                ] : []}
              />
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Nombre d'employés demandé</span>} name="nbr_employes_demande" required initialValue={offre.nbr_employes_demande}>
          <InputNumber min={1} style={{width:"50%"}} onChange={(value)=>setUpdateData(prev=>({...prev, nbr_employes_demande:value}))} />
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600" }}>Salaire minimum</span>} name="salaire_min" initialValue={offre.salaire_min}>
          <InputNumber min={1} placeholder="Non défini" style={{width:"50%"}} onChange={(value)=>setUpdateData(prev=>({...prev, salaire_min:value}))}/>
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Salaire maximum</span>} name="salaire_max" initialValue={offre.salaire_max}>
          <InputNumber min={1} placeholder="Non défini" style={{width:"50%"}} onChange={(value)=>setUpdateData(prev=>({...prev, salaire_max:value}))}/>
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Minimum d'années d'expérience</span>} name="annee_experience_min" initialValue={offre.annees_experience_min}>
          <InputNumber min={1}  placeholder="Non défini" style={{width:"50%"}} onChange={(value)=>setUpdateData(prev=>({...prev, annees_experience_min:value}))}/>
        </FormItem>

        <FormItem label={< span style={{fontWeight:"600"}}>Maximum d'années d'expérience</span>} name="annee_experience_max" initialValue={offre.annees_experience_max}>
          <InputNumber min={1} placeholder="Non défini" style={{width:"50%"}} onChange={(value)=>setUpdateData(prev=>({...prev, annees_experience_max:value}))}/>
        </FormItem>

      <FormItem label={< span style={{fontWeight:"600"}}>Description</span>} name="description" initialValue={offre.description}>
        <Input.TextArea maxLength={100} placeholder="description sur l'offre.." onChange={(value)=>setUpdateData(prev=>({...prev, description:value.target.value}))}/>
      </FormItem> 

                <FormItem label={< span style={{fontWeight:"600"}}>Date limit de Postulation</span>} name="deadline_postulation" rules={[{required: true, message:"La date limite de postulation est obligatoire"}]} initialValue={dayjs(offre.deadline_postulation)}>
                  <DatePicker style={{width:"50%"}} onChange={(value)=>setUpdateData(prev=>({...prev, deadline_postulation:updateDate(new Date(value))}))}/>
                </FormItem>
      </div>
    )

})

export default UpdateJobFormJobForm