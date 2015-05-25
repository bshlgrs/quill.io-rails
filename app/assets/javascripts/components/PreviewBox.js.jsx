var PreviewBox = React.createClass({
  render () {
    return (
      <div>
        <strong>preview:</strong>
        <div
          className="content panel-default panel-body panel"
          dangerouslySetInnerHTML={{
            __html: customRenderMarkdown(this.props.content)
          }}/>
      </div>);
  }
});
