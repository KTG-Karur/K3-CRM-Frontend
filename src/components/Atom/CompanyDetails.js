import React from 'react'
import harshiniFincorpLogo from '../../assets/images/K3_Logo.png';

function CompanyDetails(props) {
    const { fontSize, imgSize, classStyle } = props;
    return (
        <div className={classStyle}>
            <h3>
                <img
                    src={harshiniFincorpLogo}
                    alt="harshiniFincorpLogo"
                    style={{ width: imgSize }}
                />
            </h3>
            <div style={{ fontSize }}>
               <b><i style={{color: 'red'}} className={'fe-map-pin'}></i> Plot No: 11,
                Opposite District Collectorate,
                Thanthoni Malai,
                Karur - 639 007.</b>
            </div>
            <div>
            <span style={{ fontSize }}>
           <b> <i style={{color: 'orange'}} className={'fe-mail'}></i> support@harshinifincorp.com</b>
            </span>
            <span style={{ fontSize }} className='mx-2'>
            <b><i style={{color: 'blue'}} className={'fe-phone'}></i> +91 9876543210 </b>
            </span>
            </div>
        </div>
    )
}

export default CompanyDetails