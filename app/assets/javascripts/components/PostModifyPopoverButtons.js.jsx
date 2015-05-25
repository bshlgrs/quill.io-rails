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
  