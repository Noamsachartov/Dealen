import React from 'react'
import {Link, withRouter} from 'react-router-dom';

 function FCHeader () {
    return (
        <div>
            <Link to="/">ראשי</Link> |
            <Link to="/Report">דוחות </Link> |
            <Link to="/Settings">הגדרות</Link>
        </div>
    )
}
export default withRouter(FCHeader);
