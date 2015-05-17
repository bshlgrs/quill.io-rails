/** @jsx React.DOM */

var ReblogAndLikeCounters = React.createClass({
  render () {
    var props = this.props;

    if (props.collapsible_reblogs && props.reblogs.length) {
      var reblog_stuff = <span>
        <a data-toggle="collapse" 
            data-target={"#comments-on-" + props.post_id}>
          {props.reblogs.length + " notes "}
        </a>
        <span>, </span>
      </span>;
  
    } else {
      var reblog_stuff = <span>{props.reblogs.length + " notes, "}</span>
    }
    
    return (
      <span>
        {props.is_rebloggable && reblog_stuff}
        {props.number_of_likes + " likes."}
      </span>
    )
  }
});
