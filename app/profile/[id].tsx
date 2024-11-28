import { useRouter } from 'next/router';
import { developers } from '../../data/developers'; // Your mock developer data
import Profile from '../components/Profile'; // The Profile component we created earlier

const DeveloperProfile = () => {
    const { query } = useRouter();  // Use the useRouter hook to access query parameters
    const developerId = query.id as string;

    // Find the developer by the dynamic ID
    const dev = developers.find((d) => d.id === parseInt(developerId));

    if (!dev) {
        return <p>Developer not found!</p>;  // Handle case where no developer is found
    }

    return <Profile dev={dev} />;  // Pass the developer data to the Profile component
};

export default DeveloperProfile;
