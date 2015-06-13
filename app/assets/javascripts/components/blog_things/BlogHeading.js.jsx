const BlogHeading = React.createClass({
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
  numberOfFollowers () {
    return this.props.user.number_of_followers + this.state.current_user_is_following - this.props.user.current_user_is_following;
  },
  render () {
    var props = this.props;

    var follow_button = (<button className="btn btn-sm btn-default" onClick={this.toggleFollow}>
      { this.state.current_user_is_following ? "unfollow" : "follow"}
    </button>);

    return (
      <div className="blog-heading row">
        <div className="big-profile-pic col-sm-4">
          <img height="200" width="200" src={props.profile_pic_url}/>
        </div>

        <div className="col-sm-8">
          <h1>
            <a href={"/blogs/"+props.user.username}>
              {props.user.username + "'s blog"}
            </a>
          </h1>

          <p className="lead">{ props.user.description }</p>

          <p>{ this.numberOfFollowers() } followers</p>

          { current_user && current_user.id != props.user.id && follow_button }
        </div>
      </div>);
  }
});