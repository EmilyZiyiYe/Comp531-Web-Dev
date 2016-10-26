import React from 'react'
import { connect } from 'react-redux'
import Headline from './headline'
import ArticlesView from '../article/articlesView'
import Nav from './nav'
import Following from './following'

const Main = () => (
    
    <div className="container-fluid">
            <div className="row" >

                <div className="col-xs-6 col-md-3">
                    <ul className="nav nav-pills nav-stacked">
                        <Nav/>
                        <Headline/>
                        <Following/>
                    </ul>
                </div>

                <div className="col-xs-6 col-md-9">
                    <h1><strong>Welcome to OwlBook!</strong></h1>

                    
                    <h5>A place where you can connect anybody from Rice campus</h5>
                    <br/>
                    

                    <div className="btn-group-vertical">
                        <label className="btn btn-default btn-file"> <span className="glyphicon glyphicon-picture"></span>
                        Add Image <input type="file" style={{"display" : "none"}} />
                        </label>
                        <button type="button" className="btn btn-primary" id="cancelBtn">Cancel</button>
                        <button type="button" className="btn btn-primary">Post</button>
                    </div>

                    <div className="col-xs-6 col-md-7">
                        <textarea className="form-control" rows="6" placeholder="What is on your mind?" id="userPost"></textarea>
                        <br />
                    </div>

                    
                    <ArticlesView/>
                </div>  
            </div>        
        </div>  
)

export default Main



/** WEBPACK FOOTER **
 ** ./src/components/main/main.js
 **/