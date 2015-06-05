var AncestorPost = React.createClass({
  goToPost () {
    location.pathname = "/blogs/"+this.props.post.user.username+"/posts/"+this.props.post.id;
  },
  render () {
    var props = this.props;

    var date = <span className="pull-right"><small>{humaneDate(new Date(props.post.created_at))}</small></span>;

    return (
      <div className="panel panel-default ancestor-post">
        <SmallFloatingProfilePicture src={props.post.user.guaranteed_profile_pic_url}/>
        <div className="panel-body" onClick={this.goToPost}>
          {date}
          <UserNameLink username={props.post.user.username}/><br/>
          { props.post.title && <h4>{props.post.title}</h4> }
          <div dangerouslySetInnerHTML={{__html: customRenderMarkdown(props.post.body)}} />
        </div>
      </div>);
  }
});