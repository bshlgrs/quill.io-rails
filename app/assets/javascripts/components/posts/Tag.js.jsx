var Tag = React.createClass({
  render () {
    var tag = this.props.tag;

    return <a className="btn btn-xs btn-default" href={"/tags/" + tag}>
      <span key={this.props.tag}>
        #{this.props.tag}
      </span>
    </a>;
  }
})