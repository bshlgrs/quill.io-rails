var NewTextPostForm = React.createClass({
  postForm (e) {
    e.preventDefault();
    var data = {
      "post[post_type]": "text_post"
    }
    $.ajax("/api/posts", {
      method: "POST",
      data: data,
      success: function (x) {
        debugger;
      },
      error: function (x) {
        x.responseJSON.map(function(error) {
          $.notify({
            // options
            message: error
          },{
            // settings
            type: 'danger'
          });
        })
      }
    });
  },
  render () {
    return (
      <form>
        <input type="hidden" name="post[post_type]" value="text_post"/>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input className="form-control" id="title" placeholder="Title (optional)" name="post[title]" />
        </div>
        
        <textarea className="form-control" rows="3" name="post[body]"></textarea>

        <br/>
        <div className="form-group">
          <label htmlFor="tags">tags</label>
          <input className="form-control" name="tags"/>
        </div>

        <span>
          <label htmlFor="post[is_rebloggable]">rebloggable</label>
          <input type="checkbox" name="post[is_rebloggable]" data-size="mini" defaultChecked/>
          <script>
            $("[name='post[is_rebloggable]']").bootstrapSwitch();
          </script>
        </span>

        <span>
          <label htmlFor="post[is_private]">private</label>
          <input type="checkbox" name="post[is_private]" data-size="mini"/>
          <script>
            $("[name='post[is_private]']").bootstrapSwitch();
          </script>
        </span>

        <button className='btn pull-right btn-primary' onClick={this.postForm}>Post</button>
      </form>
    );
  }
});
