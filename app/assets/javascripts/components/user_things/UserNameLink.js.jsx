
var UserNameLink = React.createClass({
  render () {
    return (
      <strong>
        <a href={"/blogs/" + this.props.username }>
          { this.props.username }
        </a>
      </strong>
    );
  }
});