/** @jsx React.DOM */

var Post = React.createClass({
  render () {
    var props = this.props;

    var private_tag = props.is_private && <span className="label label-default">Private</span>;

    var body;

    if (props.post_type == "text_post") {
      body = props.body;
    } else {
      throw "unrecognised post type: " + props.post_type;
    }

    var tags = props.tags.map(function(tag, n) {
      return <Tag tag={tag} key={tag}/>;
    })

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          { props.display_author && 
            <UserNameAndProfilePic user={props.user}/> }

          <a href={"/blogs/" + props.user.username + "/posts/" + props.post_id}>
            { props.big_title 
              ? <h2>{props.title} {private_tag}</h2>
              : <h3>{props.title} {private_tag}</h3>
            }
          </a>

          <div><small>{props.created_at}</small></div>

          <div>
            {body}
          </div>

          <ReblogAndLikeCounters 
            collapsible_reblogs={props.collapsible_reblogs}
            reblogs={props.reblogs}
            is_rebloggable={props.is_rebloggable}
            reblogs={props.reblogs}
            number_of_likes={props.number_of_likes}
            current_user={props.current_user}
            post_id={props.id}/>

          { props.current_user &&
            <ReblogAndLikeButtons
              current_user_likes_this={props.current_user_likes_this}
              post_id={props.post_id}
              toggleLike={props.toggleLike}
              is_rebloggable={props.is_rebloggable}/>
          }

          { tags }
        </div>
      </div>
    );
  }
});
