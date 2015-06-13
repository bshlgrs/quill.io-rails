
const CommentsSection = React.createClass({
  render () {
    var post = this.props.post;

    return (<div className="comments-section" ref="comments-section">
        {post.reblogs.length != 0 ? (
          <div>
            <h4>notes</h4>
            {post.reblogs.map( function (reblog, n) {
              return <NestedReblogPost 
                post={reblog}
                key={reblog.id}/>;
            })}
          </div>) : <p>no notes</p>}
      </div>);
  }
});

