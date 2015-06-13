
var SmallFloatingProfilePicture = React.createClass({
  render () {
    return (
      <div style={{position: "relative"}}>
        <div className="profile-picture-sm profile-picture-floater-sm profile-picture">
          <img src={this.props.src}/>
        </div>
      </div>);
  }
});
