var AncestorPost = React.createClass({
  render () {
    var props = this.props;

    return (<div className="panel panel-default">
      <div className="panel-body">
        <UserNameLink username={props.post.user.username}/><br/>
        {props.post.body}
      </div>
    </div>);
  }
});