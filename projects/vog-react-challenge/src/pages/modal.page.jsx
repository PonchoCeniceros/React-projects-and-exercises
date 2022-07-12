import * as Rbt from "react-bootstrap";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hideModal } from "../states/modal/modal.middlewares";
import { postPost } from "../states/posts/posts.middlewares";

const ModalPage = () => {
    // hooks
    const dispatch = useDispatch();
    // states and props
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    return (
        <>
            <Rbt.Modal.Header closeButton>
                <Rbt.Modal.Title>Compose post</Rbt.Modal.Title>
            </Rbt.Modal.Header>
            <Rbt.Modal.Body>
                <Rbt.Form>
                    <Rbt.Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Rbt.Form.Label>Title</Rbt.Form.Label>
                        <Rbt.Form.Control type="email" value={title} onChange={(el) => {
                            setTitle(el.target.value);
                        }} />
                    </Rbt.Form.Group>
                    <Rbt.Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Rbt.Form.Label>Body</Rbt.Form.Label>
                        <Rbt.Form.Control as="textarea" rows={3} value={body} onChange={(el) => {
                            setBody(el.target.value);
                        }} />
                    </Rbt.Form.Group>
                </Rbt.Form>
            </Rbt.Modal.Body>
            <Rbt.Modal.Footer>
                <Rbt.Button variant="secondary" onClick={() => dispatch(hideModal())}>
                    close
                </Rbt.Button>
                <Rbt.Button variant="primary" onClick={() => {
                    dispatch(postPost(title, body));
                    setTitle("");
                    setBody("");
                    dispatch(hideModal());
                }}>
                    save Changes
                </Rbt.Button>
            </Rbt.Modal.Footer>
        </>
    );
};

export default ModalPage;
