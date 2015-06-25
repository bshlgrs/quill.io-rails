var fluxPosts = {};
 
fluxPosts.constants = {
  UPDATE_POST: "UPDATE_POST",
  ADD_POST: "ADD_POST",
  DELETE_POST: "DELETE_POST",
  TOGGLE_POST_LIKE: "TOGGLE_POST_LIKE"
};

fluxPosts.store = Fluxxor.createStore({
  initialize: function(posts) {
    this.posts = posts;
    this.bindActions(fluxPosts.constants.UPDATE_POST, this.onUpdatePost, 
                     fluxPosts.constants.ADD_POST, this.onAddPost,
                     fluxPosts.constants.DELETE_POST, this.onDeletePost,
                     fluxPosts.constants.TOGGLE_POST_LIKE, this.onTogglePostLike);
  },
  getState: function() {
    return {
      posts: this.posts,
    };
  },
  onUpdatePost: function(postData) {
    if (this.posts[postData.id]) {
      $.ajax("/api/posts/" + postData.id, {
        data: postData,
        method: "PATCH",
        success: function () {
          this.posts[postData.id] = postData;
          this.emit("change");
        },
        error: function () {
          $.notify({ message: "that was unsuccessful." },{ type: 'danger' });
        }
      });
    }
  },
  onAddPost: function(postData) {
    $.ajax("/api/posts/", {
        data: postData,
        method: "Post",
        success: function (result) {
          debugger; // we need to get the id of the result.
          this.posts[postData.parent_id] && this.posts[postData.parent_id].reblogs.push(result.id);
          this.posts[result.id] = postData;
          this.emit("change");
        },
        error: function () {
          $.notify({ message: "that was unsuccessful." },{ type: 'danger' });
        }
      });
  },
  onTogglePostLike: function(postId) {
    var post = this.posts[postId];

    if (post) {
      var action = post.current_user_likes_this ? "unlike" : "like";

      $.ajax("/api/posts/" + post_id + "/" + action, {
        method: "POST",
        success: function () {
          if (post.current_user_likes_this) {
            this.posts[postId].current_user_likes_this = false;
            this.posts[postId].number_of_likes -= 1;
          } else {
            this.posts[postId].current_user_likes_this = true;
            this.posts[postId].number_of_likes += 1;
          }
        },
        error: function () {
          $.notify({
            message: "the attempt to " + action + " that post was unsuccessful."
          },{
            type: 'danger'
          });
        }
      });
    }
  },
  onDeletePost: function(post_id) {
    $.ajax("/api/posts/" + post_id, { method: "DELETE" });
    this.setState({posts: _.reject(this.state.posts, function (x) { return x.id == post_id; })});
  }
});

fluxPosts.actions = {
  
  updatePostStatus (post_id, field, newValue) {
    var postIndex = _.findIndex(this.state.posts, function (x) { return x.id == post_id; });
    var post = this.state.posts[postIndex];
    var that = this;

    if (post) {
      var posts = this.state.posts;
      
      var data = {}
      data["post[" + field + "]"] = newValue;

      $.ajax("/api/posts/" + post_id, {
        data: data,
        method: "PATCH",
        success: function () {
          post[field] = newValue;
          that.setState({posts: posts});
        },
        error: function () {
          $.notify({
            message: "that was unsuccessful."
          },{
            type: 'danger'
          });
        }
      });
    }
  },
  postForm (post_status) {
    var data = {
      "post[tags]": this.state.tags,
      "post[is_private]": this.state.is_private,
      "post[is_rebloggable]": this.state.is_rebloggable,
      "post[post_status]": post_status,
      "post[post_type]": this.props.post_type
    };

    _.defaults(data, this.refs.sub_form.bodyData());

    var that = this;

    var method = this.props.resource == "new" ? "post" : "put";
    
    var url = this.props.resource == "new" ? "/api/posts" : "/api/posts/" + this.props.post.id;

    $.ajax(url, {
      method: method,
      data: data,
      success: function (newPost) {
        if (post_status == "active") {
          var newPosts = DashboardPostListGetState().posts;
          newPosts.unshift(newPost);
          DashboardPostListSetState({posts: newPosts});          
        } else {
          $.notify({
            message: "Successfully saved as draft"
          },{
            type: 'success'
          });
        }
        that.setState(that.getInitialState())
        $("#newTextPost").collapse("hide");
      },
      error: function (x) {
        x.responseJSON.map(function(error) {
          $.notify({
            message: error
          },{
            type: 'danger'
          });
        });
      }
    });
  }
};

fluxPosts.init = function(posts) {
  var tempStore = {
    PostsStore: new fluxPosts.store({
      posts: posts
    })
  };
  fluxPosts.flux = new Fluxxor.Flux(tempStore, fluxPosts.actions);
};