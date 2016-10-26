import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


const Follower = ({name, avatar, headline}) => (

    <li>
        <div className="card">
            <img src={ avatar } />
            <div className="cardContainer">
                <h5><b>{ name }</b></h5> 
                <p> {headline} <button className="btn unfollowBtn">Unfollow</button> </p>
            </div>
        </div>
    </li>
)

Follower.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    headline: PropTypes.string
}

class Following extends Component {
    render() { return (
        <div>
            
            { Object.keys(this.props.followers).sort().map((followerName) => this.props.followers[followerName]).map((follower) =>
                <Follower key={follower.name}
                    name={follower.name} avatar={follower.avatar} headline={follower.headline}
                 />
            )}

            <li>
                <br />
                <input type="text" name="newUser" placeholder="New User..." className="form-control" id="newUser" />
                <button className="btn">Add</button>
            </li>
                
        </div>
    )}
}

Following.propTypes = {
    followers: PropTypes.object.isRequired
}

export default connect(
    (state) => {
        return {
            followers: state.followers.followers
        }
    }
)(Following)



/** WEBPACK FOOTER **
 ** ./src/components/main/following.js
 **/