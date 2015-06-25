
const CommentsSection = React.createClass({
  render () {
    var props = this.props;
    var post = props.posts[props.post_id];
    var that = this;

    return (<div className="comments-section" ref="comments-section">
        {post.reblogs.length != 0 ? (
          <div>
            <h4>notes</h4>
            {post.reblogs.map( function (reblog_id, n) {
              return <NestedReblogPost 
                post_id={reblog_id}
                key={reblog_id}
                posts={props.posts}
                users={props.users} />;
            })}
          </div>) : <p>no notes</p>}
      </div>);
  }
});

