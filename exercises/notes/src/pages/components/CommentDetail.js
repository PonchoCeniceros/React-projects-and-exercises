import faker from "faker";

const getTime = () => {
  return (new Date()).toLocaleTimeString()
};

const CommentDetail = props => {

  return (
    <div className="ui container comments">
      <div className="comment">
        <a href="/" className="avatar">
          <img alt="avatar" src={faker.image.image()}/>
        </a>
        <div className="content">
          <a href="/" className="author">{props.author}</a>
          <div className="metadata">
            <span className="date">Today at {getTime()}</span>
          </div>
          <div className="text">{props.content}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentDetail;

