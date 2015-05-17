var Tag = React.createClass({
  render () {
    var tag = this.props.tag;

    return <a href={"/tags/" + tag}>
      <span className="label label-default" key={this.props.tag}>
        {this.props.tag}
      </span>
    </a>;
  }
})