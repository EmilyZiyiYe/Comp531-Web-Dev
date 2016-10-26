import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Comment extends Component {

    render() {
        const date = moment(new Date(this.props.date))
        return (
        <div className="row">
            <div className="col-xs-6 col-md-9">
                <div className="card">
                    <div className="media">
                        <div className="media-left">
                            <img className="mediaAvatar" src={ this.props.avatar } />
                        </div>
                        <div className="media-body">
                            <a href="#">{this.props.author}</a>
                            <br/> {date.format('MM-DD-YYYY')} - {date.format('HH:mm:ss')} <span className="glyphicon glyphicon-user"></span>
                        </div>
                        
                        <p>{this.props.text}</p>
                        
                    </div>
                </div>
            </div>
      </div>
    )}
}

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    avatar: PropTypes.string,
}

export default connect()(Comment)



/** WEBPACK FOOTER **
 ** ./src/components/article/comment.js
 **/