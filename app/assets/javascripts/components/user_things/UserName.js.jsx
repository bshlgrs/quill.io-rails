
var UserName = React.createClass({
  render () {
    var props = this.props;

    return (
      <span>
        <UserNameLink username={props.user.username} />
      </span>
    )
  }
});
