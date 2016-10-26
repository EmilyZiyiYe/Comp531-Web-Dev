import Action, { updateError, resource } from '../../actions'

export function updateHeadline(headline) {
    return (dispatch) => {
        //dispatch(updateField('headline', headline))
        if (headline) {
            const payload = {}
            payload['headline'] = headline
            resource('PUT', 'headline', payload).then((response) => {
                dispatch({ type: Action.UPDATE_HEADLINE, headline: response.headline})
            })
        }
    }
}



/** WEBPACK FOOTER **
 ** ./src/components/profile/profileActions.js
 **/