import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    Radio,
    
} from 'antd';
import axios from 'axios';
import {useNavigate, useParams, Link} from "react-router-dom";
import moment from "moment";
import 'moment-timezone';
export default function EditWork() {
    const [data, setData] = useState({
            id: "",
             description: "",
            dayStart:   "",
            dayEnd: "",
            explain: "",
            status : "",
            isActive: true,
            typeId: "",
    });
    const fetchData = (url, method, data) => {
        return axios({
            method: method,
            url: url,
            data: data,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
        });
    };
    const [type, setType] = useState([]);
    const [forms] = Form.useForm();
    const navigate = useNavigate();
    const workId =  useParams().id;
    useEffect(() => {
        const workDetailRequest = axios.get(`https://localhost:7292/api/workflow/${workId}`)
        const typeDetailRequest = axios.get(`https://localhost:7292/api/Type`)
        axios.all([workDetailRequest, typeDetailRequest]).then(axios.spread((...response) => {

                const workDetail = response[0].data
                const typeDetail = response[1].data

                forms.setFieldsValue({
                    description: workDetail.description,
                    explain: workDetail.explain,
                    typeId: workDetail.typeId,
                    dayStart: moment.tz(workDetail.dayStart,"Asia/Ho_Chi_Minh"),
                    dayEnd: moment.tz(workDetail.dayEnd, "Asia/Ho_Chi_Minh"),
                    status: workDetail.status,
                    isActive: workDetail.isActive,
                   
                })
                
                setType(response[1].data)
            })
        )
    }, [workId, forms])
    
    
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
        console.log(prop)
        setData({
            ...data,
            dayStart : Datestring
        })
    }
    const handleDayEndChange =(prop, Datestring)=>{
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
    const handleRadioChange=(props)=>{
        console.log(props.target.value)
        setData({...data, isActive: props.target.value })
    }
    const handleUpdate =(fieldsValue) => {
        console.log("create", fieldsValue)
        const values = { 
            ...fieldsValue,
            
            dayStart : fieldsValue["dayStart"].format("YYYY-MM-DD"),   
            dayEnd : fieldsValue["dayEnd"].format("YYYY-MM-DD"),
            
        }
       

        console.log("s-desc",values)
        fetchData
        (`http://localhost:5067/api/workflow/${workId}`,"POST",{
            id : parseInt(workId),
            description: values.description,
            dayStart:   values.dayStart,
            dayEnd: values.dayEnd,
            explain: values.explain,
            status : "None",
            isActive: values.isActive,
            typeId: values.typeId,
        })
        .then(() => {
            
            navigate("/Home")
        })

        
    }
   
    return (
        <div>
             
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={handleUpdate}
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
                <Form.Item label="Lo???i c??ng vi???c:"  name='typeId' 
                rules={[{required: true, message:"Lo???i c??ng vi???c kh??ng ???????c ????? tr???ng"}]}
                
                >
                    
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
                
            ]}>
                    <DatePicker
                    disabled
                    format="DD-MM-YYYY"
                    
                    onChange={handleDayStartChange}
                    />
                </Form.Item>
                <Form.Item label="Ng??y k???t th??c:" name='dayEnd'
                 rules={[{required: true, message:"Ng??y k???t th??c kh??ng ???????c ????? tr???ng"}]}
                >
                    <DatePicker
                    disabled
                    format="DD-MM-YYYY"
                    
                    onChange={handleDayEndChange}
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
                <Form.Item label="Tr???ng Th??i" name="isActive"
                rules={[{required: true, message:"Tr???ng th??i kh??ng ???????c ????? tr???ng"}]}
                >
                    <Radio.Group
                    onChange={handleRadioChange}
                    >
                        <Radio value={true}> M???i t???o</Radio>
                        <Radio value={false}> ???? g???i duy???t</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="C???p nh???t:">
                    <Button
                    type='primary'
                    htmlType='submit'
                    >Update </Button>
                    <Link to={`/Home`}>
                    <Button
                    
                    >Tr??? v??? trang ch??? </Button>
                    </Link>
                    
                </Form.Item>
            </Form>
        </div>
    );
}