const request = require('request')
const news = (country, callback) => {
    const url = 'https://newsapi.org/v2/top-headlines?country=' + country + '&apiKey=9c01d223c81e47af8264fe7ab07b999b'
    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            console.log("check url")
            callback('Unable to connect to location service', undefined)
        } else if (response.body.message) {
            console.log("check api token ")
            callback(response.body.message, undefined)
        } else if (response.body.articles.length === 0) {
            console.log("check country")
            callback('Unable to find location..Please try again', undefined)
        } else {
            const data = []
            response.body.articles.forEach(item => {
                data.push({
                    title: item.title,
                    description: item.description,
                    urlToImage: item.urlToImage,
                    url: item.url
                })
            });
            callback(undefined, data)
        }
    })
}

module.exports = news