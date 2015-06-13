const TopPostsList = React.createClass({
  mixins: [FluxMixin(React), StoreWatchMixin("PostsStore", "UsersStore")],
  getStateFromFlux () {
    var flux = this.getFlux();
    return {
      posts: flux.store("PostsStore").getState().posts,
      users: flux.store("UsersStore").getState().users
    };
  },
  // choosePosts () {
  //   return _.sortBy(
  //     _.filter(this.state.posts, function (post) { return post.user_id == this.props.user_id; }),
  //     function (post) { return post.created_at; }
  //   );
  // },
  render () {
    return <div><PostList posts={this.state.posts} top_level_posts={this.props.top_level_posts} users={this.state.users}/></div>;
  }
});

// big_title: false,
//   collapsible_reblogs: true,
//   display_author: true