var UserThing = React.createClass({
  getInitialState () {
    return { current_user_is_following: this.props.user.current_user_is_following }
  },
  toggleFollow () {
    current_user_is_following = this.state.current_user_is_following;
    var action = current_user_is_following ? "unfollow" : "follow";

    var that = this;

    $.ajax("/api/users/" + this.props.user.id + "/" + action, {
      method: "POST",
      success: function () {
        that.setState({current_user_is_following: !current_user_is_following});
      },
      error: function () {
        $.notify({
          message: "the attempt to " + action + " " + that.props.user.username + " was unsuccessful."
        },{
          type: 'danger'
        });
      }
    })
  },
  render () {
    var props = this.props;

    var follow_button = (<button className="btn btn-md btn-default" onClick={this.toggleFollow}>
      { this.state.current_user_is_following ? "unfollow" : "follow"}
    </button>);

    return (
      <div className="user-thing panel panel-primary">
        <div className="panel-body">
          <div className="user-thing-profile-pic">
            <a href={"/blogs/"+props.user.username}>
              <img src={props.profile_pic_url}/>
            </a>
          </div>
          <div className="user-thing-info">
            <strong>
              <a href={"/blogs/"+props.user.username}>
                {props.user.username}
              </a>
            </strong>

            <p>{ props.user.description }</p>

            { current_user && current_user.id != props.user.id && follow_button }
          </div>
        </div>
      </div>);
  }
});