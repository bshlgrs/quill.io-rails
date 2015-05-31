const NewPostForm = React.createClass({
  getInitialState () {
    return this.props.initialPostState && {
      tags: "",
      is_private: false,
      is_rebloggable: true
    };
  },
  postForm (post_status) {
    var data = {
      "post[tags]": this.state.tags,
      "post[is_private]": this.state.is_private,
      "post[is_rebloggable]": this.state.is_rebloggable,
      "post[post_status]": post_status,
      "post[post_type]": this.props.post_type
    };

    // merge the sub object

    var that = this;

    var method = this.props.resource == "new" ? "post" : "put";
    
    $.ajax("/api/posts", {
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
  },
  handlePostClick (e) {
    e.preventDefault();
    this.postForm("active");
  },
  handleSaveToDraftsClick (e) {
    e.preventDefault();
    this.postForm("draft");
  },
  handleTagsChange (e) {
    this.setState({tags: e.target.value});
  },
  handleIsRebloggableChange (e) {
    this.setState({ is_rebloggable: ! this.state.is_rebloggable });
  },
  handleIsPrivateChange (e) {
    this.setState({ is_private: ! this.state.is_private });
  },
  render () {
    var specificStuff = undefined; // depends on post type

    if (post.post_type == "text_post") {
      specificStuff = <TextPostBodyForm />;
    } else if (post.post_type == "reblog") {
      // this shouldn't happen, I think?
      throw "I don't think you should be able to make reblogs like this..."
    } else {
      throw "unrecognised post type: " + post.post_type;
    }
    return (
      <form>
        {specificStuff}

        <br/>
        <div className="form-group">
          <label htmlFor="tags">tags</label>
          <input 
            className="form-control" 
            name="tags" 
            value={this.state.tags} 
            onChange={this.handleTagsChange}/>
        </div>

        <span>
          <label htmlFor="post[is_rebloggable]">rebloggable</label>
          <input
            type="checkbox"
            name="post[is_rebloggable]" data
            size="mini"
            checked={this.state.is_rebloggable}
            onChange={this.handleIsRebloggableChange}/>
        </span>

        <span>
          <label htmlFor="post[is_private]">private</label>
          <input 
            type="checkbox" 
            name="post[is_private]" data-
            size="mini" 
            checked={this.state.is_private} 
            onChange={this.handleIsPrivateChange}/>
        </span>

        <button className='btn pull-right btn-primary btn-md' onClick={this.handlePostClick}>Post</button>
        <button className='btn pull-right btn-success btn-md' onClick={this.handleSaveToDraftsClick}>
          Save to drafts
        </button>
        <br />
      </form>
    );
  }
});
