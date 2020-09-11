import React from 'react';
// import { Link } from 'react-router-dom';
import UploadTempImage from '../../assets/img/upload.svg';
import { Label, Input } from 'reactstrap';


export class UploadTemplate extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <Label for="file-upload" className="product-upload">
                        <img src={UploadTempImage} />
                        
                    </Label>
                    <div className="label-text">Choose file</div>

                    <Input type="file"  style={{display:'none'}} id="file-upload" name="file-upload" onChange={this.props.fileUpload}/>
                </div>

            </React.Fragment>
        );
    }
}

export default UploadTemplate;