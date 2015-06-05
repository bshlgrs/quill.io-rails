var NestedReblogPost = React.createClass({
  getInitialState () {
    return { showingForm: false }
  },
  flip () {
    this.setState({showingForm: ! this.state.showingForm});
  },
  goToPost () {
    location.pathname = "/blogs/"+this.props.post.user.username+"/posts/"+this.props.post.id;
  },
  render () {
    var props = this.props;
    var post = props.post;
    var that = this;

    var body = <div dangerouslySetInnerHTML={{__html: customRenderMarkdown(post.body)}} />;

    var date = <span className="pull-right"><small>{humaneDate(new Date(post.created_at))}</small></span>;

    var nonEmptyVersion = (
      <div>
        <div className="nested-reblog-post">
          <div onClick={this.goToPost}>
            <a href={"/blogs/" + post.user.username + "/posts/" + post.id}>
              <strong>{post.user.username}</strong>
            </a>

            {date}
        
            {body}
          </div>
        </div>

        <ReactCSSTransitionGroup transitionName="example">
          { this.state.showingForm &&            
            <NewReblogForm flip={this.flip} parent_id={post.id}/>
          }
        </ReactCSSTransitionGroup>
      </div>
    );

    var emptyVersion = (
      <div className="nested-reblog-post">
        {date}
        <a href={"/blogs/" + post.user.username + "/posts/" + post.id}>
          <strong>{post.user.username}</strong> reblogged this
        </a>
      </div>    
      );

    return post.body.trim().length ? nonEmptyVersion : emptyVersion;
  }
});
