/** @jsx React.DOM */

var PostList = React.createClass({
  getInitialState () {
    return this.props.initial_state;
  },
  toggleLike (post_id) {
    var postIndex = _.findIndex(this.state.posts, function (x) { return x.id == post_id; });
    var post = this.state.posts[postIndex];

    if (post) {
      var newPosts = this.state.posts;

      if (post.current_user_likes_this) {
        newPosts[postIndex].current_user_likes_this = false;
        newPosts[postIndex].number_of_likes -= 1;
        var action = "unlike";
      } else {
        newPosts[postIndex].current_user_likes_this = true;
        newPosts[postIndex].number_of_likes += 1;
        var action = "like";
      }

      this.setState({posts: newPosts});

      $.ajax("/api/post/" + post_id + "/" + action, { method: "POST" });
    }
  },
  render () {
    var that = this;
    var props = this.props;
    var state = this.state;

    var all_posts = (
      <div>
        {this.state.posts.map( function (post, n) {
          return <Post 
            post={post}
            key={post.id}
            current_user={props.current_user}
            toggleLike={that.toggleLike}
            display_author={props.display_author}/>;
        })}
      </div>
    );

    return this.state.posts.length > 0 ? all_posts : <div><p>Nothing to show here</p></div>
  }
});
