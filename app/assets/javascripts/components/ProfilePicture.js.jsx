var ProfilePicture = React.createClass({
  render () {
    return (
      <div style={{position: "relative"}}>
        <div className="profile-picture profile-picture-floater">
          <img src={this.props.src}/>
        </div>
      </div>);
  }
});
