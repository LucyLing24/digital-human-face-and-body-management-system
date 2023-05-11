import React, {useState} from "react";
import {Button, Form, Grid, Input, Message} from "@arco-design/web-react";
import girl from "../Assets/girl.gif";
import p0 from '../Assets/0.gif'
import p1 from '../Assets/1.gif'
import p2 from '../Assets/2.gif'
import p3 from '../Assets/3.gif'
import p4 from '../Assets/4.gif'
import p5 from '../Assets/5.gif'
import p6 from '../Assets/6.gif'
import p7 from '../Assets/7.gif'
import p8 from '../Assets/8.gif'
import human from "../Assets/human/default.png"
import logo from "../Assets/face-id-white.png";
const Row = Grid.Row;
const Col = Grid.Col;

const imageSrc = [
    {
        url: 'https://github.com/LucyLing24/my/assets/56916034/5b046b9d-e27c-4208-b23e-9daabf3aafef',
        gif: p0
    },
    {
        url: 'https://metahuman.unrealengine.com/static/media/pia_2_1470w.bbec4198bd18cf0ed1b2.webp',
        gif: p1
    }
    ,
    {
        url: 'https://metahuman.unrealengine.com/static/media/skye_1_1470w.7afb4ff752b56f6d8404.webp',
        gif: p2
    },
    {
        url: 'https://metahuman.unrealengine.com/static/media/amelia_2_1470w.534ade206cb81ad92747.webp',
        gif: p3
    },
    {
        url: 'https://metahuman.unrealengine.com/static/media/aoi_1_1470w.33775a7dfe4f73dd3bf6.webp',
        gif: p4
    },
    {
        url: 'https://metahuman.unrealengine.com/static/media/bryan_1_1470w.e8efaf954c83a4a1e663.webp',
        gif: p6
    },
    {
        url: 'https://metahuman.unrealengine.com/static/media/maria_1_1470w.8819ac464102d351d5f5.webp',
        gif: p5
    },
    {
        url: 'https://metahuman.unrealengine.com/static/media/omar_1_1470w.27bec5a888104bf9ee22.webp',
        gif: p8
    },
    {
        url: 'https://metahuman.unrealengine.com/static/media/stephane_2_1470w.1a0fde94a44ccaebd830.webp',
        gif: p7
    }
];

function Menu() {
    const [form] = Form.useForm();
    const onFinish = (values:any) => {
        window.location.replace('panel')
    };
    const [showGif,setShowGif]=useState(human);


    return (
        <Row style={{background:"#282828",height:"100vh",overflowX:"hidden"}}>
            <Col span={16} style={{background:"#282828",height:"100vh",overflowY:"hidden"}}>
                <img src={showGif} alt="example GIF" style={{width: '100%'}}/>
            </Col>
            <Col span={8} style={{background:"#282828",height:"100vh"}}>
                <div style={{margin:24}}>
                    <div className="title-login">
                        <img
                            src={logo}
                            alt="logo"
                            style={{width: '44px'}}
                        />
                        <span>  </span>
                        MENU
                        <div style={{fontWeight:100,fontSize:16,fontFamily:"initial"}}>
                            📎 Tips: please choose a digital avatar.
                        </div>
                    </div>
                    <Row gutter={12}>
                        {imageSrc.map((src, index) => (
                            <Col sm={8}>
                                <img style={{borderRadius: 32,margin:4}} src={src.url} alt={index.toString()} width="100%"
                                     onClick={()=>{setShowGif(src.gif)}}
                                />
                            </Col>
                        ))}
                    </Row>
                    <Button className="title-login" style={{margin: 24,width:"90%",fontWeight:900}} shape="round"  onClick={onFinish}
                            type='primary'>Next</Button>
                </div>

            </Col>
        </Row>
    );
}

export default Menu;
