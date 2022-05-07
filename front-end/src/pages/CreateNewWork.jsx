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
                <Form.Item label="Tiêu đề công việc:" name='description' 
                rules={[{required: true, message:"Tiêu đề không được để trống"}
            
                    ,{max:200, message:"Tiêu đề không được quá 200 ký tự"}    
                    ]}
                
                >
                    <Input
                   
                   onChange={handleDesChange}
                    />
                </Form.Item>
                <Form.Item label="Loại công việc:"  name='typeId' rules={[{required: true, message:"Loại công việc không được để trống"}]}>
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
                <Form.Item label="Ngày bắt đầu:"name='dayStart'
                rules={[{required: true, message: 'Ngày bắt đầu không được để trống'},
                () => ({
                    validator(_, value) {
                        
                        if (value.tz("Asia/Ho_Chi_Minh").startOf('day')- moment.tz("Asia/Ho_Chi_Minh").startOf('day') < 0)  {
                            return Promise.reject("Ngày bắt đầu không thể ở quá khứ")
                        }
                        return Promise.resolve(
                            changeEndDay(),
                            console.log(value),
                            console.log("sadasdasd",forms.getFieldValue(['dayStart']))
                        );
                        
                    }
                })
            ]}
                >
                    <DatePicker
                    format="DD-MM-YYYY"
                    
                    onChange={handleDayStartChange}
                    />
                </Form.Item>
                <Form.Item label="Ngày kết thúc:" name='dayEnd'
                rules={[{required: true, message:"Ngày kết thúc không được để trống"},
                ({}) => ({
                    
                    validator(_, value) {
                        
                        if (value.tz("Asia/Ho_Chi_Minh").startOf('day')- moment.tz("Asia/Ho_Chi_Minh").startOf('day') < 0 ) {
                            return Promise.reject("Ngày kết thúc không thể ở quá khứ")
                        
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
                    disabledDate={d =>  d.isBefore(forms.getFieldValue(['dayStart'])==undefined ?moment.tz("Asia/Ho_Chi_Minh").startOf('day'):forms.getFieldValue(['dayStart']))  }
                    onChange={handleDayEndChange}
                    />
                </Form.Item>
                <Form.Item label="Diễn giải:" name='explain'
                rules={[{required: true, message:"Diễn giải không được để trống"}
            
                ,{max:2000, message:"Diễn giải không được quá 2000 ký tự"}    
                ]}
                >
                    <Input.TextArea
                    
                    onChange={handleStatusChange}
                    />
                </Form.Item>
                <Form.Item label="Tạo mới:">
                    <Button
                    htmlType='submit'
                    >Create New </Button>
                </Form.Item>
            </Form>
        </div>
    );
}