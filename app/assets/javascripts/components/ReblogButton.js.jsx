var ReblogButton = React.createClass({
  render () {
    var props = this.props;

    return (
      <a onClick={props.handleClick}>
        <span
          className="glyphicon glyphicon-retweet grow"
          aria-hidden="true">
        </span>
      </a>
    );
  }
});

