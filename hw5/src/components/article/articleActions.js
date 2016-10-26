import Action, { resource } from '../../actions'

export function fetchArticles() {
    return (dispatch, getState) => {
        resource('GET', 'articles')
        .then((response) => {
            // const articles = response.articles.reduce((o,v) => {
            //     o[v._id] = v
            //     return o
            // }, {})
            dispatch({ type:Action.UPDATE_ARTICLES, articles: response.articles})

            const articleAvatars = getState().articles.avatars
            const authors = new Set(response.articles.reduce((o, article) => {
                article.comments.map((c) => c.author).forEach((author) => o.push(author))
                return o
            }, []).filter((author) => !articleAvatars[author]))
            if (authors.size > 0) {
                resource('GET', `avatars/${[...authors].join(',')}`)
                .then((response) => {
                    response.avatars.forEach((s) => {
                        articleAvatars[s.username] = s.avatar
                    })
                    dispatch({ type: Action.UPDATE_AVATARS, avatars: articleAvatars })
                })
            }
        })
    }
}

export function searchKeyword(keyword) {
    return { type: Action.SEARCH_KEYWORD, keyword }
}



/** WEBPACK FOOTER **
 ** ./src/components/article/articleActions.js
 **/