import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';

import { Button, Table, Modal, Input, Col, Form} from 'antd';
import axios from 'axios';
import moment from 'moment';
import {Link} from "react-router-dom";
import {EditFilled, CloseCircleOutlined, CloseSquareOutlined, WarningOutlined} from "@ant-design/icons";

function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [searchText, setSearchText] = useState("");
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    title: "Bạn Chắc Chứ?",
    content: (<p>Bạn có muốn xóa công việc này?</p>),
    footer: (<div style={{textAlign: 'left'}}>
        <Button>Delete</Button>
        <Button>Cancel</Button>
    </div>)
})
const [modal, setModal] = useState({
  isOpen: false,
  data: {},

});
  useEffect(() =>{
    axios
    .get(`https://localhost:7292/api/workflow`,{})
    .then((res)=>{
      let repData = res.data;
      repData.forEach((element)=>{
        
        element.isActive = element.isActive===true? "Mới Tạo" : "Đã Gửi Duyệt" 
        element.typeId = element.typeId ===1 ? "Xử lý hồ sơ vay vốn" : element.typeId
        element.typeId = element.typeId ===2 ? "Xử lý hồ sơ đăng ký dịch vụ" : element.typeId
        element.typeId = element.typeId ===3 ? "Giải ngân" : element.typeId
        element.typeId = element.typeId ===4 ? "Khác" : element.typeId
        element.dayStart = moment(new Date( element.dayStart).toLocaleDateString("en-US")).format('DD/MM/YYYY');
        element.dayEnd = moment(new Date( element.dayEnd).toLocaleDateString("en-US")).format('DD/MM/YYYY');
        element.action=[
          <Button>
          <Link to={`/editWork/${element.id}`} id="editButton">
                            <EditFilled style={{ color : 'Blue',fontSize: "13px"}}/>
                           
          </Link>
          </Button>,
          <Button
          className="buttonState"
              disabled={element.isActive === "Đã Gửi Duyệt"}
              onClick={() => {

                  setDeleteModal({
                      ...deleteModal,
                      footer: (<div style={{textAlign: 'left'}}>
                          <Button
                         style={{backgroundColor:'red', color: 'white'}}
                          shape="round"
                              className = ' buttonSave'
                              onClick={() => {
                                  axios.delete(`http://localhost:5067/api/workflow/${element.id}`).then(
                                      (response) => {

                                          setDeleteModal({...deleteModal, is: false})
                                          window.location.reload();
                                      }).catch(() => {
                                        setDeleteModal({
                                            ...deleteModal, isOpen: true
                                            , footer: null
                                            , title: 'Bạn Không Thể Xóa Công Việc Này ' 
                                            , content: (<p>
                                                Công Việc Này Hiện Đã  Được Gửi Duyệt!!
                                            </p>),

                                        })
                                      
                                  })
                              }}
                          >Delete</Button>
                          <Button
                          shape="round"
                          
                          className = ' buttonCancel' onClick={() =>{
                              setDeleteModal({...deleteModal, isOpen: false })
                          }}>Cancel</Button>
                      </div>)
                      , isOpen: true
                  })
              }}
      >
          <CloseCircleOutlined
              id="deleteButton" className="Delete"
              style={{color: "red", fontSize: "13px"}}

          />
      </Button>
        ];
      })
      console.log(res.data);
      setData(res.data)
    })
    .catch(function(err){
      console.log(err.message);
    })
  },[])
  const columns =[
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      render: (text, record, id) => id + 1,
    },
    {
      title: 'Tiêu Đề',
      dataIndex: 'description',
      key : 'description',
    },
    {
      title: 'Loại Công Việc',
      dataIndex: 'typeId',
      key : 'typeId',
    },
    {
      title: 'Ngày Bắt Đầu',
      dataIndex: 'dayStart',
      key : 'dayStart',
      sorter: (a, b) => {
        if (a.dayStart > b.dayStart) {
            return -1;
        }
        if (b.dayStart > a.dayStart) {
            return 1;
        }
        return 0;
    },
    },
    {
      title: 'Ngày Kết Thúc',
      dataIndex: 'dayEnd',
      key : 'dayEnd',
      sorter: (a, b) => {
        if (a.dayEnd > b.dayEnd) {
            return -1;
        }
        if (b.dayEnd > a.dayEnd) {
            return 1;
        }
        return 0;
    },
    },
    {
      title: 'Diễn Giải',
      dataIndex: 'explain',
      key : 'explain ',
      ellipsis: true,
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'isActive',
      key : 'isActive',
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
  },
  ]
  const finalData =
        searchText === ""
            ? data
            : data.filter(
                (u) =>
                    (u.description.toLowerCase()).replace(/\s+/g, '').includes(searchText.toLowerCase().replace(/\s+/g, '')) ||
                    u.typeId.toLowerCase().includes(searchText.toLowerCase()) ||
                    u.isActive.toLowerCase().includes(searchText.toLowerCase()) ||
                    u.dayStart.toLowerCase().includes(searchText.toLowerCase())
            );
  const pagination = {
    current: page,
    PageSize: pageSize,
    total: finalData.length,
    pageSizeOptions: [5, 10, 15, 20],
    className: "ant-btn-dangerous",
    dangerous: true,
    onChange: (page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
    },
};
console.log("meme", data.length)

  return (
    <div >
        <Col   span={8} offset={12}>
            <Form.Item label="Tìm Kiếm:">
        <Input.Search
                        
                        placeholder="Tìm kiếm theo tiêu đề và loại công việc"
                        maxLength={255}
                        allowClear
                        onSearch={(e) => {
                            setPage(1)
                            setSearchText(e.replace(/ /g, ''))
                        }}


                    />
                    </Form.Item>
                    </Col>
       <Modal
                visible={deleteModal.isOpen}
                title={deleteModal.title}
                footer={deleteModal.footer}
                closable={true}
                destroyOnClose={true}
                closeIcon={<CloseSquareOutlined style={{color: "red", fontSize: "20px"}}/>}
                onCancel={()=>{setDeleteModal({...deleteModal,isOpen:false})
            window.location.reload()
            }
            }
            >
                {deleteModal.content}
            </Modal>
            <Modal
                visible={modal.isOpen}
                title='Detail Work'
                onOk={() => {
                    setModal({...modal, isOpen: false});
                }}
                footer={[

                    
                    <Button
                    shape="round"
                    style={{background: "#e30c18" , color: "white"}}
                    onClick={() => {

                        setDeleteModal({
                            ...deleteModal,
                            footer: (<div style={{textAlign: 'left'}}>
                                <Button
                                style={{backgroundColor:'red', color: 'white'}}
                                shape="round"
                                    className = ' buttonSave'
                                    onClick={() => {
                                        axios.delete(`http://localhost:5067/api/workflow/${modal.data.id}`).then(
                                            (response) => {
      
                                                setDeleteModal({...deleteModal, is: false})
                                                window.location.reload();
                                            }).catch(() => {
      
                                                setDeleteModal({
                                                    ...deleteModal, isOpen: true
                                                    , footer: null
                                                    , title: 'Bạn Không Thể Xóa Công Việc Này'
                                                    , content: (<h3
                                                    style={{color: 'red'}}
                                                    >
                                                        Công Việc Này Hiện Đã Được Gửi Duyệt!! <WarningOutlined />
                                                    </h3>),

                                                })
                                        })
                                    }}
                                >Delete</Button>
                                <Button
                                
                                shape="round"
                                className = ' buttonCancel' onClick={() =>{
                                    setDeleteModal({...deleteModal, isOpen: false })
                                }}>Cancel</Button>
                            </div>)
                            , isOpen: true
                        })
                    }}
                    >
                         Delete
                    </Button>,
                    <Button
                    shape="round"
                    style={ { color: "black"}}
                    key="back" onClick={() => {
                        setModal({...modal, isOpen: false});
                    }
                    }>Close</Button>
                    
                ]}
                closable={false}
                
            >
              
            

                <table
               
                >
                    <tr>

                        <td style={{fontSize: '15px', color: '#838688'}}>ID</td>
                        <td style={{
                            fontSize: '15px',
                            color: '#838688',
                            textAlign: 'justify',
                            paddingLeft: '35px'
                        }}>{modal.data.id}</td>
                    </tr>
                    <tr>
                        <td style={{fontSize: '15px', color: '#838688'}}>Tiêu Đề</td>
                        <td style={{
                            fontSize: '15px',
                            color: '#838688',
                            textAlign: 'justify',
                            paddingLeft: '35px'
                        }}>{modal.data.description}</td>
                    </tr>
                    <tr>
                        <td style={{fontSize: '15px', color: '#838688'}}>Loại Công Việc</td>
                        <td style={{
                            fontSize: '15px',
                            color: '#838688',
                            textAlign: 'justify',
                            paddingLeft: '35px'
                        }}>{modal.data.typeId}</td>
                    </tr>
                    <tr>
                        <td style={{fontSize: '15px', color: '#838688'}}>Ngày Bắt Đầu</td>
                        <td style={{
                            fontSize: '15px',
                            color: '#838688',
                            textAlign: 'justify',
                            paddingLeft: '35px'
                        }}>{modal.data.dayStart}</td>
                    </tr>
                    <tr>
                        <td style={{fontSize: '15px', color: '#838688'}}>Ngày Kết Thúc</td>
                        <td style={{
                            fontSize: '15px',
                            color: '#838688',
                            textAlign: 'justify',
                            paddingLeft: '35px'
                        }}>{modal.data.dayEnd}</td>
                    </tr>
                    <tr>
                        <td style={{fontSize: '15px', color: '#838688', width:"25%"}}>Diễn giải</td>
                        <td style={{
                            fontSize: '15px',
                            color: '#838688',
                            textAlign: 'justify',
                            paddingLeft: '35px',
                            
                        }}>{modal.data.explain}</td>
                    </tr>
                    <tr>
                        <td style={{fontSize: '15px', color: '#838688'}}>Trạng Thái</td>
                        <td style={{
                            fontSize: '15px',
                            color: '#838688',
                            textAlign: 'justify',
                            paddingLeft: '35px'
                        }}>{modal.data.isActive}</td>
                    </tr>
                </table>


            </Modal>
            <h1 >Danh Sách Công Việc</h1>
      <Table
      key ="Id"
      columns = {columns}
      dataSource={finalData}
      pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['5', '10', '15', '20']}}
      onRow={(record) => {
        return {
            onClick: (e) => {

                if (e.target.className === 'ant-table-cell ant-table-cell-row-hover') {
                    setModal({
                        ...modal, isOpen: true
                        , data: {
                            id: record.id,
                            description: record.description,
                            typeId: record.typeId,
                            dayStart: record.dayStart,
                            dayEnd: record.dayEnd,
                            explain: record.explain,
                            isActive: record.isActive
                        }
                    });
                }
                 
                else {
                    setModal({...modal, isOpen: false})
                  
                }


            }
        }
    }}
      >
      </Table>
     
    </div>
  );
}

export default Home;
