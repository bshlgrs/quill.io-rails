/** @jsx React.DOM */

var ReblogAndLikeButtons = React.createClass({
  render () {
    var props = this.props;

    if (props.collapsible_reblogs && props.reblogs) {
      var reblog_stuff = <a data-toggle="collapse" 
                          data-target={"#comments-on-" + props.post_id}>
                        {reblog_descendents + " notes, "}
                      </a>
  
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
