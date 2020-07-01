import Link from 'next/link'

export default function Sidebar() {
    return (
        <>
        <div id="sidebar">
            <Link href="/">
                <a id="link"> <h3 className="sidebarLinks">Home</h3></a>
            </Link>
            <Link href="/">
                <a id="link"> <h3 className="sidebarLinks">Prices</h3></a>
            </Link>
            <Link href="/">
                <a id="link"> <h3 className="sidebarLinks">About Us</h3></a>
            </Link>
            <Link href="/">
                <a id="link"> <h3 className="sidebarLinks">Contact</h3></a>
            </Link>
            <Link href="/">
                <a id="link"> <h3 className="sidebarLinks">Jobs</h3></a>
            </Link>

            </div>
        </>
    );
};

