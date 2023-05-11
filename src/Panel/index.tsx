import React from "react";
import logo from "../Assets/face-id-white.png";
import {Button, Grid, List, Message, Slider, Switch} from "@arco-design/web-react";
import MyHolistic from "./holistic";


const Row = Grid.Row;
const Col = Grid.Col;


function Panel() {
    const onFinish = (values:any) => {
        Message.info("🎉 Apply Successfully!")
    };

    return (
        <Row style={{background:"#282828",height:"100vh",overflowX:"hidden"}}>
            <Col span={18} style={{background:"#282828",height:"100vh",overflow:"hidden"}}>
                <MyHolistic />
            </Col>
            <Col span={6} style={{background:"#282828",height:"100vh",overflowY:"scroll"}}>
                <div className="title-panel">
                    <img
                        src={logo}
                        alt="logo"
                        style={{width: '44px'}}
                    />
                    <span>  </span>
                    Panel
                    <div style={{fontWeight:100,fontSize:16,fontFamily:"initial"}}>
                        📎 Display four parts of content: real person video, facial recognition, virtual digital person, and virtual digital person management.
                    </div>
                    <div style={{fontWeight:100,fontSize:24,marginTop:24,marginBottom:8}}>
                        Face Point Classifier
                    </div>
                    <div style={{fontWeight:100,fontSize:16,fontFamily:"initial"}}>
                        <List
                            style={{marginLeft:"6%",marginRight:"6%",marginBottom:10,width:"88%",color:"white",overflowY:"scroll",height:"24vh"}}
                            dataSource={[
                                'eye_right = [33, 133, 160, 159, 158, 145, 153]',
                                'eye_left = [263, 362, 387, 386, 385, 374]',
                                'head = [10, 152]',
                                'nose_tip = 1',
                                'upper_lip = 13',
                                'lower_lip = 14',
                                'upper_outer_lip = 12',
                                'mouth_corner_left = 291',
                                'mouth_corner_right = 61',
                                'lowest_chin = 152',
                                'upper_head = 10',
                                'mouth_frown_left = 422',
                                'mouth_frown_right = 202',
                                'mouth_left_stretch = 287',
                                'mouth_right_stretch = 57',
                                'lowest_lip = 17',
                                'under_lip = 18',
                                'over_upper_lip = 164',
                                'left_upper_press = [40, 80]',
                                'left_lower_press = [88, 91]',
                                'right_upper_press = [270, 310]',
                                'right_lower_press = [318, 321]',
                                'squint_left = [253, 450]',
                                'squint_right = [23, 230]',
                                'right_brow = 27',
                                'right_brow_lower = [53, 52, 65]',
                                'left_brow = 257',
                                'left_brow_lower = [283, 282, 295]',
                                'inner_brow = 9',
                                'upper_nose = 6',
                                'cheek_squint_left = [359, 342]',
                                'cheek_squint_right = [130, 113]'
                            ]}
                            render={(item, index) => <List.Item key={index}>{item}</List.Item>}
                        />
                    </div>
                    <div style={{fontWeight:100,fontSize:24,marginTop:16}}>
                        Expression Management
                    </div>
                    <Row style={{fontWeight:100,fontSize:16,fontFamily:"initial",color:"white"}}>
                        <Col span={12} style={{padding:12}}>
                            Anger <span>{"  "} </span> <Switch/>
                        </Col>
                        <Col span={12} style={{padding:12}}>
                            Sad <Switch/>
                        </Col>
                        <Col span={12} >
                            Surprise <Switch/>
                        </Col>
                        <Col span={12} >
                            Joy <Switch/>
                        </Col>
                        <Col span={12} style={{padding:12}}>
                            Disgust <Switch/>
                        </Col>
                        <Col span={12} style={{padding: 12}}>
                            Fear <Switch/>
                        </Col>
                    </Row>
                    <div style={{fontWeight: 100, fontSize: 24, marginTop: 16, marginBottom: 8}}>
                        Movement Management
                    </div>
                    <div style={{
                        fontWeight: 100,
                        fontSize: 16,
                        fontFamily: "initial",
                        color: "white",
                    }}>
                        Filter All Actions <Switch/>
                        <Button style={{width: "90%", fontWeight: 900, marginBottom: "20px",marginTop:24}} shape="round"
                                onClick={onFinish}
                                type='primary'>Apply</Button>
                        <Button  style={{width: "90%", fontWeight: 900, marginBottom: "20px"}} shape="round"
                                onClick={onFinish}
                                >Go to Unreal Engine</Button>
                    </div>
                </div>
            </Col>
        </Row>

    );
}

export default Panel;
