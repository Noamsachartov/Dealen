import React from 'react'
import {Link, withRouter} from 'react-router-dom';

 function FCHeader () {
    return (
        <div>
            <Link to="/">ראשי</Link> |
            <Link to="/Report">דוחות </Link> |
            <Link to="/Settings">הגדרות</Link> |
            <Link to="/Login">התחברות</Link> |
            <Link to="/SignUp">הרשמה</Link> |
            <Link to="/Coupon">קוד קופון</Link> |
        </div>
    )
}
export default withRouter(FCHeader);
