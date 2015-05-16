/** @jsx React.DOM */

var Newsfeed = React.createClass({
  render () {
    return (
      <div>
        <p>this is the Newsfeed</p>
        <p>there are {this.props.posts.length} posts</p>
      </div>
    );
  }
});