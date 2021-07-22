import React from "react";

const VerificationCode: React.FC<any> = (props) => {
    const {src,refreshCode}: any = props;
    React.useEffect(()=>{
        refreshCode()
    },[]);
    return (
        <img alt="验证码" style={{display: 'block', height: '40px', width: '100%'}} src={src} onClick={refreshCode}/>
    );
};

export default React.memo(VerificationCode);