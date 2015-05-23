/** @jsx React.DOM */

var PostList = React.createClass({
  getInitialState () {
    var that = this;
    
    if (this.props.list_name) {
      window[this.props.list_name + "SetState"] = function (newstate) {
        that.setState(newstate);
      };  
    }
    if (this.props.list_name) {
      window[this.props.list_name + "GetState"] = function () {
        return that.state;
      };  
    }

    return this.props.initial_state;
  },
  toggleLike (post_id) {
    var postIndex = _.findIndex(this.state.posts, function (x) { return x.id == post_id; });
    var post = this.state.posts[postIndex];

    if (post) {
      var posts = this.state.posts;

      if (post.current_user_likes_this) {
        posts[postIndex].current_user_likes_this = false;
        posts[postIndex].number_of_likes -= 1;
        var action = "unlike";
      } else {
        posts[postIndex].current_user_likes_this = true;
        posts[postIndex].number_of_likes += 1;
        var action = "like";
      }

      var that = this;

      $.ajax("/api/posts/" + post_id + "/" + action, {
        method: "POST",
        success: function () {
          that.setState({posts: posts});
        },
        error: function () {
          $.notify({
            message: "the attempt to " + action + " that post was unsuccessful."
          },{
            type: 'danger'
          });
        }
      });
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

    var all_posts = (
      <div>
        {this.state.posts.map( function (post, n) {
          return <Post 
                    post={post}
                    key={post.id}
                    toggleLike={that.toggleLike}
                    deletePost={that.deletePost}
                    display_author={props.display_author}/>;
        })}
      </div>
    );

    return this.state.posts.length > 0 ? all_posts : (
      <div><p>{this.props.empty_message || "Nothing to show here"}</p></div>)
  }
});
