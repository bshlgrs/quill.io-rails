const NewReblogForm = React.createClass({
  getInitialState () {
    return {
      body: "",
      tags: "",
      is_private: false,
      is_rebloggable: true
    }
  },
  postForm (e) {
    e.preventDefault();
    var data = {
      "post[post_type]": "reblog",
      "post[body]": this.state.body,
      "post[tags]": this.state.tags,
      "post[is_private]": this.state.is_private,
      "post[is_rebloggable]": this.state.is_rebloggable,
      "post[parent_id]": this.props.parent_id
    };

    var that = this;
    
    $.ajax("/api/posts", {
      method: "POST",
      data: data,
      success: function (newPost) {
        if (location.pathname == "/") {
          var newPosts = DashboardPostListGetState().posts;
          newPosts.unshift(newPost)
          DashboardPostListSetState({posts: newPosts});
          that.setState(that.getInitialState());
          that.props.flip();
        } else {
          location.pathname = "/";
        }
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
  handleTitleChange (e) {
    this.setState({title: e.target.value});
  },
  handleBodyChange (e) {
    this.setState({body: e.target.value});
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
    return (
      <div className="panel panel-default" key="the-only-thing">
        <div style={{position: "relative"}}>
          <div className="profile-picture-sm profile-picture-floater-sm">
            <img src={current_user.guaranteed_profile_pic_url}/>
          </div>
        </div>

        <div className="panel-body">
          <form>
            <textarea
              className="form-control"
              rows="3"
              name="post[body]"
              value={this.state.body}
              onChange={this.handleBodyChange}/>

            <br/>
            <input
              className="form-control input-sm" 
              name="tags" 
              value={this.state.tags} 
              placeholder="tags"
              onChange={this.handleTagsChange}/>

            <span>
              <label htmlFor="post[is_rebloggable]">rebloggable</label>
              <input
                type="checkbox"
                name="post[is_rebloggable]" data
                size="mini"
                checked={this.state.is_rebloggable}
                onChange={this.handleIsRebloggableChange}/>

              <label htmlFor="post[is_private]">private</label>
              <input 
                type="checkbox" 
                name="post[is_private]" data-
                size="mini" 
                checked={this.state.is_private} 
                onChange={this.handleIsPrivateChange}/>
            </span>

            <button className='btn pull-right btn-primary btn-sm' onClick={this.postForm}>Post</button>

            <PreviewBox content={this.state.body} />
          </form>
        </div>
      </div>
    );
  }
});
