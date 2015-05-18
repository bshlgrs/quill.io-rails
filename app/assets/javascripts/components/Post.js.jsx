/** @jsx React.DOM */

var Post = React.createClass({
  render () {
    var props = this.props;
    var post = props.post;

    var private_tag = props.post.is_private && <span className="label label-default">Private</span>;

    var body;

    if (post.post_type == "text_post") {
      body = post.body;
    } else {
      throw "unrecognised post type: " + post.post_type;
    }

    var tags = post.tags.map(function(tag, n) {
      return <Tag tag={tag} key={tag}/>;
    })

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          { props.display_author && 
            <UserNameAndProfilePic user={post.user}/> }

          <a href={"/blogs/" + post.user.username + "/posts/" + post.id}>
            { post.big_title 
              ? <h2>{post.title} {private_tag}</h2>
              : <h3>{post.title} {private_tag}</h3>
            }
          </a>

          <div><small>{post.created_at}</small></div>

          <div>
            {body}
          </div>

          <ReblogAndLikeCounters 
            collapsible_reblogs={props.collapsible_reblogs}
            reblogs={post.reblogs}
            is_rebloggable={post.is_rebloggable}
            reblogs={post.reblogs}
            number_of_likes={post.number_of_likes}
            current_user={props.current_user}
            post_id={post.id}/>

          { props.current_user &&
            <PostButtons
              current_user_likes_this={post.current_user_likes_this}
              post_id={post.id}
              user_id={post.user.id}
              toggleLike={props.toggleLike}
              deletePost={props.deletePost}
              is_rebloggable={post.is_rebloggable}/>
          }

          { tags }
        </div>
      </div>
    );
  }
});
