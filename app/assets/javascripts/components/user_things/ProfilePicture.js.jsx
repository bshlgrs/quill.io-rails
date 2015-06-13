
var ProfilePicture = React.createClass({
  render () {
    return (
      <div style={{position: "relative"}}>
        <div className="profile-picture-lg profile-picture-floater-lg profile-picture">
          <img src={this.props.src}/>
        </div>
      </div>);
  }
});
