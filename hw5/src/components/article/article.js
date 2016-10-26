import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Comment from './comment'

class Article extends Component {

  constructor(props) {
    super(props)
    this.hideComments = true
  }

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
                        <img className="img-responsive" src={this.props.img} />
                        <p>{this.props.text}</p>
                        <br/>
                        <button className="btn btn-primary" onClick={() => {
                            this.hideComments = !this.hideComments
                            this.forceUpdate()
                        }}>
                        { this.hideComments ? 'Show' : 'Hide' } Comments </button>

                        { this.hideComments ? '' : this.props.comments.sort((a,b) => {
                            if (a.date < b.date)
                                return 1
                            if (a.date > b.date)
                                return -1
                            return 0
                            }).map((comment) =>
                                <Comment key={comment.commentId} articleId={this.props._id} username={this.props.username}
                                commentId={comment.commentId} author={comment.author} date={comment.date}
                                text={comment.text} avatar={comment.avatar} />
                        )}
                    </div>
                </div>
            </div>
      </div>
  )}
}

Article.propTypes = {
  _id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  img: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.shape({
    ...Comment.propTypes
  }).isRequired).isRequired
}

export default connect()(Article)



/** WEBPACK FOOTER **
 ** ./src/components/article/article.js
 **/