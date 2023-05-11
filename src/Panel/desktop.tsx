import React, { useEffect, useRef } from 'react';

function DesktopCapture() {
    const videoRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getDisplayMedia({ video: true })
            .then((stream) => {
                // @ts-ignore
                videoRef.current.srcObject = stream;
            })
            .catch((error) => {
                console.error('Error accessing desktop capture:', error);
            });
    }, []);

    return (
        <div>
            <video ref={videoRef} autoPlay muted style={{width:"100%",height:"50vh",background:"black"}}/>
        </div>
    );
}

export default DesktopCapture;
