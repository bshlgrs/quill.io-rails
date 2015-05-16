/** @jsx React.DOM */

var Newsfeed = React.createClass({
  render () {
    return (
      <div>
        {this.props.posts.map( function (post, n) {
          return <Post 
            title={post.title}
            body={post.body}
            key={post.id}
            created_at={post.created_at}
            number_of_likes={post.number_of_likes}
            user={post.user}
            is_private={post.is_private}
            is_rebloggable={post.is_rebloggable}
            big_title={false}
            reblogs={post.reblogs}
            display_author={true}/>;
        }
        )}
      </div>
    );
  }
});
