/** @jsx React.DOM */

var Post = React.createClass({
  render () {
    var props = this.props;

    var private_tag = props.is_private && <span className="label label-default">Private</span>;

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          { props.display_author && 
            <UserNameAndProfilePic user={props.user}/> }
          { props.big_title 
            ? <h2>{props.title} {private_tag}</h2>
            : <h3>{props.title} {private_tag}</h3>
          }

          <div><small>{props.created_at}</small></div>

          <div>
            {props.body}
          </div>

          <ReblogAndLikeButtons 
            collapsible_reblogs={false}
            reblogs={props.reblogs}
            is_rebloggable={props.is_rebloggable}
            reblogs={props.reblogs}
            number_of_likes={props.number_of_likes}
            post_id={props.id}/>
        </div>
      </div>
    );
  }
});
