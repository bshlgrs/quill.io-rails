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

Users should be able to comment on posts in a non-reblogging way. This isn't threaded and is mostly used on non-reblog posts.

## Different post types

To start with, we need to support image posts. This is just another "rebloggable" model. I hear Paperclip and AWS C3 are the best way of making this work?

Supporting quotes just involves duplicating TextPost and changing the view.


## Displaying comment threads from reblogs

We want to display reddit-style threaded comments from reblogs. I think the easiest way of doing this is to run a diff between `add_quotes(parent_post)` and `current_post`, and then display the bits of the diff which are adds.

