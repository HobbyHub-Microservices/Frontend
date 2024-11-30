import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shadcn/ui';

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

            {/* Use ShadCN UI Tabs for navigation */}
            <Tabs defaultValue="profile" className="profile-tabs">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="work-history">Work History</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
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
                </TabsContent>
                <TabsContent value="work-history">Work history content goes here...</TabsContent>
                <TabsContent value="contact">Contact content goes here...</TabsContent>
            </Tabs>
        </div>
    );
};

export default Profile;
