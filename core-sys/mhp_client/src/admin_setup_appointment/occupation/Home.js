import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Home extends Component
{

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="text-danger">WELCOME TO MACROHELTHPLUS
                                    
                                </h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group mb-3">
                                        <level>Occupation CRUD System
                                            <Link to={'/occupation'} className="btn btn-primary btn-sm float-end">View Occupation</Link>
                                        </level>
                                    </div>
                                    <hr></hr>
                                    <div className="form-group mb-3">
                                        <level>Visite Type CRUD System
                                            <Link to={'/all-visit'} className="btn btn-primary btn-sm float-end">View All visit Type</Link>
                                        </level>
                                    </div>
                                    <hr></hr>
                                    <div className="form-group mb-3">
                                        <level>Test Type CRUD System
                                            <Link to={'/all-test'} className="btn btn-primary btn-sm float-end">View All Test Type</Link>
                                        </level>
                                    </div>
                                    <hr></hr>
                                    <div className="form-group mb-3">
                                        <level>Usual Location CRUD System
                                            <Link to={'/location'} className="btn btn-primary btn-sm float-end">View Usual Location</Link>
                                        </level>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;