var NewTextPostForm = React.createClass({
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
      "post[is_rebloggable]": this.state.is_rebloggable
    };
    
    $.ajax("/api/posts", {
      method: "POST",
      data: data,
      success: function (x) {
        location.reload();
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
      <form>
        <input type="hidden" name="post[post_type]" value="text_post"/>
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

        <button className='btn pull-right btn-primary' onClick={this.postForm}>Post</button>
      </form>
    );
  }
});
