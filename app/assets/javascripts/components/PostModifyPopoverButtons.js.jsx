var PostModifyPopoverButtons = React.createClass({
  render () {
    var props = this.props;

    var popover = (
      <ReactBootstrap.Popover>
        <a 
        href="#" 
        className="btn btn-sm"
        onClick={props.handleDeleteClick}>
          <span
            className="glyphicon glyphicon-trash"
            aria-hidden="true">
          </span>
        </a>
      </ReactBootstrap.Popover>);

    return (
      <ReactBootstrap.OverlayTrigger
        trigger='click'
        placement='top'
        overlay={popover}>
        <a href="#" className="btn btn-sm">
          <span
            className="glyphicon glyphicon-cog"
            aria-hidden="true">
          </span>
        </a>
      </ReactBootstrap.OverlayTrigger>);
  }
});
  