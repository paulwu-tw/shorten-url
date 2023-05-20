const shorten = {
    shorten: function () {
        const MAX_DEFAULT = 5
        const chars = 'abcdefghijklmnopqrstuvwxyz'
        const numbers = '1234567890'
        const collection = chars + chars.toUpperCase() + numbers

        let shortUrl="";
        for (let i = 0; i < MAX_DEFAULT; i++) {
            shortUrl += collection.charAt(Math.floor(Math.random() * collection.length))
        }
        
        return shortUrl
    }
}

module.exports = shorten