function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

let channelName = getUrlParameter('channel');
let queueLimit = getUrlParameter('limit');
let queueCommand = getUrlParameter('command');
let size = getUrlParameter('size');
let profileImage = 'assets/images/default.jpg';
let queueList = '';

if (!channelName) {
    alert('Channel Name is not set');
}
if (!queueLimit) {
    alert('Limit is not set');
}
if (!queueCommand) {
    alert('Chat command is not set');
}
if (!size) {
    alert('Size is not set');
}

// Twitch API: user info: user_id
function getInfo(user_name, callback) {
    let urlI = "https://twitchapi.teklynk.com/getuserinfo.php?channel=" + user_name + "";
    let xhrI = new XMLHttpRequest();
    xhrI.open("GET", urlI);
    xhrI.onreadystatechange = function () {
        if (xhrI.readyState === 4 && xhrI.status === 200) {
            callback(JSON.parse(xhrI.responseText));
            return true;
        } else {
            return false;
        }
    };

    xhrI.send();
}

const client = new tmi.Client({
    channels: [channelName]
});

client.connect();

client.on('chat', (channel, user, message, self) => {
    if (self || !message.startsWith('!')) return;

    let args = message.slice(1).split(' ');
    let command = args.shift().toLowerCase();
    let commandOption1 = message.split(' ')[1];
    let commandOption2 = message.split(' ')[2];

    if (command === queueCommand) {

        if (user.mod || user.username.toLowerCase() === channelName.toLowerCase()) {
            // Reset command
            if (commandOption1 === 'reset') {
                // Reload browser source
                window.location.reload();
                return true;
            }
            // Remove user
            if (commandOption1 === 'remove' && commandOption2 > '') {
                commandOption2 = commandOption2.replace('@', '');
                commandOption2 = commandOption2.trim();
                $('#user_' + commandOption2.toLowerCase()).remove();
                return true;
            }
        }

        // Count items
        let countElements = $('.queueitem').length;

        if (countElements !== parseInt(queueLimit)) {

            // If user does not exist
            if ($('.displayname:contains("' + user['display-name'] + '")').length === 0) {

                getInfo(user.username, function (data) {

                    profileImage = data.data[0]['profile_image_url'];

                    let imageSize = "max-height:" + parseInt(size) * 2 + "px;";
                    let fontSize = "font-size:" + size + "px;";

                    queueList = '<div class="queueitem" id="user_' + user.username.toLowerCase() + '"><span class="profileimage"><img style="' + imageSize + '" src="' + profileImage + '" alt=""/></span>' +
                        '<span class="displayname" style="' + fontSize + '">' + user['display-name'] + '</span></div>';

                    $(queueList).appendTo('#container').hide().fadeIn("slow");

                });

            }
        }
    }
});
