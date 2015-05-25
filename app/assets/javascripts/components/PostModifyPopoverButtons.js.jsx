var PostModifyPopoverButtons = React.createClass({
  render () {
    var props = this.props;

    var popover = (
      <ReactBootstrap.Popover>
        <span
          onClick={props.handleDeleteClick}
          className="btn btn-sm glyphicon glyphicon-trash"
          aria-hidden="true">
        </span>
      </ReactBootstrap.Popover>);

    return (
      <ReactBootstrap.OverlayTrigger
        trigger='click'
        placement='top'
        overlay={popover}>
        <span
          className="glyphicon glyphicon-cog btn btn-md"
          aria-hidden="true">
        </span>
      </ReactBootstrap.OverlayTrigger>);
  }
});
  