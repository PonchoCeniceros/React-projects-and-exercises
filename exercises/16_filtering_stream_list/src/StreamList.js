import React from 'react';

export class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <a to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </a>
          <a to={`/streams/delete/${stream.id}`} className="ui button negative">
            Delete
          </a>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams
      .filter(stream => this.props.currentUserId === stream.userId)
      .map(stream => {
        return (
          <div className="item" key={stream.id}>
            {this.renderAdmin(stream)}
            <i className="lrge middle aligned icon camera" />
            <div className="content">
              <a to={`/streams/${stream.id}`} className="header">
                {stream.title}
              </a>
              <div className="description">{stream.description}</div>
            </div>
          </div>
        );
      });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{textAlign: 'right'}}>
          <a to="/streams/new" className="ui button primary">
            Create Stream
          </a>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}
