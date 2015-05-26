const NewTextPostForm = React.createClass({
  getInitialState () {
    return {
      title: "",
      body: "",
      tags: "",
      is_private: false,
      is_rebloggable: true
    }
  },
  postForm (e) {
    e.preventDefault();
    var data = {
      "post[post_type]": "text_post",
      "post[title]": this.state.title,
      "post[body]": this.state.body,
      "post[tags]": this.state.tags,
      "post[is_private]": this.state.is_private,
      "post[is_rebloggable]": this.state.is_rebloggable,
      "post[post_status]": "active"
    };

    var that = this;
    
    $.ajax("/api/posts", {
      method: "POST",
      data: data,
      success: function (newPost) {
        var newPosts = DashboardPostListGetState().posts;
        newPosts.unshift(newPost)
        DashboardPostListSetState({posts: newPosts});
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
  handleHintRequest () {
    this.setState({body: this.state.body + "\n\nThis is text formatted using Markdown. Links look like [this](quill.io). You can type *italics* or **bold**. You can embed code like `this` or LaTeX like this: `$a^2 + b^2 = c^2$`."});
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
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            className="form-control" 
            id="title" 
            placeholder="Title (optional)" 
            name="post[title]" 
            value={this.state.title}
            onChange={this.handleTitleChange}/>
        </div>
        
        <textarea
          className="form-control"
          rows="3"
          name="post[body]"
          value={this.state.body}
          onChange={this.handleBodyChange}/>

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

        <button className='btn pull-right btn-primary btn-md' onClick={this.postForm}>Post</button>
        <button className='btn pull-right btn-success btn-md' onClick={this.saveToDrafts}>Save to drafts</button>
        <br />

        <PreviewBox content={this.state.body} handleHintRequest={this.handleHintRequest}/>
      </form>
    );
  }
});
