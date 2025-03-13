import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import './NewRx.css';
import mims from '../../../../src/Images/mims-Integrated-logo.png';
import axios from 'axios';
import { cloudUrl } from "./../../../index";

export default function MimsProductDetails(props) {
    const initialData = props.mimsData;
    console.log("mims data", props)
    const [mimsData, setMimsData] = useState('');
    const [mimsProduct, setMimsProduct] = useState(['']);
    const [updateProduct, setUpdateProduct] = useState('')
    const [tradeName, settradeName] = useState()
    
    useEffect(() => {
        axios.get('/drugs-of-mims').then(res => {
            setMimsProduct(res.data.drugs)
        })
    }, [updateProduct]);
    const customStyles = {
        content: {
            top: '37%',
            left: '21%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: "80%",
            height: "83%",
            background: "white",
            padding: "15px",
            marginLeft: "38%",
        },

    };
    const handleSelect = (item) => {
        cloudUrl.get(`generic/${item.guid}`).then(res => {
            setMimsData(res.data.Result.Content.GGPI)
        })
    }
    const filterProduct = (e) => {
        const data = mimsProduct.filter(item => item.drug_name.toLowerCase().match(e.target.value.toLowerCase()));
        e.target.value.length > 0 ?
            setMimsProduct(data) : setUpdateProduct(Math.random())
        // setMimsProduct(data) 
    }
    if (!props.mimsData) {
        return (
            <Modal
                isOpen={props.modalIsOpenMimsProduct}
                onRequestClose={props.closeModalMimsProduct}
                style={customStyles}
                contentLabel="Example Modal"
                transition={{ animation: 'scale', duration: 500 }}
            >


                <div>
                    <span className='float-end' style={{ fontSize: "15px", cursor: "pointer", marginTop: "-5px" }} onClick={props.closeModalMimsProduct}><i className="fal fa-times"></i></span>
                    <h6 style={{ fontSize: "14px" }}>Products Details</h6>
                    <hr className='top-hr' />
                </div>

                <h3>Loading ......</h3>

            </Modal>
        )

    } else {
        return (
            <Modal
                isOpen={props.modalIsOpenMimsProduct}
                onRequestClose={props.closeModalMimsProduct}
                style={customStyles}
                contentLabel="Example Modal"
                transition={{ animation: 'scale', duration: 500 }}
            >

                <div>
                    <span className='float-end' style={{ fontSize: "15px", cursor: "pointer", marginTop: "-5px" }} onClick={()=>{
                        setMimsData('')
                        props.closeModalMimsProduct()
                    }}><i className="fal fa-times"></i></span>
                    <h6 style={{ fontSize: "14px" }}>Products Details</h6>
                    <hr className='top-hr' />
                </div>


                {/* <div className="mims-data-header d-flex">
                    <img src={mims} alt="" />
                </div> */}
                <div className="row">
                    <div className="col-2">
                        <img className='img-fluid' style={{padding:"5px 0"}} src={mims} alt="" />
                        <div className="mims-product-search">
                            {/* <input type="text" onChange={(e) => {
                                const data = mimsProduct.filter(item => item.drug_name.toLowerCase().match(e.target.value.toLowerCase()));
                                
                                e.target.value.length > 0 ?
                                    setMimsProduct(data) : setUpdateProduct(Math.random())
                            }} placeholder='Search' className="form-control form-control-sm" /> */}
                            <input type="text" onChange={(e) => {
                                axios.get(`search-drug/${e.target.value}`).then(res => {
                                    setMimsProduct(res.data)
                                })
                            }} placeholder='Search' className="form-control form-control-sm" />

                        </div>
                        <div className="mims-list g-doc-scroll p-1 mt-2">
                            <ul>
                                {
                                    mimsProduct.length > 0 &&
                                    mimsProduct.map((item, i) => <li onClick={() => handleSelect(item)} key={i}>{item.macrohealth_sg}</li>)
                                }
                            </ul>
                        </div>

                    </div>
                    <div className="col-10">
                        {
                            mimsData ?
                                <table className='mimsDataTable'>
                                    <tr>

                                        {/* <td dangerouslySetInnerHTML={{ __html: props.mimsData.MONOGRAPH.GENMONO }}>
                                </td> */}
                                        <td colSpan={2}>
                                            <h6>{mimsData.name}</h6>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Trade Name</td>
                                        <td>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Contents</td>
                                        <td dangerouslySetInnerHTML={{ __html: mimsData.MONOGRAPH.GENMONO }}>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Dosage and Administration</td>
                                        <td dangerouslySetInnerHTML={{ __html: mimsData.MONOGRAPH.GDOSE }}></td>
                                    </tr>

                                    <tr>
                                        <td>Administration</td>
                                        <td dangerouslySetInnerHTML={{ __html: mimsData.MONOGRAPH.GPPPA }}></td>
                                    </tr>

                                    <tr>
                                        <td>Contraindications</td>
                                        <td dangerouslySetInnerHTML={{ __html: mimsData.MONOGRAPH.GCI }}></td>
                                    </tr>

                                    <tr>
                                        <td>Special Precautions</td>
                                        <td dangerouslySetInnerHTML={{ __html: mimsData.MONOGRAPH.GSP }}></td>
                                    </tr>

                                    <tr>
                                        <td>Adverse Drug Reactions</td>
                                        <td dangerouslySetInnerHTML={{ __html: mimsData.MONOGRAPH.GAR }}></td>
                                    </tr>

                                    <tr>
                                        <td>Drug Interactions</td>
                                        <td dangerouslySetInnerHTML={{ __html: mimsData.MONOGRAPH.GDI }}></td>
                                    </tr>

                                    <tr>
                                        <td>Mechanism of Action</td>
                                        <td dangerouslySetInnerHTML={{ __html: mimsData.MONOGRAPH.GACTION }}></td>
                                    </tr>
                                    <tr>
                                        <td>Food Interaction</td>
                                        {
                                           Object.keys(mimsData.MONOGRAPH.GFOOD).length === 0 ? <td></td> :
                                        <td dangerouslySetInnerHTML={{ __html: mimsData.MONOGRAPH.GFOOD }}></td>
                                        }
                                    </tr>
                                    <tr>
                                        <td>MIMS Class</td>
                                        <td dangerouslySetInnerHTML={{ __html: mimsData.MONOGRAPH.GCLS }}></td>
                                    </tr>

                                    <tr>
                                        <td>Pregnancy Category</td>
                                        <td dangerouslySetInnerHTML={{ __html: mimsData.MONOGRAPH.GPCAT }}></td>
                                    </tr>

                                </table>
                                :
                                <table className='mimsDataTable'>
                                    <tr>

                                        {/* <td dangerouslySetInnerHTML={{ __html: props.mimsData.MONOGRAPH.GENMONO }}>
                                </td> */}
                                        <td colSpan={2}>
                                            <h6>{props.mimsData.name}</h6>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Trade Name</td>
                                        <td>
                                            {props.medicine !== null ? props.medicine.macrohealth_sg : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Contents</td>
                                        <td dangerouslySetInnerHTML={{ __html: initialData.MONOGRAPH.GENMONO }}>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Dosage and Administration</td>
                                        <td dangerouslySetInnerHTML={{ __html: initialData.MONOGRAPH.GDOSE }}></td>
                                    </tr>

                                    <tr>
                                        <td>Administration</td>
                                        <td dangerouslySetInnerHTML={{ __html: initialData.MONOGRAPH.GPPPA }}></td>
                                    </tr>

                                    <tr>
                                        <td>Contraindications</td>
                                        <td dangerouslySetInnerHTML={{ __html: initialData.MONOGRAPH.GCI }}></td>
                                    </tr>

                                    <tr>
                                        <td>Special Precautions</td>
                                        <td dangerouslySetInnerHTML={{ __html: initialData.MONOGRAPH.GSP }}></td>
                                    </tr>

                                    <tr>
                                        <td>Adverse Drug Reactions</td>
                                        <td dangerouslySetInnerHTML={{ __html: initialData.MONOGRAPH.GAR }}></td>
                                    </tr>

                                    <tr>
                                        <td>Drug Interactions</td>
                                        <td dangerouslySetInnerHTML={{ __html: initialData.MONOGRAPH.GDI }}></td>
                                    </tr>

                                    <tr>
                                        <td>Mechanism of Action</td>
                                        <td dangerouslySetInnerHTML={{ __html: initialData.MONOGRAPH.GACTION }}></td>
                                    </tr>
                                    <tr>
                                        <td>Food Interaction</td>
                                        {
                                          Object.keys(initialData.MONOGRAPH.GFOOD).length === 0 ? <td></td> :
                                        <td dangerouslySetInnerHTML={{ __html: initialData.MONOGRAPH.GFOOD }}></td>
                                        }
                                    </tr>
                                    <tr>
                                        <td>MIMS Class</td>
                                        <td dangerouslySetInnerHTML={{ __html: initialData.MONOGRAPH.GCLS }}></td>
                                    </tr>

                                    <tr>
                                        <td>Pregnancy Category</td>
                                        <td dangerouslySetInnerHTML={{ __html: initialData.MONOGRAPH.GPCAT }}></td>
                                    </tr>

                                </table>
                        }
                    </div>
                </div>
                {/* <table className='mimsDataTable'>
                    <tr>
                        
                        <td dangerouslySetInnerHTML={{ __html: props.mimsData.MONOGRAPH.GENMONO }}>
                        </td>
                        <td colSpan={2}>
                            <h6>{props.mimsData.name}</h6>
                        </td>
                    </tr>
                    <tr>
                        <td>Contents</td>
                        <td dangerouslySetInnerHTML={{ __html: props.mimsData.MONOGRAPH.GENMONO }}>
                        </td>
                    </tr>

                    <tr>
                        <td>Dosage and Administration</td>
                        <td dangerouslySetInnerHTML={{ __html: props.mimsData.MONOGRAPH.GDOSE }}></td>
                    </tr>

                    <tr>
                        <td>Administration</td>
                        <td dangerouslySetInnerHTML={{ __html: props.mimsData.MONOGRAPH.GPPPA }}></td>
                    </tr>

                    <tr>
                        <td>Contraindications</td>
                        <td dangerouslySetInnerHTML={{ __html: props.mimsData.MONOGRAPH.GCI }}></td>
                    </tr>

                    <tr>
                        <td>Special Precautions</td>
                        <td dangerouslySetInnerHTML={{ __html: props.mimsData.MONOGRAPH.GSP }}></td>
                    </tr>

                    <tr>
                        <td>Adverse Drug Reactions</td>
                        <td dangerouslySetInnerHTML={{ __html: props.mimsData.MONOGRAPH.GAR }}></td>
                    </tr>

                    <tr>
                        <td>Drug Interactions</td>
                        <td dangerouslySetInnerHTML={{ __html: props.mimsData.MONOGRAPH.GDI }}></td>
                    </tr>

                    <tr>
                        <td>Mechanism of Action</td>
                        <td dangerouslySetInnerHTML={{ __html: props.mimsData.MONOGRAPH.GACTION }}></td>
                    </tr>
                    <tr>
                        <td>Food Interaction</td>
                        <td dangerouslySetInnerHTML={{ __html: props.mimsData.MONOGRAPH.GFOOD }}></td>
                    </tr>
                    <tr>
                        <td>MIMS Class</td>
                        <td dangerouslySetInnerHTML={{ __html: props.mimsData.MONOGRAPH.GCLS }}></td>
                    </tr>

                    <tr>
                        <td>Pregnancy Category</td>
                        <td dangerouslySetInnerHTML={{ __html: props.mimsData.MONOGRAPH.GPCAT }}></td>
                    </tr>

                </table> */}


            </Modal>
        )

    }

}
