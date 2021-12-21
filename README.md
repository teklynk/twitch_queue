# Twitch Queue

### What is this?

Ever needed to generate a list of users that want to play a game, request a song or video. Or maybe you just want to
display everyone that used the !fart command. This will create a list containing the users name and avatar. The list has
a limit that you define. Let's say that you are looking for 7 people from chat to join a game. Chat can type !play until
the limit is reached.

This project uses [TMI.JS](https://tmijs.com/) to connect to Twitch chat anonymously.

### [Try it here](https://twitch-queue.pages.dev/)

### URL Parameters

**channel** = channel name

**command** = The command to listen for. ie: play, request, next. No need to include the !

**limit** = The number of users to show

**size** = The size of the avatar and username

### Notes

To reset/restart the list, you will need to manually refresh the browser source.

### Custom CSS

Add this CSS to the OBS browser source and modify as needed.

```
.queueitem {
    margin: 0 0 4px 0;
}

.profileimage img {
    border-radius: 100%;
    vertical-align: middle;
    border: solid 1px black;
}
.displayname {
    font-family: Basic;
    vertical-align: middle;
    padding: 0 0 0 4px;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px #000000;
}
```