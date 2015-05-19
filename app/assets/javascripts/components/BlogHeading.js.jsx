var BlogHeading = React.createClass({
  render () {
    var props = this.props;

    return (
      <div className="blog-heading">
        <div className="big-profile-pic">
          <img height="200" width="200" src={props.profile_pic_url}/>
        </div>

        <h1>
          <a href={"/blogs/"+props.user.username}>
            {props.user.username + "'s blog"}
          </a>
        </h1>

        <p className="lead">{ props.user.description }</p>
      </div>);
  }
});