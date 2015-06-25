
var NestedReblogPost = React.createClass({
  getInitialState () {
    return { showingForm: false }
  },
  flip () {
    this.setState({showingForm: ! this.state.showingForm});
  },
  goToPost () {
    var post = this.props.posts[this.props.post_id];
    var username = this.props.users[post.user_id].username;
    location.pathname = "/blogs/"+username+"/posts/"+this.props.post_id;
  },
  render () {
    var props = this.props;
    var post = props.posts[props.post_id];
    var user = this.props.users[post.user_id];
    var that = this;

    var body = <div dangerouslySetInnerHTML={{__html: customRenderMarkdown(post.body)}} />;

    var date = <span className="pull-right"><small>{humaneDate(new Date(post.created_at))}</small></span>;

    var tags = post.tags.map(function(tag, n) {
      return <Tag tag={tag} key={tag+"/"+n}/>;
    });

    var nonEmptyVersion = (
      <div>
        <div className="nested-reblog-post">
          <div onClick={this.goToPost}>
            <a href={"/blogs/" + user.username + "/posts/" + post.id}>
              <strong>{user.username}</strong>
            </a>

            {date}
        
            {body}
          </div>
          <div className="panel-footer">
            <div>
              <ReblogAndLikeCounters 
                post={post}
                toggleShowComments={this.toggleShowComments} 
                collapsible_reblogs={props.collapsible_reblogs} />

              { current_user &&
                <PostButtons
                  post={post}
                  user={user}
                  toggleLike={props.toggleLike}
                  deletePost={props.deletePost}
                  is_rebloggable={post.is_rebloggable}
                  updatePostStatus={props.updatePostStatus}
                  toggleReblogForm={this.toggleReblogForm}
                  handleToggleEditFormClick={this.toggleEditForm}/>
              }
            </div>

            { current_user.id == post.user_id && 
              <PostModifyButtons
                post={post} 
                deletePost={undefined}
                handleToggleEditFormClick={this.toggleEditForm} 
                handleToggleIsPrivateClick={this.toggle}/>
              }
            { tags }
          </div>
        </div>

        <div className="nested-reblogs">
          {post.reblogs.map( function (reblog_id, n) {
              if (props.posts[reblog_id].body.trim().length) {
                return <NestedReblogPost 
                post_id={reblog_id}
                key={reblog_id}
                posts={props.posts}
                users={props.users} />;
              }
            })}
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
        <a href={"/blogs/" + user.username + "/posts/" + post.id}>
          <strong>{user.username}</strong> reblogged this
        </a>
      </div>
      );

    return post.body.trim().length ? nonEmptyVersion : emptyVersion;
  }
});
