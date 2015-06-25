
var PostButtons = React.createClass({
  handleLikeClick () {
    this.props.toggleLike(this.props.post.id);
  },
  handleDeleteClick () {
    this.props.deletePost(this.props.post.id);
  },
  handleToggleIsPrivateClick () {
    var post = this.props.post;

    this.props.updatePostStatus(post.id, "is_private", !post.is_private)
  },
  handleToggleIsRebloggableClick () {
    var post = this.props.post;

    this.props.updatePostStatus(post.id, "is_rebloggable", !post.is_rebloggable)
  },
  render () {
    var props = this.props;

    var color = props.post.current_user_likes_this ? "red" : "white";

    var like_button =
        <span
          className="glyphicon glyphicon-heart grow icon-button"
          aria-hidden="true"
          style={{"color": color}}
          onClick={this.handleLikeClick}>
        </span>;

    var reblog_button = <ReblogButton post={props.post} handleClick={props.toggleReblogForm}/>;

    var post = props.post;

    return (
      <span className="pull-right">
        { props.user.id != current_user.id && like_button }
        { props.is_rebloggable && reblog_button }
        { props.user.id == current_user.id && 
          <span
            className="glyphicon glyphicon-cog icon-button"
            aria-hidden="true">
          </span> }
        { <a href={"/blogs/"+props.user.username+"/posts/"+post.id}>
            <span className="glyphicon glyphicon-link grow icon-button" />
          </a> }
      </span>
    )
  }
});
