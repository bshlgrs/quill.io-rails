const BlogPostList = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("PostsStore")], // or Fluxxor.FluxMixin(React) ?
  getStateFromFlux () {
    var flux = this.getFlux();
    return {
      posts: flux.store("PostsStore").getState().posts //.values
    };
  },
  choosePosts () {
    return _.sortBy(
      _.filter(this.state.posts, function (post) { return post.user_id == this.props.user_id; }),
      function (post) { return post.created_at; }
    );
  },
  render () {
    return <PostList posts={this.choosePosts()}>
  }
});
