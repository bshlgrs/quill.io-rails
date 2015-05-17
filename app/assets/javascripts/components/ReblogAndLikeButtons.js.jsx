/** @jsx React.DOM */

var ReblogAndLikeButtons = React.createClass({
  handleClick () {
    this.props.toggleLike(this.props.post_id);
  },
  render () {
    var props = this.props;

    var color = props.current_user_likes_this ? "red" : "white";

    var reblog_button = 
      <a href={"/?reblog=" + props.post_id}>
        <span
          className="glyphicon glyphicon-retweet"
          aria-hidden="true">
        </span>
      </a>

    return (
      <span className="pull-right">
        <a className="btn btn-sm">
          <span
            className="glyphicon glyphicon-heart"
            aria-hidden="true"
            style={{"color": color}}
            onClick={this.handleClick}>
          </span>
        </a>
        { props.is_rebloggable && reblog_button }
      </span>
    )
  }
});
