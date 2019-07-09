const axios = require('axios');

function teamLog(name, error, imageUrl, webHookUrl){
    axios.post(webHookUrl, {
            themeColor: "F00",
            summary: error,
            sections: [{
                activityTitle: "Failure " + name,
                activitySubtitle: error,
                activityImage: imageUrl,
                markdown: true
            }]
        }
    )
    .catch(function (error) {
        console.log(error);
    });
}

module.exports = {
    teamLog,
}