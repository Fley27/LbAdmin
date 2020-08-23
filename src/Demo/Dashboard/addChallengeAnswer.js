import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./input.css";

const AddChallengeAnswer = (props) => {
  return props.answers.map((val, idx) => {
    let image = `image-${idx}`,
      description = `tag-${idx}`,
      filename =  val.image;
    return (
      <div key={val.index} className='cont'>
                      <Row className='textarea '>
                      <Col className='w-40'>
                          <Row>
                            <Col>
                            <Form.Group>
                            <Form.Label>
                              {image
                                ? image
                                : "Imagen del reto"}
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
                            <Col>
                            <div style = {{height : 50, width: 50, borderRadius: 5, marginTop: 28, boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"}}>
                                <div style = {{overflow: "hidden" , height : 50, width: 50}} className='image-container w-auto'>
                                  <img src={filename} alt='' style = {{height : 50, width: 50}} />
                                </div>
                            </div>
                            </Col>
                          </Row>
                     </Col>
                      <Col>
                          <Form.Group>
                            <Form.Label>Descripcion*</Form.Label>
                            <Form.Control
                              id={description}
                              name='description'
                              data-id={idx}
                              onChange={props.HandleChange}
                              as = "textarea"
                              rows='3'
                              cols='20'
                           />
                          </Form.Group>
                        </Col>
                        <Col>
                        <div style = {{marginTop: 28}} className='form small'>
          {idx === 0 ? (
            <button
              onClick={() => props.add()}
              type='button'
              className='btn btn-primary text-center '
            >
              <i className='fa fa-plus-circle' aria-hidden='true'></i>
            </button>
          ) : (
            <button
              className='btn btn-danger '
              onClick={() => props.delete(val)}
              type='button'
            >
              <i className='fa fa-minus-circle ' aria-hidden='true'></i>
            </button>
          )}
        </div></Col>
                      </Row>
        
      </div>
    );
  });
};
export default AddChallengeAnswer;

