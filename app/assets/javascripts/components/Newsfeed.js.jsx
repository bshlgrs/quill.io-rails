/** @jsx React.DOM */

var Newsfeed = React.createClass({
  getInitialState () {
    return initial_state;
  },
  toggleLike (post_id) {
    var postIndex = _.findIndex(this.state.posts, function (x) { return x.id == post_id; });
    var post = this.state.posts[postIndex];
    debugger;

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
    return (
      <div>
        {this.state.posts.map( function (post, n) {
          return <Post 
            title={post.title}
            body={post.body}
            key={post.id}
            post_id={post.id}
            created_at={post.created_at}
            number_of_likes={post.number_of_likes}
            user={post.user}
            post_type={post.post_type}
            is_private={post.is_private}
            is_rebloggable={post.is_rebloggable}
            big_title={false}
            collapsible_reblogs={true}
            reblogs={post.reblogs}
            current_user_likes_this={post.current_user_likes_this}
            current_user={state.current_user}
            toggleLike={that.toggleLike}
            display_author={true}/>;
        })}
      </div>
    );
  }
});
