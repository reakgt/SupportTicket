/**
 *  The public web page that is displayed when the initial page is loaded
 * 
 */

import {Link} from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to the <span className="nowrap">Support Ticket System!</span></h1>
            </header>
            
            <main className="public__main">
                <p>This application allows you to keep track of support tickets.<br /><br />
                   Tickets can be assigned to any active user. Users can only see tickets assigned to them.<br /><br /></p>
                   <p><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />To be added to the Support Ticket System please contact an administrator of this system.</p>
            </main>
            <footer>
                <Link to="/login">User Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public