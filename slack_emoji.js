//Slack emoji storage
//Link : https://www.webfx.com/tools/emoji-cheat-sheet/

exports.emojis = (face) =>{
    emoji = {
        icon_emoji: `:${face}:`
    };
    return emoji;
}