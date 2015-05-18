var UserNameAndProfilePic = React.createClass({
  render () {
    var props = this.props;

    return (
      <span>
        <UserNameLink username={props.user.username} />
        <div className="profile-picture">
           <img height="80" width="80" 
            src={props.user.guaranteed_profile_pic_url}/>
        </div>
      </span>
    )
  }
});
