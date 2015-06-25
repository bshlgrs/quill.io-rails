
var AncestorPost = React.createClass({
  goToPost () {
    var props = this.props;
    var user = props.users[props.post.user_id];
    location.pathname = "/blogs/"+user.username+"/posts/"+props.post.id;
  },
  render () {
    var props = this.props;
    var user = props.users[props.post.user_id];
    var date = <span className="pull-right"><small>{humaneDate(new Date(props.post.created_at))}</small></span>;

    return (
      <div className="panel panel-default ancestor-post">
        <SmallFloatingProfilePicture src={user.guaranteed_profile_pic_url}/>
        <div className="panel-body" onClick={this.goToPost}>
          {date}
          <UserNameLink username={user.username}/><br/>
          { props.post.title && <h4>{props.post.title}</h4> }
          <div dangerouslySetInnerHTML={{__html: customRenderMarkdown(props.post.body)}} />
        </div>
      </div>);
  }
});