
var PreviewBox = React.createClass({
  render () {
    return (
      <div>
        <strong>preview:</strong>
        {this.props.handleHintRequest && 
          <small><a onClick={this.props.handleHintRequest}>get help with formatting</a></small>}
        <div
          className="content panel-default panel-body panel"
          dangerouslySetInnerHTML={{
            __html: customRenderMarkdown(this.props.content)
          }}/>
      </div>);
  }
});
