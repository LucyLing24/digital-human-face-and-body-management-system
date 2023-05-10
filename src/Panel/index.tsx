import React from "react";
import logo from "../Assets/face-id-white.png";
import {Button, Grid} from "@arco-design/web-react";
import MyHolistic from "./holistic";


const Row = Grid.Row;
const Col = Grid.Col;


function Panel() {
    const onFinish = (values:any) => {
        window.location.replace('menu')
    };

    return (
        <Row style={{background:"#282828",height:"100vh",overflowX:"hidden"}}>
            <Col span={16} style={{background:"#282828",height:"100vh",overflowY:"hidden"}}>
                <MyHolistic />
            </Col>
            <Col span={8} style={{background:"#282828",height:"100vh"}}>
                cdscdsc ds

            </Col>
        </Row>

    );
}

export default Panel;
