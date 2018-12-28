import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import { CircularProgress } from '@material-ui/core';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid';

class FileUpload extends Component {

    constructor() {
        super();
        this.state = {
            uploadedFiles: [],
            uploading: false
        }
    }

    onDrop = (files) => {
        this.setState({
            uploading: true
        });

        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }

        formData.append("file", files[0]);

        axios.post('/api/users/uploadimage', formData, config)
            .then((response) => {

                this.setState({
                    uploading: false,
                    uploadedFiles:[
                        ...this.state.uploadedFiles,
                        response.data
                    ]
                },() => {
                    this.props.imagesHandler(this.state.uploadedFiles)
                })
            });
    }

    onRemove = (_id) => {
        axios.get(`/api/users/removeimage?public_id=${_id}`)
        .then(response => {
            let images = this.state.uploadedFiles.filter(item => {
                return item.public_id !== _id;
            })
            this.setState({
                uploadedFiles: images
            }, () => {
                this.props.imagesHandler(images)
            })
        })
    }

    showUploadedImages = () => (
        this.state.uploadedFiles.map((item,i) => (
            <div key={i}
                    className="dropzone_box"
                    onClick={() => this.onRemove(item.public_id)}
                >
                    <div className="wrap"
                        style={{background: `url(${item.url}) no-repeat`}}
                    >

                    </div>
            </div>
        ))
    )

    static getDerivedStateFromProps(props, state){
        if(props.reset){
            return state = {
                uploadedFiles: []
            }
        }
        return null;
    }


    render() {
        return (
            <div>
                <section>
                    <div className="dropzone clear">
                        <Dropzone
                            onDrop={(e) => this.onDrop(e)}
                            multiple={false}
                            className="dropzone_box"
                        >
                            <div className="wrap">
                                <FontAwesomeIcon 
                                    icon={faPlusCircle}
                                />
                            </div>
                        </Dropzone>
                        { this.showUploadedImages() }
                        {
                            this.state.uploading ? 
                                <div className="dropzone_box" style={{
                                    textAlign: 'center',
                                    paddingTop: '60px'
                                }}>
                                    <CircularProgress 
                                        style={{color:`#00bcd4`}}
                                        thickness={7}
                                    />
                                </div>
                            :null
                        }
                    </div>
                </section>
            </div>
        )
    }
}

export default FileUpload;
