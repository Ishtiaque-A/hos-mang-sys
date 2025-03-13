import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NoMatch = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const storageData = localStorage.getItem('userData')
    if (storageData == null) {
      navigate('/');
    }  
  }, [])
    return (
        // <div className="pt-5">
        //   <Link exact to ="*" style={{textDecoration: "none"}} ><h2 className="text-center text-muted pt-5"></h2></Link>
        // </div>
        <div></div>
    );
};

export default NoMatch;