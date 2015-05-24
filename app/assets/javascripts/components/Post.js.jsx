var Post = React.createClass({
  getInitialState () {
    return { showingForm: false }
  },
  flip () {
    this.setState({showingForm: ! this.state.showingForm});
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
        {props.post.ancestors.map( function (post, n) {
          return <AncestorPost 
            post={post}
            key={post.id}
            toggleLike={that.toggleLike}
            deletePost={that.deletePost} />;
        })}
        <div dangerouslySetInnerHTML={{__html: customRenderMarkdown(post.body)}} />
      </div>;
    } else {
      throw "unrecognised post type: " + post.post_type;
    }


    var tags = post.tags.map(function(tag, n) {
      return <Tag tag={tag} key={tag+"/"+n}/>;
    });

    var date = false && <div><small>{post.created_at}</small></div>;

    return (
      <div>
        <div className="panel panel-default">
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

            <a href={"/blogs/" + post.user.username + "/posts/" + post.id}>
              { props.big_title 
                ? <h2>{post.title} {private_tag}</h2>
                : <h3>{post.title} {private_tag}</h3>
              }
            </a>

            {date}

            {body}
          </div>

          <div className="panel-footer">
            <ReblogAndLikeCounters 
              collapsible_reblogs={props.collapsible_reblogs}
              post={post}/>

            { current_user &&
              <PostButtons
                post={post}
                user_id={post.user.id}
                toggleLike={props.toggleLike}
                deletePost={props.deletePost}
                is_rebloggable={post.is_rebloggable}
                reblog_toggle_buttons={this.flip}/>
            }

            { tags }
          </div>
        </div>

        <ReactCSSTransitionGroup transitionName="example">
          { this.state.showingForm &&            
            <NewReblogForm flip={this.flip} parent_id={post.id}/>
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});
