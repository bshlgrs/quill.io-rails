var PostModifyPopoverButtons = React.createClass({
  render () {
    var props = this.props;

    var popover = (
      <ReactBootstrap.Popover>
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
      </ReactBootstrap.Popover>);

    return (
      <ReactBootstrap.OverlayTrigger
        trigger='click'
        placement='top'
        overlay={popover}>
        <span
          className="glyphicon glyphicon-cog icon-button"
          aria-hidden="true">
        </span>
      </ReactBootstrap.OverlayTrigger>);
  }
});
  