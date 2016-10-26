import { combineReducers } from 'redux'
import Action from './actions'

function followers(state = { followers: {} }, action) {
    switch(action.type) {
        case Action.UPDATE_FOLLOWERS:
            return { ...state, followers: action.followers }

        default:
            return state
    }
}

function articles(state = { articles: {}, searchKeyword: '', avatars: {} }, action) {
    switch(action.type) {
        case Action.ADD_ARTICLE:
            const articles = { ...state.articles }
            articles[action.article.id] = action.article
            return { ...state, articles }

        case Action.UPDATE_ARTICLES:
            return { ...state, articles: action.articles }
        
        case Action.UPDATE_AVATARS:
            return { ...state, avatars: action.avatars }

        case Action.SEARCH_KEYWORD:
            return { ...state, searchKeyword: action.keyword }

        default:
            return state
    }
}

function profile(state = { username:'', headline: '', avatar: '', zipcode: '', email: '', dob: ''}, action) {
    switch (action.type) {
        case Action.UPDATE_HEADLINE:
            return { ...state, headline: action.headline }

        case Action.LOGIN_LOCAL:
            return { ...state, username: action.username }

        case Action.UPDATE_PROFILE:
            return { ...state, avatar: action.avatar, zipcode: action.zipcode, email: action.email, dob: action.dob }
        default:
            return state
    }
}

function common(state = { error:'', success:'', location:'' }, action) {
    const emptyMessage = { error: '', success: '' }
    switch (action.type) {
        case Action.SUCCESS:
            return { ...state, ...emptyMessage, success: action.success }
        case Action.ERROR:
            return { ...state, ...emptyMessage, error: action.error }

        case Action.NAV_PROFILE:
            return { ...state, ...emptyMessage, location: 'profile'}
        case Action.NAV_MAIN:
            return { ...state, ...emptyMessage, location: 'main' }
        case Action.NAV_OUT:
            return { ...state, ...emptyMessage, location: '' }

        default:
            return { ...state, ...emptyMessage }
    }
}

const Reducer = combineReducers({
    articles, profile, common, followers
})

export default Reducer



/** WEBPACK FOOTER **
 ** ./src/reducers.js
 **/