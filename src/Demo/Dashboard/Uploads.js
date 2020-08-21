
import React, { Component, useState } from 'react';
import {
    Row, Col, Table, Tabs, Tab, Form,
    Button, Alert,
    FormControl
} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import Axios from 'axios';
import Message from './Alerty';
import Progress from './Progress';import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
class Uploads extends Component {
    constructor() {
        super();
        this.state = {
            file: "",
            filename: "Choose file",
            uploadedfilepath: '',
            uploadedfilename: '',
            type: "",
            caption: "",
            uploadPercentage: 0,
            successer: null,
            errstr: null,
            uploadedfile: {}
        };
    };
    handlefileclick = e => {
        this.setState({ errstr: null });
        this.setState({ uploadedfilename: null });
        this.setState({ uploadedfilepath: null });
        this.setState({ successer: null });
        console.log("files", e.target.files[0].name);

        this.setState({ file: e.target.files[0] }, () => {
            console.log("just logging", this.state.file);

        });
        this.setState({ filename: e.target.files[0].name });
    }
    onSubmit = async e => {
        e.preventDefault();
        console.log("User state", this.props.auth);
        const formData = new FormData();
        formData.append('file', this.state.file)
        formData.append('imagecaption', this.state.caption)
        formData.append('imageowner', this.props.auth.user.id)
        if(this.state.caption == ""){
            this.setState({ errstr: "Please enter a caption for image" });
        }else{
            console.log("HELLLOOOOO ");
            
        if (this.state.file != "") {
            try {
                const res = await Axios.post('https://mighty-ridge-28744.herokuapp.com/api/users/fileupload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: progressEvent => {
                        this.setState({
                            uploadPercentage:
                                parseInt(
                                    Math.round((progressEvent.loaded * 100) / progressEvent.total)
                                )
                        }
                        );

                        // Clear percentage
                        setTimeout(() => this.setState({ uploadPercentage: 0 }), 2000);
                    }
                });
                this.setState({ uploadedfilename: res.data.filename });
                this.setState({ uploadedfilepath: res.data.filepath });
                this.setState({ type: res.data.type });
                this.setState({ successer: "File uploaded successfully !" });
                this.setState({ caption:"" });
                /* this.setState({ type: res.data.filepath }); */

            } catch (error) {
                if (error.response.status === 500) {
                    console.log("there was a server error !");
                    this.setState({ errstr: "Check selected file, A server error occured ! Please try again" });

                } else {
                    console.log(error.response.data.msg);
                    this.setState({ errstr: error.response.data.msg });
                }
            }
        } else {
            this.setState({ errstr: "No file selected" } , ()=>{console.log("state changed ",this.state.errstr);
            });
        }
    }
    }  
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    render() {


        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title='Upload Video / Photos' isOption>
                            <Col md={12}>
                                {this.state.successer ? <Message msg={this.state.successer} varient={'success'} /> : null}
                                {this.state.errstr ? <Message msg={this.state.errstr} varient={'danger'} /> : null}
                                <form noValidate onSubmit={this.onSubmit}>
                                    <Row>
                                        {this.state.type == 'image' && <Col key={12344} md={4}>
                                            <img src={this.state.uploadedfilepath} style={{ width: "100%" }}></img>
                                        </Col>}
                                        {this.state.type == 'video' && <Col key={12344} md={4}>
                                            <video style={{ width: "100%" }} controls>
                                                <source src={this.state.uploadedfilepath} type="video/mp4"></source>
                                            </video>

                                        </Col>}
                                        {this.state.file ? <Col md={12}>
                                            <Progress percentage={this.state.uploadPercentage} />
                                        </Col> : null}
                                        <Col md={4}>
                                            <Form.Group >

                                                <Form.Label className="text-danger"></Form.Label>
                                                <input
                                                    onChange={this.onChange}
                                                    value={this.state.caption}
                                                    id="caption"
                                                    type="text"
                                                    className="form-control" placeholder="Caption ..." />
                                                <input
                                                    onChange={this.handlefileclick}
                                                    id="branchcontact"
                                                    type="file"
                                                    className="form-control" placeholder="Contact No." />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group >

                                                <Form.Label className="text-danger"></Form.Label>

                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Col>

                                    </Row>
                                </form>
                            </Col>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    coach2: state.coach2,
    branch: state.branch,
});
export default connect(
    mapStateToProps,
    { }
)(withRouter(Uploads));