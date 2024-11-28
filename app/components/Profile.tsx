const Profile = ({ dev }) => {
    return (
        <div className="profile">
            <div className="profile-header">
                <img src={dev.avatar} alt={dev.name} className="avatar" />
                <div>
                    <h1>{dev.name}</h1>
                    <p>{dev.title}</p>
                </div>
            </div>

            <div className="profile-tabs">
                <button>Profile</button>
                <button>Work History</button>
                <button>Contact</button>
            </div>

            <div className="profile-content">
                <h2>Bio</h2>
                <p>{dev.bio}</p>

                <h2>Find me on:</h2>
                <p>
                    Twitter: <a href={`https://twitter.com/${dev.twitter}`}>{dev.twitter}</a>
                </p>
                <p>
                    GitHub: <a href={`https://github.com/${dev.github}`}>{dev.github}</a>
                </p>
            </div>
        </div>
    );
};

export default Profile;
