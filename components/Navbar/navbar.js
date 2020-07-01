import Link from 'next/link'

export default function Navbar() {
    return (
        <>
        <Link href="/">
            <a id="link">
                <h2 id="logo" className="m-3">WirFit</h2>
            </a>  
        </Link>
        </>
    );
};
