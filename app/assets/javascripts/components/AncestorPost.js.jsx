var AncestorPost = React.createClass({
  render () {
    var props = this.props;

    return (<div className="panel panel-default">
      <div className="panel-body">
        <UserNameLink username={props.post.user.username}/><br/>
        { props.post.title && <h4>{props.post.title}</h4> }
        <div dangerouslySetInnerHTML={{__html: customRenderMarkdown(props.post.body)}} />
      </div>
    </div>);
  }
});