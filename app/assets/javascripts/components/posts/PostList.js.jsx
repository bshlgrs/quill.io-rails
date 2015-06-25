
const PostList = React.createClass({
  render () {
    var that = this;
    var props = this.props;
    var state = this.state;
    var all_posts = (
      <div className="post-list">
        {this.props.post_list.map( function (post_id, n) {
          return <Post 
                    users={props.users}
                    posts={props.posts}
                    post_id={post_id}
                    key={post_id}
                    toggleLike={that.toggleLike}
                    updatePostStatus={that.updatePostStatus}
                    deletePost={that.deletePost}
                    collapsible_reblogs={props.collapsible_reblogs}
                    display_author={props.display_author}/>;
        })}
      </div>
    );

    return this.props.post_list.length > 0 ? all_posts : (
      <div><p>{this.props.empty_message || "Nothing to show here"}</p></div>);
  }
});
