import MessageContainer from "../../components/messages/MessageContainer";
import MessageInput from "../../components/messages/MessageInput";
import MessageInputAi from "../../components/messages/MessageInputAi";
import UserSelector from "../../components/sidebar/CreateGroup";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuthContext } from "../../context/AuthContext";

const Home = () => {
    const { createGroup} = useAuthContext();
    return (
        <>
        {
            createGroup ? <UserSelector/> : <div className='flex border w-full border-red-400 sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <Sidebar />
            <MessageContainer />
           </div>
        }
            
            
        </>
        
    );
};
export default Home;