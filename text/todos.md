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

## Submit

## Comments

Users should be able to comment on posts in a non-reblogging way. This isn't threaded and is mostly used on non-reblog posts. Maybe you should be able to comment or post but not both

## Archive view for blogs

## Blogs should allow custom formatting

## Multiple blogs

## Different post types

To start with, we need to support image posts. This is just another "rebloggable" model. I hear Paperclip and AWS C3 are the best way of making this work?

Supporting quotes just involves duplicating TextPost and changing the view.

Audio and video posts can probably be done by embedding from soundcloud and youtube.

Chat posts are formatted like a tv script, ideally? no one really uses this feature on tumblr and it's probably not a priority.

Link posts also probably aren't a priority.

## Queue

posts should be possible to add to queue. queue should be a page from which you can shuffle and reorder queued posts. you should be able to set how often a day your queue posts (1-50 times)

## Drafts

posts should be possible to save as drafts. drafts should be a page from which you can edit and post drafted posts.

## Activity/notifications

when someone interacts with a post of yours, you should get a notification. notifications appear in-line in the dashboard. you should also have an activity page from which you can see all your notifications.

## followers

you should be able to see all of the people who are following you. you should get a notification when someone follows you.
