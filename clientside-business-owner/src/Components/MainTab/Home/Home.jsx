import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class Home extends Component {
    render() {
        return (
            <div>
                <h3>Home</h3>
                <ul>
                    <li><Link to="/Advertising_Deal">פרסם מבצע חדש</Link></li>
                </ul>
            </div>
        )
    }
}
