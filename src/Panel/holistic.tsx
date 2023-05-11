import React, { createRef, useEffect } from 'react'
// @ts-ignore
import { Holistic } from '@mediapipe/holistic/holistic'
import {
    drawConnectors,
    drawLandmarks,
    lerp,
    // @ts-ignore
} from '@mediapipe/drawing_utils/drawing_utils'
// @ts-ignore
import { POSE_CONNECTIONS, POSE_LANDMARKS } from '@mediapipe/pose/pose'


import {
    FACEMESH_TESSELATION,
    FACEMESH_RIGHT_EYE,
    FACEMESH_RIGHT_EYEBROW,
    FACEMESH_LEFT_EYE,
    FACEMESH_LEFT_EYEBROW,
    FACEMESH_FACE_OVAL,
    FACEMESH_LIPS,
    // @ts-ignore
} from '@mediapipe/face_mesh/face_mesh'
// @ts-ignore
import { HAND_CONNECTIONS } from '@mediapipe/hands/hands'

// @ts-ignore
import { Camera } from '@mediapipe/camera_utils/camera_utils'
import Row from '@arco-design/web-react/es/Grid/row'
import Col from '@arco-design/web-react/es/Grid/col'
import p0 from '../Assets/0.gif'
import DesktopCapture from './desktop'

function MyHolistic() {

    const canvasElementRef:any = createRef()
    const videoElementRef:any = createRef()
    useEffect(() => {
        // @ts-ignore
        const holistic = new Holistic({
            locateFile: (file:any) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`
            },
        })
        holistic.setOptions({
            upperBodyOnly: true,
            smoothLandmarks: true,
            minDetectionConfidence: 0.1,
            minTrackingConfidence: 0.1,
        })

        const camera = new Camera(videoElementRef.current, {
            onFrame: async () => {
                await holistic.send({ image: videoElementRef.current })
            },
            width: 1280,
            height: 960,
        })
        holistic.onResults(onResults)
        camera.start()
    }, [])

    function removeElements(landmarks:any, elements:any) {
        for (const element of elements) {
            delete landmarks[element]
        }
    }

    function onResults(results:any) {
        // @ts-ignore
        const canvasCtx = canvasElementRef?.current.getContext('2d')
        const canvasElement:any = canvasElementRef.current

        console.log(results,canvasElementRef?.current,111)
        removeLandmarks(results)

        canvasCtx.save()
        // @ts-ignore
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
        canvasCtx.drawImage(
            results.image,
            0,
            0,
            canvasElement.width,
            canvasElement.height
        )


        canvasCtx.lineWidth = 1
        if (results.poseLandmarks) {
            if (results.rightHandLandmarks) {
                canvasCtx.strokeStyle = '#ff89c6'
                connect(canvasCtx, [
                    [
                        results.poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW],
                        results.rightHandLandmarks[0],
                    ],
                ])
            }
            if (results.leftHandLandmarks) {
                canvasCtx.strokeStyle = '#96c6ee'
                connect(canvasCtx, [
                    [
                        results.poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW],
                        results.leftHandLandmarks[0],
                    ],
                ])
            }
        }


        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
            color: '#ffffff',
            lineWidth: 1
        })
        drawLandmarks(canvasCtx, results.poseLandmarks, {
            color: '#b7de6a',
            fillColor: '#b7de6a',
            lineWidth: 1
        })

        drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
            color: '#ffffff',
            lineWidth: 1,
        })
        drawLandmarks(canvasCtx, results.rightHandLandmarks, {
            color: '#96c6ee',
            fillColor: '#ff89c6',
            lineWidth: 0.5,
            radius: (data:any) => {
                return lerp(data.from.z, -0.15, 0.1, 2, 1)
            },
        })
        drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
            color: '#ffffff',
            lineWidth: 1,
        })
        drawLandmarks(canvasCtx, results.leftHandLandmarks, {
            color: '#96c6ee',
            fillColor: '#b7ce7e',
            lineWidth:  0.5,
            radius: (data:any) => {
                return lerp(data.from.z, -0.15, 0.1, 2, 1)
            },
        })


        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION, {
            color: '#C0C0C070',
            lineWidth: 1,
        })
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_RIGHT_EYE, {
            color: '#ff89c6',
            lineWidth: 2,
        })
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_RIGHT_EYEBROW, {
            color: '#ffdbe2',
            lineWidth: 2,
        })
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LEFT_EYE, {
            color: '#96c6ee',
            lineWidth: 2,
        })
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LEFT_EYEBROW, {
            color: '#bfdef8',
            lineWidth: 2,
        })
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_FACE_OVAL, {
            color: '#E0E0E0',
            lineWidth: 2,
        })
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LIPS, {
            color: '#ffffff',
            lineWidth: 2,
        })

        canvasCtx.restore()
    }

    function removeLandmarks(results:any) {
        if (results.poseLandmarks) {
            removeElements(results.poseLandmarks, [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
            ])
        }
    }

    function connect(ctx:any, connectors:any) {
        const canvas = ctx.canvas
        for (const connector of connectors) {
            const from = connector[0]
            const to = connector[1]
            if (from && to) {
                if (
                    from.visibility &&
                    to.visibility &&
                    (from.visibility < 0.1 || to.visibility < 0.1)
                ) {
                    continue
                }
                ctx.beginPath()
                ctx.moveTo(from.x * canvas.width, from.y * canvas.height)
                ctx.lineTo(to.x * canvas.width, to.y * canvas.height)
                ctx.stroke()
            }
        }
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <div className="App">
            <Row>
                <Col span={12} >
                    <video
                        style={{width:"100%",height:"50vh"}}
                        ref={videoElementRef}
                    ></video>
                </Col>
                <Col span={12} >
                    <canvas
                        style={{width:"100%",height:"49vh",margin:5,marginLeft:10}}
                        ref={canvasElementRef}
                    ></canvas>
                </Col>
                <Col span={12} >
                    <img src={p0} alt="example GIF" style={{width:"100%",height:"49vh",background:"black"}}/>
                </Col>
                <Col span={12} >
                    <img src="https://raw.githubusercontent.com/google/mediapipe/master/mediapipe/modules/face_geometry/data/canonical_face_model_uv_visualization.png
                    " alt="example GIF" style={{width:"100%",height:"49vh",background:"black",marginBottom:10,marginLeft:10}}/>
                </Col>
            </Row>
        </div>
    )
}

export default MyHolistic
