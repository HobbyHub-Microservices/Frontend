import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import { developers } from '../data/developers';

const Home = () => {
    return (
        <div className="container">
            <Sidebar developers={developers} />
            <Profile dev={developers[0]} /> {/* Displaying the first developer's profile for now */}
        </div>
    );
};

export default Home;
