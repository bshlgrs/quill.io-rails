
const PostForm = React.createClass({
  getInitialState () {
    if (this.props.resource == "new") {
      return {
        tags: "",
        is_private: false,
        is_rebloggable: true
      };
    } else if (this.props.resource == "edit") {
      var post = this.props.post;
      return {
        tags: post.tags.join(" "),
        is_private: post.is_private,
        is_rebloggable: post.is_rebloggable
      };
    } else {
      throw "resource is broken: " + this.props.resource;
    }
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
    var props = this.props;
    var post = props.post;

    var specificStuff = undefined; // depends on post type

    if (props.post_type == "text_post") {
      specificStuff = <TextPostBodyForm ref="sub_form" post={post}/>;
    } else if (props.post_type == "reblog") {
      // this shouldn't happen, I think?
      // throw "I don't think you should be able to make reblogs like this..."
      specificStuff = <ReblogBodyForm ref="sub_form" post={post}/>;
    } else {
      throw "unrecognised post type: " + props.post_type;
    }
    return (
      <div>
        {this.props.children}

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

        <button className='btn pull-right btn-primary btn-md' onClick={this.handlePostClick}>
          {props.resource == "new" ? "Post" : "Update"}
        </button>
        <button className='btn pull-right btn-success btn-md' onClick={this.handleSaveToDraftsClick}>
          Save to drafts
        </button>
        <br />
      </div>
    );
  }
});
