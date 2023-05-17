const shorten = {
    shorten: function () {
        const chars = 'abcdefghijklmnopqrstuvwxyz'
        const upperChars = chars.toUpperCase()
        const numbers = '1234567890'
    
        let collection = []
        collection = collection.concat(chars.split(''))
        collection = collection.concat(upperChars.split(''))
        collection = collection.concat(numbers.split(''))
    
        let shortUrl = ''
        for (let i = 0; i < 5; i++) {
            shortUrl += collection[Math.floor(Math.random() * collection.length)]
        }
        
        return shortUrl
    }
}

module.exports = shorten