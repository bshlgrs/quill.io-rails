/** @jsx React.DOM */

var ReblogAndLikeButtons = React.createClass({
  handleClick () {
    this.props.toggleLike(this.props.post_id);
  },
  render () {
    var props = this.props;

    var color = props.current_user_likes_this ? "red" : "white";

    return (
      <span className="pull-right">
        <span
          className="glyphicon glyphicon-heart"
          aria-hidden="true"
          style={{"color": color}}
          onClick={this.handleClick}>
        </span>
      </span>
    )
  }
});
