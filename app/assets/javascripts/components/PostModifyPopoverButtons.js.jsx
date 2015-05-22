var PostModifyPopoverButtons = React.createClass({
  render () {
    var props = this.props;

    return <a 
      href="#" 
      className="btn btn-sm"
      onClick={props.handleDeleteClick}>
        <span
          className="glyphicon glyphicon-trash"
          aria-hidden="true">
        </span>
      </a>;
  }
});
  