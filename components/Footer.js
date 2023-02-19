import React from 'react';

function Footer(props) {
    return (
        <div className="footer">
            <p>&copy; {new Date().getFullYear()} Copyright by YT-V-Converter. All Rights Reserved.</p>
        </div>
    );
}

export default Footer;