/** @jsx React.DOM */

var UserNameAndProfilePic = React.createClass({
  render () {
    var props = this.props;

    return (
      <span>
        <strong>
          <a href={"/blogs/" + props.user.username }>
            { props.user.username } { props.user.id == current_user.id && <p>that is you, motherfucker</p> }
          </a>
        </strong>
        <div className="profile-picture">
           <img height="80" width="80" 
            src={props.user.guaranteed_profile_pic_url}/>
        </div>
      </span>
    )
  }
});
