var Post = React.createClass({
  getInitialState () {
    return { showingReblogForm: false,
             showingComments: true,
             showingEditForm: false,
             showingModifyButtons: false };
  },
  toggleReblogForm () {
    this.setState({showingReblogForm: ! this.state.showingReblogForm});
  },
  toggleEditForm () {
    this.setState({showingEditForm: ! this.state.showingEditForm});
  },
  parent_id () {
    var post = this.props.posts[this.props.post_id];

    if (post.post_type == "reblog" && post.body.trim() == "") {
      return post.parent_id;
    } else {
      return post.id;
    }
  },
  toggleShowComments () {
    this.setState({showingComments: ! this.state.showingComments});
  },
  render () {
    var props = this.props;
    var post = props.posts[props.post_id];
    var that = this;

    var user = this.props.users[post.user_id];

    var private_tag = post.is_private && <span className="label label-default">Private</span>;

    var body;

    if (post.post_type == "text_post") {
      body = <div dangerouslySetInnerHTML={{__html: customRenderMarkdown(post.body)}} />;
    } else if (post.post_type == "reblog") {
      body = <div>
        <div className="ancestor-posts-container">
          {post.ancestors.map( function (ancestorPostId, n) {
            var ancestorPost = props.posts[ancestorPostId];
            return <AncestorPost 
              post={ancestorPost}
              key={ancestorPostId}
              toggleLike={that.toggleLike}
              deletePost={that.deletePost} 
              {...props}/>;
          })}
        </div>
        <div dangerouslySetInnerHTML={{__html: customRenderMarkdown(post.body)}} />
      </div>;
    } else {
      throw "unrecognised post type: " + post.post_type;
    }


    var tags = post.tags.map(function(tag, n) {
      return <Tag tag={tag} key={tag+"/"+n}/>;
    });

    var date = <span className="pull-right"><small>{humaneDate(new Date(post.created_at))}</small></span>;

    var showBody = (
      <div className="panel-body">
        { props.display_author && 
          <a href={"/blogs/" + user.username + "/posts/" + post.id}>
            <strong>{user.username}</strong>
          </a>}

          {date}

        <a href={"/blogs/" + user.username + "/posts/" + post.id}>
          { props.big_title 
            ? <h2>{post.title} {private_tag}</h2>
            : <h3>{post.title} {private_tag}</h3>
          }
        </a>

        {body}
      </div>);

    var editBody = (
      <div className="panel-body">
        <PostForm post={post} post_type={post.post_type} resource="edit" />
      </div>);

    return (
      <div>
        <div className="panel panel-default post">
          { props.display_author && 
            <a href={"/blogs/"+user.username}>
              <ProfilePicture src={user.guaranteed_profile_pic_url}/>
            </a>
          }

          { this.state.showingEditForm ? editBody : showBody }

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

        <ReactCSSTransitionGroup transitionName="example">
          { this.state.showingReblogForm &&            
            <NewReblogForm toggleReblogForm={this.toggleReblogForm} parent_id={this.parent_id()}/>
          }
        </ReactCSSTransitionGroup>

        { this.state.showingComments && <CommentsSection post_id={post.id} posts={props.posts} users={props.users}/>}
      </div>
    );
  }
});
