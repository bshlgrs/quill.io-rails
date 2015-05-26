var Post = React.createClass({
  getInitialState () {
    return { showingForm: false, showingComments: false };
  },
  flip () {
    this.setState({showingForm: ! this.state.showingForm});
  },
  parent_id () {
    var post = this.props.post;

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
    var post = props.post;
    var that = this;

    var private_tag = props.post.is_private && <span className="label label-default">Private</span>;

    var body;

    if (post.post_type == "text_post") {
      body = <div dangerouslySetInnerHTML={{__html: customRenderMarkdown(post.body)}} />;
    } else if (post.post_type == "reblog") {
      body = <div>
        <div className="ancestor-posts-container">
          {props.post.ancestors.map( function (post, n) {
            return <AncestorPost 
              post={post}
              key={post.id}
              toggleLike={that.toggleLike}
              deletePost={that.deletePost} />;
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

    return (
      <div>
        <div className="panel panel-default post">
          { props.display_author && 
            <a href={"/blogs/"+post.user.username}>
              <ProfilePicture src={post.user.guaranteed_profile_pic_url}/>
            </a>
          }

          <div className="panel-body">
            { props.display_author && 
              <a href={"/blogs/" + post.user.username + "/posts/" + post.id}>
                <strong>{post.user.username}</strong>
              </a>}

              {date}

            <a href={"/blogs/" + post.user.username + "/posts/" + post.id}>
              { props.big_title 
                ? <h2>{post.title} {private_tag}</h2>
                : <h3>{post.title} {private_tag}</h3>
              }
            </a>

            {body}
          </div>
          <div className="panel-footer">
            <ReblogAndLikeCounters 
              post={post}
              toggleShowComments={this.toggleShowComments} 
              collapsible_reblogs={props.collapsible_reblogs} />

            { current_user &&
              <PostButtons
                post={post}
                user_id={post.user.id}
                toggleLike={props.toggleLike}
                deletePost={props.deletePost}
                is_rebloggable={post.is_rebloggable}
                updatePostStatus={props.updatePostStatus}
                reblog_toggle_buttons={this.flip}/>
            }

            { tags }
          </div>
        </div>

        <ReactCSSTransitionGroup transitionName="example">
          { this.state.showingForm &&            
            <NewReblogForm flip={this.flip} parent_id={this.parent_id()}/>
          }
        </ReactCSSTransitionGroup>

        { this.state.showingComments && <CommentsSection post={post} />}
      </div>
    );
  }
});
