import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
} from 'antd';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import moment from 'moment';
import 'moment-timezone';
export default function CreateNewWork() {
    const [data, setData] = useState({
             description: "",
            dayStart:   "",
            dayEnd: "",
            explain: "",
            status : "",
            isActive: true,
            typeId: "",
           
    });
    const [type, setType] = useState([]);
    const [forms] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`https://localhost:7292/api/Type`, {})
            .then((res) => {
                console.log(res.data);
                setType(res.data)
            })
            .catch((err) => {
                console.error(err.message)
            })
    },[])
    const handleDesChange =(prop)=>{
        setData({
            ...data,
            description : prop.target.value,
        })
        console.log(prop.target.value)
    }
    const handleStatusChange =(prop)=>{
        console.log("desc",prop.target.value)
        setData({
            ...data,
            status : prop.target.value
        })
    }
    const handleDayStartChange =(prop, Datestring)=>{
        console.log("day start",moment.tz("Asia/Ho_Chi_Minh").add(7,'days').startOf('day'))
        
        setData({
            ...data,
            dayStart : Datestring
        })
    }
    const handleDayEndChange =(prop, Datestring)=>{
        console.log(prop)
        setData({
            ...data,
            dayEnd : Datestring
        })
    }
    const handleTypeChange =(prop)=>{
        setData({
            ...type,
            typeId : parseInt(prop)
        })
       
    }
    
    const handleCreate =(fieldsValue) => {
        console.log("create", fieldsValue)
        const values = { 
            ...fieldsValue,
            
            dayStart : fieldsValue["dayStart"].format("YYYY-MM-DD"),   
            dayEnd : fieldsValue["dayEnd"].format("YYYY-MM-DD")
        }
       

        console.log("s-desc",values)
        axios 
        .post(`https://localhost:7292/api/workflow`,{
        
            description: values.description,
            dayStart:   values.dayStart,
            dayEnd: values.dayEnd,
            explain: values.explain,
            status : "None",
            isActive: true,
            typeId: values.typeId,
            
        })
        .then(() => {
            navigate("/Home")
        })

        
    }
  const changeEndDay=()=>{
    //   console.log(fieldsValue)
      const check = forms.getFieldValue(['dayStart']).startOf('day').format("YYYY-MM-DD")
      const date = moment.tz(check,"Asia/Ho_Chi_Minh" ).add(7,'days').startOf('day')
      
    //     let dayStart123 = forms.getFieldValue(['dayStart']).startOf('day').toString()
    //     let dayFisrtBeforeChange = dayStart123
    // //  forms.getFieldValue(['dayStart'])
    //  let dayEnd123 = dayFisrtBeforeChange.add(7,'days').startOf('day')
    //  let abc= moment.tz("2022-11-18 11:55","Asia/Ho_Chi_Minh")
     forms.setFieldsValue({
         dayEnd : date 
     })
     



     
    console.log(forms.getFieldValue(['dayStart']).startOf('day').format("YYYY-MM-DD"))
    console.log(date)
    console.log("check", check)
    //  console.log('changedDay', dayStart)
    //  console.log('changedDayccccccccccccccc', dayFisrtBeforeChange)
    
  }
  
    return (
        <div>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={handleCreate}
                form={forms}
            >
                <Form.Item label="Ti??u ????? c??ng vi???c:" name='description' 
                rules={[{required: true, message:"Ti??u ????? kh??ng ???????c ????? tr???ng"}
            
                    ,{max:200, message:"Ti??u ????? kh??ng ???????c qu?? 200 k?? t???"}    
                    ]}
                
                >
                    <Input
                   
                   onChange={handleDesChange}
                    />
                </Form.Item>
                <Form.Item label="Lo???i c??ng vi???c:"  name='typeId' rules={[{required: true, message:"Lo???i c??ng vi???c kh??ng ???????c ????? tr???ng"}]}>
                <Select
                    onSelect={handleTypeChange}
                    
                >
                    {type.map(function (dataType) {
                        return (
                            
                                <Select.Option 
                                key={dataType.typeId}
                                value={dataType.typeId}
                                
                                
                                >{dataType.typeName}</Select.Option>
                            
                        );
                    })}
                    </Select>
                </Form.Item>
                <Form.Item label="Ng??y b???t ?????u:"name='dayStart'
                rules={[{required: true, message: 'Ng??y b???t ?????u kh??ng ???????c ????? tr???ng'},
                () => ({
                    validator(_, value) {
                        
                        if (value.tz("Asia/Ho_Chi_Minh").startOf('day')- moment.tz("Asia/Ho_Chi_Minh").startOf('day') < 0)  {
                            return Promise.reject("Ng??y b???t ?????u kh??ng th??? ??? qu?? kh???")
                        }
                        return Promise.resolve(
                           
                          
                            
                        );
                        
                    }
                })
            ]}
                >
                    <DatePicker
                    format="DD-MM-YYYY"
                    
                    onChange={()=>{
                        changeEndDay()
                        handleDayStartChange()
                    }}
                    />
                </Form.Item>
                <Form.Item label="Ng??y k???t th??c:" name='dayEnd'
                rules={[{required: true, message:"Ng??y k???t th??c kh??ng ???????c ????? tr???ng"},
                ({}) => ({
                    
                    validator(_, value) {
                        
                        if (value.tz("Asia/Ho_Chi_Minh").startOf('day')- moment.tz("Asia/Ho_Chi_Minh").startOf('day') < 0 ) {
                            return Promise.reject("Ng??y k???t th??c kh??ng th??? ??? qu?? kh???")
                        
                        // }else if(getFieldValue('dayStart') + 86400000 > value) {

                        //     return value
                        }
                        return Promise.resolve(
                            
                        );
                    }
                })
            ]}
                >
                    <DatePicker
                    format="DD-MM-YYYY"
                    disabledDate={d =>  d.isBefore(forms.getFieldValue(['dayStart'])===undefined ?moment.tz("Asia/Ho_Chi_Minh").startOf('day'):forms.getFieldValue(['dayStart']))  }
                    onFinish={handleDayEndChange}
                    />
                </Form.Item>
                <Form.Item label="Di???n gi???i:" name='explain'
                rules={[{required: true, message:"Di???n gi???i kh??ng ???????c ????? tr???ng"}
            
                ,{max:2000, message:"Di???n gi???i kh??ng ???????c qu?? 2000 k?? t???"}    
                ]}
                >
                    <Input.TextArea
                    
                    onChange={handleStatusChange}
                    />
                </Form.Item>
                <Form.Item label="T???o m???i:">
                    <Button
                    type='primary'
                    htmlType='submit'
                    >Create New </Button>
                </Form.Item>
            </Form>
        </div>
    );
}