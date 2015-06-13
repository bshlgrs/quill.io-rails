
var ReblogButton = React.createClass({
  render () {
    var props = this.props;

    return (
        <span 
          onClick={props.handleClick}
          className="glyphicon glyphicon-retweet grow icon-button"
          aria-hidden="true">
        </span>
    );
  }
});
