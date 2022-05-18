import "antd/dist/antd.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button ,Layout, Menu } from "antd";

import Home from "./pages/Home.jsx";
import CreateNewWork from "./pages/CreateNewWork.jsx";
import EditWork from "./pages/EditWork.jsx";
import SliderDemo from "./pages/SliderDemo.jsx";

import { GithubOutlined , PlusOutlined, HomeFilled} from "@ant-design/icons";
const { Content, Footer, Header,Sider } = Layout;
function App() {

  return (
    <div>
     
      <Header
      style={{backgroundColor:"black"}}
      >
        <a href="/">
        <h1
        style={{color: 'white'}}
        >
       <GithubOutlined />   GitHub </h1>
       
       
       </a>
       
      </Header>
      <Layout>
      <Sider
      style={{marginTop: '20px'}}
      theme="light"
      
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      
        <Menu
        theme="light"
        style={{marginTop: '50px'}}
        >
        
          
          <Menu.Item
          style={{backgroundColor:"#F0F2F5"}}
          >
            <a  href="/home"><h1 style={{color:"black"}}> <HomeFilled />   Trang Chủ </h1></a>
          </Menu.Item>
          <Menu.Item
          style={{backgroundColor:"#F0F2F5"}}
          >
            <a href="/create"><h1 style={{color:"black"}} ><PlusOutlined />  Tạo Mới Công Việc </h1></a>
          </Menu.Item>

        </Menu>
        </Sider>
        
        <Layout>
          
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <BrowserRouter>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/create" element={<CreateNewWork />} />
                  <Route path="/editWork/:id" element={<EditWork />} />
                  <Route path="/" element={<SliderDemo />} />
                </Routes>
              </BrowserRouter>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
          Designed & Developed by     <GithubOutlined />    quan27318
          </Footer>
        </Layout>
        
      </Layout>
    </div>
  );
}

export default App;
