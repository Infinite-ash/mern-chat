import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";

const LogoutButton = () => {
    const { loading, logout } = useLogout();
    const {setSelectedConversation} = useConversation();
    const {  conversations } = useGetConversations();
    console.log(conversations,"coversations")

    return (
        <div className='mt-[10px]'>
            {!loading ? (
                <div className="flex gap-2 items-center">
                <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
                <img src="/ai.png" onClick={()=>setSelectedConversation(conversations.find(item=>item.fullName == "Ai"))} className="w-[40px] rounded-[50%] cursor-pointer" alt="" />
                </div>
                
            ) : (
                <span className='loading loading-spinner'></span>
            )}
        </div>
    );
};
export default LogoutButton;