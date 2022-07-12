import * as Rbt from "react-bootstrap";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPosts, loadPostById } from "../states/posts/posts.middlewares";
import { showModal, hideModal } from "../states/modal/modal.middlewares";
import ModalPage from "./modal.page";


const HomePage = () => {
	// hooks
	const dispatch = useDispatch();
	// states and props
	const [postIndex, setPostIndex] = useState("");
	const { status } = useSelector((state) => state.modal);
	const { isLoading, posts, errorMessage } = useSelector(
		(state) => state.posts
	);
	// efects
	useEffect(() => {
		dispatch(loadAllPosts());
	}, [dispatch]);


	return (
		<Rbt.Container>
			<Rbt.Row style={{ marginBottom: '10px', marginTop: '10px' }}>
				<h1>Posts</h1>
			</Rbt.Row>

			<Rbt.Row>
				<Rbt.Col style={{ textAlign: 'center' }}>
					<Rbt.Button
						style={{ margin: '10px' }}
						variant="primary"
						onClick={(el) => {
							setPostIndex(el.target.value);
							dispatch(loadAllPosts());
						}}
					>
						show all
					</Rbt.Button>
				</Rbt.Col>

				<Rbt.Col style={{ textAlign: 'center' }}>
					<Rbt.Button
						style={{ margin: '10px' }}
						variant="primary"
						onClick={() => dispatch(showModal())}
					>
						compose post
					</Rbt.Button>
				</Rbt.Col>

				<Rbt.Col style={{ textAlign: 'center' }}>
					<Rbt.Form.Control
						style={{ margin: '10px' }}
						type="text"
						value={postIndex}
						onChange={(el) => {
							setPostIndex(el.target.value);
						}}
					/>
				</Rbt.Col>

				<Rbt.Col>
					<Rbt.Button
						style={{ margin: '10px' }}
						variant="primary"
						onClick={(el) => {
							setPostIndex(el.target.value);
							dispatch(loadPostById(postIndex));
						}}
					>
						select
					</Rbt.Button>
				</Rbt.Col>
			</Rbt.Row>

			<Rbt.Row>
				<Rbt.Col style={{ marginTop: '35px', marginBottom: '25px' }}>
					{isLoading &&
						<h3 style={{ textAlign: 'center' }}>Loading...</h3>
					}
					{errorMessage &&
						<h3 style={{ textAlign: 'center' }}>{errorMessage}</h3>
					}
					{posts &&
						posts.map((post) => (
							<div key={post.id} style={{ marginBottom: '10px', marginTop: '10px' }}>
								<Rbt.Card>
									<Rbt.Card.Body>
										<Rbt.Card.Title>{post.id}: {post.title}</Rbt.Card.Title>
										<Rbt.Card.Text>{post.body}</Rbt.Card.Text>
									</Rbt.Card.Body>
								</Rbt.Card>
							</div>
						))}
				</Rbt.Col>
			</Rbt.Row>

			<Rbt.Modal show={status} onHide={() => dispatch(hideModal())}>
				<ModalPage />
			</Rbt.Modal>
		</Rbt.Container>
	);
};

export default HomePage;
