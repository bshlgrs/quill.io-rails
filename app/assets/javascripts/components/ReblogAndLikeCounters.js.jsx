/** @jsx React.DOM */

var ReblogAndLikeCounters = React.createClass({
  render () {
    var props = this.props;
    var post = props.post;

    if (props.collapsible_reblogs && post.reblogs.length) {
      var reblog_stuff = <span>
        <a data-toggle="collapse" 
            data-target={"#comments-on-" + post.id}>
          {post.number_of_reblog_descendants + " notes "}
        </a>
        <span>, </span>
      </span>;
  
    } else {
      var reblog_stuff = <span>{post.number_of_reblog_descendants + " notes, "}</span>
    }
    
    return (
      <span>
        {post.is_rebloggable && reblog_stuff}
        {post.number_of_likes + " likes."}
      </span>
    )
  }
});
