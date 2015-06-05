const TextPostBodyForm = React.createClass({
  getInitialState () {
    return this.props.post || {
      title: "",
      body: "",
      tags: "",
      is_private: false,
      is_rebloggable: true
    };
  },
  bodyData () {
    return {
      "post[title]": this.state.title,
      "post[body]": this.state.body
    };
  },
  handleTitleChange (e) {
    this.setState({title: e.target.value});
  },
  handleBodyChange (e) {
    this.setState({body: e.target.value});
  },
  render () {
    return (
      <div>
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
      </div>
    );
  }
});
