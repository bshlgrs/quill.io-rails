var AncestorPost = React.createClass({
  render () {
    var props = this.props;

    return (<div className="panel panel-default ancestor-post">
      <div style={{position: "relative"}}>
        <div className="profile-picture-sm profile-picture-floater-sm profile-picture">
          <img src={current_user.guaranteed_profile_pic_url}/>
        </div>
      </div>
      <div className="panel-body">
        <UserNameLink username={props.post.user.username}/><br/>
        { props.post.title && <h4>{props.post.title}</h4> }
        <div dangerouslySetInnerHTML={{__html: customRenderMarkdown(props.post.body)}} />
      </div>
    </div>);
  }
});