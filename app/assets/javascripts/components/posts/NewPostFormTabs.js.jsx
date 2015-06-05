const NewPostFormTabs = React.createClass({
  getInitialState() {
    return {
      key: "text_post"
    };
  },

  handleSelect(key) {
    this.setState({key});
  },

  render() {
    return (
      <ReactBootstrap.Panel collapsible defaultCollapsed header='New post'>
        <ReactBootstrap.TabbedArea activeKey={this.state.key} onSelect={this.handleSelect}>
          <ReactBootstrap.TabPane eventKey={"text_post"} tab='Text post'>
            <PostForm post_type="text_post" resource="new"/>
          </ReactBootstrap.TabPane>
        </ReactBootstrap.TabbedArea>
      </ReactBootstrap.Panel>
    );
  }
});
