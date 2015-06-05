const ReblogBodyForm = React.createClass({
  getInitialState () {
    return this.props.post || {
      body: ""
    };
  },
  handleBodyChange (e) {
    this.setState({body: e.target.value});
  },
  render () {
    var props = this.props;
    var that = this;
    return (
      <div>
        <div className="ancestor-posts-container">
          {props.post.ancestors.map( function (post, n) {
            return <AncestorPost 
              post={post}
              key={post.id}
              toggleLike={that.toggleLike}
              deletePost={that.deletePost} />;
          })}
        </div>
        <div className="nested-reblog-post">
          <textarea
            className="form-control"
            rows="3"
            name="post[body]"
            value={this.state.body}
            onChange={this.handleBodyChange}/>
        </div>
      </div>
    );
  }
});
