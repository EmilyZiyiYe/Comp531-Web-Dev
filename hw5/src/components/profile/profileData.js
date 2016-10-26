import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

const ProfileData = ({username, avatar, email, zipcode, dob}) => (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <img src={avatar} />
                    <br />
                    <label className="btn btn-default btn-file">
                        Upload Image <input type="file" style={{"display" : "none"}} />
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th><h3>Current Info</h3></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Display Name: <span className="spanValue" id="displayNameValue">{username}</span></td>
                            </tr>
                            <tr>
                                <td>Email: <span className="spanValue" id="emailValue">{email}</span></td>
                            </tr>
                            <tr>
                                <td>Date of Birth: <span className="spanValue">{moment(new Date(dob)).format('MM-DD-YYYY')}</span></td>
                            </tr>
                            <tr>
                                <td>Zipcode: <span id="zipcodeValue" className="spanValue">{zipcode}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className="col-md-6">
                    <div className="form-box" id="updateForm">
                        <div className="form-top">
                            <div className="form-top-left">
                                <h3>Update Info</h3>
                            </div>
                        </div>
                        <div className="form-bottom">
                            <form role="form" action="#" method="GET" id="regForm">
                                <div className="form-group">
                                    <label className="sr-only">Display Name</label>
                                    <input type="text" name="displayName" placeholder="Display name..."
                                           id="displayName" pattern="[A-Za-z]+[A-Za-z0-9]*" className="form-control"
                                           title="Display name can only be upper or lower case letters and numbers, but may not start with a number" />
                                </div>
                                <div className="form-group">
                                    <label className="sr-only">Email</label>
                                    <input type="email" name="email" placeholder="Email..." className="form-control" id="email" pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+" 
                                    title="Email should contain @ and . for correct format." />
                                </div>
                                <div className="form-group">
                                    <label className="sr-only">Phone</label>
                                    <input type="text" name="phone" placeholder="Phone..." className="form-control" id="phone" pattern="\d{3}-\d{3}-\d{4}"
                                    title="Phone number should be format of 123-123-1234" />
                                </div>
                                <div className="form-group">
                                    <label className="sr-only">Zipcode</label>
                                    <input type="text" id="zipcode" name="zipcode"  pattern="\d{5}"
                                    title="US zipcode should be exactly 5 digits." placeholder="Zipcode..."
                                    className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="sr-only">Password</label>
                                    <input type="password" id="pwd" placeholder="Password..." name="pwd" className="form-control" />
                                </div>
                                <button type="submit" className="btn" id="updateBtn">Update</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
)

ProfileData.propTypes = {
	username: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired,
	dob: PropTypes.string.isRequired
}

export default connect(
    (state) => {
        return {
            username: state.profile.username,
            avatar: state.profile.avatar,
            email: state.profile.email,
            zipcode: state.profile.zipcode,
            dob: state.profile.dob
        }
    }
)(ProfileData)



/** WEBPACK FOOTER **
 ** ./src/components/profile/avatar.js
 **/