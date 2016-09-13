// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
(function(exports) {

    'use strict'

    function countWords(url) {
        return fetch(url).then(r => r.json()).then(countMap)
    }
    
    function countMap(json){
        var count
        var wordCounts = {}
        var articles = json.articles
        articles.forEach(function(article){
            count = article.text.split(" ").length
            wordCounts[article._id] = count
        })
        return wordCounts
    }

    function countWordsSafe(url) {
        return fetch(url).then({})
    }
    
    function largestArticle(json){
        var count
        var maxCount = 0
        var maxArticleId
        var articles = json.articles
        articles.forEach(function(article){
            count = article.text.split(" ").length
            if (count > maxCount){
                maxCount = count
                maxArticleId = article._id
            }
        })
        return String(maxArticleId)
    }

    function getLargest(url) {
        return fetch(url).then(r => r.json()).then(largestArticle)
    }

    exports.inclass = {
        author: "xz9",
        countWords, countWordsSafe, getLargest
    }

})(this);
