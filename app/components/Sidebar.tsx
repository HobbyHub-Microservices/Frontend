import Link from 'next/link';

const Sidebar = ({ developers }) => {
    return (
        <div className="sidebar">
            <h2>Directory</h2>
            <input type="text" placeholder="Search" className="search-input" />
            <ul>
                {developers.map((dev) => (
                    <li key={dev.id}>
                        <Link href={`/profile/${dev.id}`}>
                            {dev.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
