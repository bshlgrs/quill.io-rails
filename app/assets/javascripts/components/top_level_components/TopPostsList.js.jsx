const TopPostsList = React.createClass({
  mixins: [FluxMixin(React), StoreWatchMixin("PostsStore", "UsersStore")],
  getStateFromFlux () {
    var flux = this.getFlux();
    return {
      posts: flux.store("PostsStore").getState().posts,
      users: flux.store("UsersStore").getState().users
    };
  },
  render () {
    return (<div>
      <PostList
         posts={this.state.posts}
         post_list={this.props.top_level_posts}
         users={this.state.users}
         display_author={true}/>
    </div>);
  }
});

// big_title: false,
//   collapsible_reblogs: true,
//   display_author: true