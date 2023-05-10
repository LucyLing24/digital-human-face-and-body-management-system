import { createRef, useEffect } from 'react'
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
            smoothLandmarks: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        })

        const camera = new Camera(videoElementRef.current, {
            onFrame: async () => {
                await holistic.send({ image: videoElementRef.current })
            },
            width: 1280,
            height: 720,
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
                canvasCtx.strokeStyle = '#00FF00'
                connect(canvasCtx, [
                    [
                        results.poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW],
                        results.rightHandLandmarks[0],
                    ],
                ])
            }
            if (results.leftHandLandmarks) {
                canvasCtx.strokeStyle = '#FF0000'
                connect(canvasCtx, [
                    [
                        results.poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW],
                        results.leftHandLandmarks[0],
                    ],
                ])
            }
        }


        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
            color: '#00FF00',
            lineWidth: 1
        })
        drawLandmarks(canvasCtx, results.poseLandmarks, {
            color: '#00FF00',
            fillColor: '#FF0000',
            lineWidth: 1
        })

        drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
            color: '#00CC00',
            lineWidth: 1,
        })
        drawLandmarks(canvasCtx, results.rightHandLandmarks, {
            color: '#00FF00',
            fillColor: '#FF0000',
            lineWidth: 0.5,
            radius: (data:any) => {
                return lerp(data.from.z, -0.15, 0.1, 2, 1)
            },
        })
        drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
            color: '#CC0000',
            lineWidth: 1,
        })
        drawLandmarks(canvasCtx, results.leftHandLandmarks, {
            color: '#FF0000',
            fillColor: '#00FF00',
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
            color: '#FF3030',
            lineWidth: 2,
        })
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_RIGHT_EYEBROW, {
            color: '#FF3030',
            lineWidth: 2,
        })
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LEFT_EYE, {
            color: '#30FF30',
            lineWidth: 2,
        })
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LEFT_EYEBROW, {
            color: '#30FF30',
            lineWidth: 2,
        })
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_FACE_OVAL, {
            color: '#E0E0E0',
            lineWidth: 2,
        })
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LIPS, {
            color: '#E0E0E0',
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
            <header className="App-header">
                <video
                    style={{
                        position: 'relative',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        width: '320px',
                        height: '170px',
                    }}
                    ref={videoElementRef}
                ></video>
                <canvas
                    ref={canvasElementRef}
                    style={{
                        position: 'relative',
                        left: '0',
                        top: '0',
                        width: '320px',
                        height: '170px',
                    }}
                ></canvas>
            </header>
        </div>
    )
}

export default MyHolistic
