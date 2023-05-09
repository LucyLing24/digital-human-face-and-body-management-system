import React from "react";
// @ts-ignore
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Button, Form, Grid, Input, Message} from '@arco-design/web-react';
import logo from "../Assets/face-id-white.png";
import FormItem from "@arco-design/web-react/es/Form/form-item";
const Row = Grid.Row;
const Col = Grid.Col;


const imageSrc = [
    'https://metahuman.unrealengine.com/static/media/pia_2_1470w.bbec4198bd18cf0ed1b2.webp',
    'https://metahuman.unrealengine.com/static/media/skye_1_1470w.7afb4ff752b56f6d8404.webp',
    'https://metahuman.unrealengine.com/static/media/amelia_2_1470w.534ade206cb81ad92747.webp',
    'https://metahuman.unrealengine.com/static/media/aoi_1_1470w.33775a7dfe4f73dd3bf6.webp',
    'https://metahuman.unrealengine.com/static/media/bryan_1_1470w.e8efaf954c83a4a1e663.webp',
    'https://metahuman.unrealengine.com/static/media/maria_1_1470w.8819ac464102d351d5f5.webp',
    'https://metahuman.unrealengine.com/static/media/omar_1_1470w.27bec5a888104bf9ee22.webp',
    'https://metahuman.unrealengine.com/static/media/stephane_2_1470w.1a0fde94a44ccaebd830.webp'
];
const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    fade:true,
    pauseOnHover:false
};

function Login() {
    const [form] = Form.useForm();
    const onFinish = (values:any) => {
        window.location.replace('menu')
    };

    function isValidEmail(email:any) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function isValidPassword(password:any) {
        const passwordRegex = /^.{8,}$/;
        return passwordRegex.test(password);
    }

    return (
        <Row >
            <Col md={16} style={{background:"#282828",height:"100vh",overflow: "hidden"}} sm={24}>
                <Slider {...settings}>
                    {imageSrc.map((src, index) => (
                        <div key={index} className="img">
                            <img src={src} alt={index.toString()} className="active"/>
                        </div>
                    ))}
                </Slider>
            </Col>
            <Col md={8} style={{background:"#282828",height:"100vh",overflowY: "scroll",overflowX: "hidden"}} sm={24}>
                <div>
                    <div className="title">
                        Digital Human Face and Body Management System
                    </div>
                    {/*<div className="title-zh">*/}
                    {/*    数字人面部和肢体动作管理系统*/}
                    {/*</div>*/}
                    <div className="title-login">
                        <img
                            src={logo}
                            alt="logo"
                            style={{width: '44px'}}
                        />
                        <span>  </span>
                        LOGIN
                        <div style={{fontWeight:100,fontSize:16,fontFamily:"initial"}}>
                            📎 Please log in the system
                        </div>
                    </div>
                    <div>
                        <Form form={form} className="login-form" autoComplete='off'
                              onSubmit={(v) => {
                                  window.location.replace("/menu")
                              }}
                        >
                            <FormItem label='Email' field='email' rules={[
                                {
                                    validator(value, cb) {
                                        if (!isValidEmail(value)) {
                                            return cb('Please input a valid email');
                                        }
                                        return cb();
                                    },
                                },
                            ]}>
                                <Input placeholder='please enter email' style={{width:"70%"}}/>
                            </FormItem>
                            <FormItem label='Password'  field='password' rules={[
                                {
                                    validator(value, cb) {
                                        if (!isValidPassword(value)) {
                                            return cb('At lease 8 characters');
                                        }
                                        return cb();
                                    },
                                },
                            ]}>
                                <Input.Password placeholder='please enter your password' style={{width:"70%"}}/>
                            </FormItem>
                            <FormItem >
                                <Button style={{margin: 24,width:"100%",fontWeight:900}} htmlType="submit"
                                        type='primary'>Login</Button>
                                <Button style={{marginLeft: 24,marginRight:24,marginBottom:"5vh",width:"100%",fontWeight:900}}
                                        onClick={()=>{Message.info("🎉Congratulations! Successfully sign up. Please log in. 🎉")}}
                                        >Sign Up</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>

            </Col>
        </Row>
    );
}

export default Login;
