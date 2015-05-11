# todos

These are all things that we should eventually support.

If someone didn't know much rails or web development, I'd probably most want them to work on the React.js views. It's pretty easy to use React.js incremetally.

Alternatively, adding messages should be pretty easy.

Adding an API would also be pretty valuable and pretty easy.


## Following users

you should be able to. Once we have this, the dashboard should be changed to privilege posts by the people you're following.

## Infinite scroll on the dashboard

I hear that kaminari is useful for this.

## Add a rich text editor

apparently some people want this?! it should just be an additional pane in the "new text post" window.

## Reimplement all the views using React.js

This makes more sense long term. Particular priorities: the "new text post" view and the "post" view.

## Rewrite some of the queries to be more efficient

the dashboard is an ugly, inefficient clusterfuck right now, this should be fixed.

## tags

posts should have tags. So should reblogs. tbh I'm not sure what tags are for. I should get Kelsey to explain them.

## likes

you should be able to like posts.

## User preferences

Users should have and be able to edit:

- profile pic
- blog description
- whether you have to ask to follow them
- whether they only accept messages from people they're following
- a list of words (like "torture, meat") that they have blocked.
- a list of tags that they've blocked


## Messaging

Users should be able to send each other messages.

There should be an inbox, an outbox, and messages threaded by user.

I need to figure out what "asks" are, and how to implement those.


## Comments

Users should be able to comment on posts in a non-reblogging way. This isn't threaded and is mostly used on non-reblog posts. Maybe you should be able to comment or post but not both

## Archive view for blogs

## Blogs should allow custom formatting

## Multiple blogs

## Add reblogs inline on a post, reddit-style

## Different post types

To start with, we need to support image posts. This is just another "rebloggable" model. I hear Paperclip and AWS C3 are the best way of making this work?

Supporting quotes just involves duplicating TextPost and changing the view.

Audio and video posts might be okay to do through embedding from soundcloud/youtube rather than through direct uploads. this also might make our lives easier re: copyright.

'chat' posts are used for writing a back-and-forth between participants, it'd be cool to have pretty formatting for that. not a priority though.


## Displaying comment threads from reblogs

We want to display reddit-style threaded comments from reblogs. I think the easiest way of doing this is to run a diff between `add_quotes(parent_post)` and `current_post`, and then display the bits of the diff which are adds.


## Queue

posts can be added to queue, the queue staggers scheduling of posts, you can set how many times a day you want your queue to publish. you can shuffle and/or rearrange your queue.

## Drafts

posts can be saved as a draft, there's a drafts folder, posts in the draft folder can be published

## notifications

you should have a page where you can view all interactions with your posts (on tumblr this means 'all posts originating from you and all posts reblogged directly from you' - 'all posts descended from you (to which you added things) might be better. alternately you could toggle by-post whether you want notifications about that post). notifications also show up in-line in the dashboard.

## problems

the url of a reblogger appears above the post title sometimes
clicking on the post title doesn't bring you to that posts' original page like you'd intuitively expect
dates should probably be above the title text
