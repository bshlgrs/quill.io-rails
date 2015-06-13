
var PostModifyButtons = React.createClass({
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

    return (
      <div>
        <span
          onClick={props.handleDeleteClick}
          className="glyphicon glyphicon-trash icon-button"
          aria-hidden="true">
        </span>
        <span>
          <label>rebloggable</label>
          <input
            type="checkbox"
            size="mini"
            checked={props.post.is_rebloggable}
            onChange={props.handleToggleIsRebloggableClick}/>
        </span>
         <span>
          <label>private</label>
          <input
            type="checkbox"
            size="mini"
            checked={props.post.is_private}
            onChange={props.handleToggleIsPrivateClick}/>
        </span>
        <span>
          <a onClick={this.props.handleToggleEditFormClick}>Edit</a>
        </span>
      </div>);
  }
});
  