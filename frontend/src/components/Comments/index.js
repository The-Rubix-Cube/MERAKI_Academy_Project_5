import React, { useEffect, useState } from "react";
import "./style.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBInput,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import posts, { setComments, addComment } from "../redux/reducers/posts/index";
const Comments = ({ id}) => {
  console.log(id);
  const dispatch = useDispatch();
const[comments,setcomments]=useState(null)
  const { userinfo, token, userId } = useSelector((state) => {
    return {
      userinfo: state.auth.userinfo,
      token: state.auth.token,
      userId: state.auth.userId,
    };
  });
  const getAllCommentsByPostId = (id) => {
    axios
      .get(`http://localhost:5000/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((Response) => {
        console.log(Response.data.result);
        let comments = Response.data.result;
        //this is for local use state
        setcomments(comments)
        //this is for redux 
        dispatch(setComments({ id, comments }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllCommentsByPostId(id);
  }, []);

 

  return (
   

      <section className="gradient-custom vh-100">
        <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
          <MDBRow className="justify-content-center">
            <MDBCol md="12" lg="10" xl="8">
              <MDBCard>
                <MDBCardBody className="p-4">
                  <MDBRow>
                    <MDBCol>
                      <div className="d-flex flex-start" style={{border:"solid red",marginTop:"-40px"}}>
                        <MDBCardImage
                          className="rounded-circle shadow-1-strong me-3"
                          src={
                            userinfo.avatar
                              ? userinfo.avatar
                              : "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
                          }
                          alt=""
                         
                          width="65"
                          height="65"
                        />

                        <div className="flex-grow-1 flex-shrink-1">
                          <div>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-1">
                                {userinfo.firstname} {userinfo.lastname}
                              </p>
                            </div>
                            <MDBInput
                              style={{ height: "80px" }}
                              wrapperClass="mb-4"
                              placeholder="write a comment..."
                              id="form1"
                              type="text"
                            />
                            <div className="commentbtn">
                              <div style={{ margin: "3px" }}>
                                <button
                                  onClick={(e) => {
                                    //handleShow();
                                    //console.log(show);
                                  }}
                                  style={{
                                    border: "none",
                                    backgroundColor: "white",
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="19"
                                    color="gray"
                                    fill="currentColor"
                                    class="bi bi-file-image"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z" />
                                  </svg>
                                </button>

                                <a href="#!">
                                  <MDBIcon fas icon="reply fa-xs" />
                                  <span> 😃</span>
                                </a>
                              </div>
                              <a href="#!">
                                <MDBIcon fas icon="reply fa-xs" />
                                <span style={{ width: "50", height: "40" }}>
                                  {" "}
                                  reply
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {comments?.length > 0 &&
                        comments.map((element) => {
                          {
                            console.log(element);
                          }
                          return (
                            <div className="d-flex flex-start mt-4">
                              <MDBCardImage
                                className="rounded-circle shadow-1-strong me-3"
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(12).webp"
                                alt="avatar"
                                width="65"
                                height="65"
                              />

                              <div className="flex-grow-1 flex-shrink-1">
                                <div>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                      Natalie Smith{" "}
                                      <span className="small">
                                        - 2 hours ago
                                      </span>
                                    </p>
                                    <a href="#!">
                                      <MDBIcon fas icon="reply fa-xs" />
                                      <span className="small"> reply</span>
                                    </a>
                                  </div>
                                  <p className="small mb-0">
                                    The standard chunk of Lorem Ipsum used since
                                    the 1500s is reproduced below for those
                                    interested. Sections 1.10.32 and 1.10.33.
                                  </p>
                                </div>

                                {/* <div className="d-flex flex-start mt-4">
                          <a className="me-3" href="#">
                            <MDBCardImage
                              className="rounded-circle shadow-1-strong me-3"
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp"
                              alt="avatar"
                              width="65"
                              height="65"
                            />
                          </a>

                          <div className="flex-grow-1 flex-shrink-1">
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-1">
                                  Lisa Cudrow{" "}
                                  <span className="small">- 4 hours ago</span>
                                </p>
                              </div>
                              <p className="small mb-0">
                                Cras sit amet nibh libero, in gravida nulla.
                                Nulla vel metus scelerisque ante sollicitudin
                                commodo. Cras purus odio, vestibulum in
                                vulputate at, tempus viverra turpis.
                              </p>
                            </div>
                          </div>
                        </div> */}

                                {/* <div className="d-flex flex-start mt-4">
                          <a className="me-3" href="#">
                            <MDBCardImage
                              className="rounded-circle shadow-1-strong me-3"
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                              alt="avatar"
                              width="65"
                              height="65"
                            />
                          </a>

                          <div className="flex-grow-1 flex-shrink-1">
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-1">
                                  John Smith{" "}
                                  <span className="small">- 6 hours ago</span>
                                </p>
                              </div>
                              <p className="small mb-0">
                                Autem, totam debitis suscipit saepe sapiente
                                magnam officiis quaerat necessitatibus odio
                                assumenda, perferendis quae iusto labore
                                laboriosam minima numquam impedit quam dolorem!
                              </p>
                            </div>
                          </div> 
                        </div>*/}
                              </div>
                            </div>
                          );
                        })}
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    
  );
};

export default Comments;
