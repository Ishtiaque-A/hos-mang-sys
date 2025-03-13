import React from 'react';
import AnatomySetupSidebar from '../anatomy_setup_mainsidebar/AnatomySetupSidebar';

const AnatomySetUp = () => {
    return (
        <div>
            <div className="ms-2">
                <div className="row">
                    <div className="col-md-3">
                        <AnatomySetupSidebar/>
                    </div>
                    <div className="col-md-9">
                        <img src="https://serving.photos.photobox.com/34800924c449c70f41bf931f93ed1b5dc85ab4e6780ab8aee2e19b866ad69d21ed295353.jpg"></img>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnatomySetUp;