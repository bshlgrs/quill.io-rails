var ReblogButton = React.createClass({
  render () {
    var props = this.props;

    return (
      <a href={"/?reblog=" + props.post.id}>
        <span
          className="glyphicon glyphicon-retweet"
          aria-hidden="true">
        </span>
      </a>
    );
  }
});

