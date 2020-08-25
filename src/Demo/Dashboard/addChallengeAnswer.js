import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./input.css";

const AddChallengeAnswer = (props) => {
  return props.answers.map((val, idx) => {
    let image = `image-${idx}`,
      filename =  val.image,
      description = `tag-${idx}`,
      placeholder = val.placeholder;
    return (
      <div key={val.index} className='cont'>
                      <Row className='textarea '>
                      <Col md = {4}>
                          <Row>
                            <Col >
                            <Form.Group>
                            <Form.Label>Imagen {idx + 1}
                            </Form.Label>
                            <label
                              htmlFor={image}
                              className='custom-file-upload'
                            >
                              <i className='material-icons '>attach_file</i>
                            </label>
                            <input id={image} name='image'
                              data-id={idx}
                              onChange={props.HandleChange} type='file' />
                          </Form.Group>
                            </Col>
                            <Col >
                            <div style = {{height : 50, width: 50, borderRadius: 5, marginTop: 28, boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"}}>
                                <div style = {{overflow: "hidden" , height : 50, width: 50}} className='image-container w-auto'>
                                  <img src={filename} alt='' style = {{height : 50, width: 50}} />
                                </div>
                            </div>
                            </Col>
                          </Row>
                     </Col>
                      <Col md = {6}>
                          <Form.Group>
                            <Form.Label>Descripcion de la repuesta*</Form.Label>
                            <Form.Control
                              id={description}
                              name= "description"
                              placeholder = {placeholder}
                              data-id={idx}
                              onChange={props.HandleChange}
                              as = "textarea"
                              rows='3'
                              cols='20'
                           />
                          </Form.Group>
                        </Col>
                        <Col md = {2}>
                        <div style = {{marginTop: 28}} className='form small'>
          {idx === 0 ? (
            <button
          style = {{width: 30, height: 30, overflow: "hidden" , borderRadius: 50, display: "flex", justifyContent: "center", outline : "none"}}
              onClick={() => props.add()}
              type='button'
              className='btn-primary'
            >
              <i className='fa fa-plus-circle' aria-hidden='true' style = {{margin: "auto 0", outline : "none"}}></i>
            </button>
          ) : (
            <button
              className='btn-danger'
              onClick={() => props.delete(val)}
              type='button'
              style = {{width: 30, height: 30, overflow: "hidden", borderRadius: 50, display: "flex", justifyContent: "center", outline : "none"}}
            >
              <i className='fa fa-minus-circle ' aria-hidden='true' style = {{margin: "auto 0", outline : "none"}}></i>
            </button>
          )}
        </div></Col>
                      </Row>
        
      </div>
    );
  });
};
export default AddChallengeAnswer;

