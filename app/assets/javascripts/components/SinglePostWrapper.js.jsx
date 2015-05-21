var SinglePostWrapper = React.createClass({
  getInitialState () {
    return { post: this.props.post };
  },
  toggleLike (post_id) {
    if (post_id == this.state.post.id) {
      var newPost = this.state.post;

      if (newPost.current_user_likes_this) {
        newPost.current_user_likes_this = false;
        newPost.number_of_likes -= 1;
        var action = "unlike";
      } else {
        newPost.current_user_likes_this = true;
        newPost.number_of_likes += 1;
        var action = "like";
      }

      this.setState({post: newPost});

      $.ajax("/api/posts/" + post_id + "/" + action, { method: "POST" });
    }
  },
  deletePost (post_id) {
    $.ajax("/api/posts/" + post_id, { method: "DELETE" });
    this.setState({posts: _.reject(this.state.posts, function (x) { return x.id == post_id; })});
  },
  render () {
    var that = this;
    var props = this.props;
    var state = this.state;
    var post = this.state.post;

    return <Post 
            post={post}
            key={post.id}
            toggleLike={that.toggleLike}
            deletePost={that.deletePost}
            display_author={props.display_author}/>;
  }
});
