/** @jsx React.DOM */

var PostButtons = React.createClass({
  handleLikeClick () {
    this.props.toggleLike(this.props.post_id);
  },
  handleDeleteClick () {
    this.props.deletePost(this.props.post_id);
  },
  render () {
    var props = this.props;

    var color = props.current_user_likes_this ? "red" : "white";

    var like_button =
      <a className="btn btn-sm">
        <span
          className="glyphicon glyphicon-heart"
          aria-hidden="true"
          style={{"color": color}}
          onClick={this.handleLikeClick}>
        </span>
      </a>;

    var reblog_button = 
      <a href={"/?reblog=" + props.post_id}>
        <span
          className="glyphicon glyphicon-retweet"
          aria-hidden="true">
        </span>
      </a>

    return (
      <span className="pull-right">
        { props.user_id != current_user.id && like_button }
        { props.is_rebloggable && reblog_button }
        { props.user_id == current_user.id && 
          <a 
            href="#" 
            className="btn btn-sm"
            onClick={this.handleDeleteClick}>
            <span
              className="glyphicon glyphicon-trash"
              aria-hidden="true">
            </span>
          </a> }
      </span>
    )
  }
});
