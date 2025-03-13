
import React, { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import "./ConsentSinature.css";
import "./sigCanvas.css";


function ConsentSinature() {
    const [imageURL, setImageURL] = useState(null);
    const sigCanvas = useRef({});
    const clear = () => sigCanvas.current.clear();


    const save = () =>
        setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));

    return (
        <div className="App">
            <div className="mb-1">
                <SignaturePad
                    ref={sigCanvas}
                    canvasProps={{
                        className: "signatureCanvas"
                    }}
                />
            </div>
            <div className="mb-0">
                <button className="btn btn-sign-save mr-2" onClick={save}>Save</button>
                <button className="btn btn-sign-clear" onClick={clear}>Clear</button>
            </div>
            <div className="pt-2">
                {imageURL ? (
                    <img
                        src={imageURL}
                        alt="my signature"
                        style={{
                            display: "block",
                            margin: "0 auto",
                            border: "1px solid #CED4DA",
                            borderRadius: "4px",
                            width: "100%",
                            height: "100%",
                        }}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default ConsentSinature;