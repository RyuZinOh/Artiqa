import { AtIcon, CameraIcon, CaretDownIcon, CaretRightIcon, LockIcon, UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { updateAvatar, updateEmail, updateFullName, updatePassword } from "./logic";
import { useAuth } from "../../../context/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function SettingRow({icon, title, desc, buttonL, onClick}){
    return(

        <div className="flex items-center justify-between py-4 border-b-3 border-[var(--border)]">
            <div className="flex items-start gap-3">
                <span className="mt-1 text-[var(--color)]">{icon}</span>
           <div className="flex flex-col">
            <span className="font-semibold text-[var(--color)]">{title}</span>
            <span className="font-semibold text-[var(--color)] opacity-70">{desc}</span>
           </div>
            </div>
           <button 
           onClick={onClick}
           className="px-2 py-2 bg-[var(--sbgc)] border-3 border-[var(--border)] cursor-pointer rounded text-[var(--color)] text-lg font-bold hover:bg-[var(--bgc)]">
            {buttonL}
           </button>
        </div>
    )
}

export default function Account(){
    const [expanded, setExpanded] = useState(true);
    const [avatarFile, setAvatarFile] = useState(null);
    const [emailInput, setEmailInput] = useState("");
    const [fnInput, setFnInput] = useState("");
    const [oldPwdInput, setOldPwdInput] = useState("");
    const [newPwdInput, setNewPwdInput] = useState("");
    const {auth, logout, setUserData} = useAuth();
    const navigate = useNavigate();

    const handleAvatarUpdate = async()=>{
        if (!avatarFile) return toast.error("Select a file first");
        try{
            const response = await updateAvatar(avatarFile, auth?.token);
            setUserData(prev => ({
                ...prev,
                user: response.user
            }));

            toast.success("avatar updated succession");
        }catch(erro){
            toast.error(erro.message)
        }
    }; 

    const handleEmailUpdate = async()=>{
        if (!emailInput) return toast.error("Enter a valid email");
        try{
            await updateEmail(emailInput, auth?.token);
            toast.success("Email updated succession");
        }catch(erro){
            toast.error(erro.message)
        }    
    };

    const handleFullNameUpdate = async()=>{
        if (!fnInput) return toast.error("Enter a valid Full Name");
        try{
            await updateFullName(fnInput, auth?.token);
            toast.success("Full name updated succession");
        }catch(erro){
            toast.error(erro.message)
        }
    };
    
    const handlePasswordUdate = async()=>{
        if (!oldPwdInput || !newPwdInput) return toast.error("Enter a passwords plz, old and new both!");
        try{
            await updatePassword(oldPwdInput,newPwdInput, auth?.token);
            setOldPwdInput("");
            setNewPwdInput("");
            logout();
            toast.info("password was updated succession, you have been logged out. login again.")
            navigate("/login");
            
        }catch(erro){
            toast.error(erro.message)
        }
    };
    

    return(
        <div className="w-full px-6 mt-10">
            <div 
            className="flex items-center gap-2 cursor-pointer text-3xl font-bold text-[var(--color)] mb-4"
            onClick={()=>setExpanded(!expanded)}>
            <UserIcon size={32}
            className="text-[var(--color)]"
            weight="bold"
            />
            <span className="text-[var(--color)]">Account Settings</span>
             {expanded ? 
            <CaretDownIcon size={32} weight="bold" className="text-[var(--color)]"/> :
             <CaretRightIcon size={32} weight="bold" className="text-[var(--color)]"/>}
        </div>
        {expanded && (
            <div className="mt-4 flex flex-col gap-4">
            {/* //profile picture  */}
            <div className="flex items-center gap-4">
                <input
                type="file"
                accept="image/*"
                onChange={(e)=> setAvatarFile(e.target.files[0])}
                className="border-3 border-[var(--border)]"
            />
            </div>
            <SettingRow
            icon={<CameraIcon size={22} weight="bold" className="text-[var(--color)"/>}
            title="profile picture"
            desc="Change or update your avatar"
            buttonL="Update Avatar"
            onClick={handleAvatarUpdate}
            />

            
            {/* email  */}
            <div className="flex gap-2 items-center">
                <input
                type="email"
                placeholder="Enter a new email"
                value={emailInput}
                onChange={(e)=> setEmailInput(e.target.value)}
                className="border-3 border-[var(--border)] rounded px-2 py-1 w-full"
                
                />
            </div>
            <SettingRow
            icon={<AtIcon size={22} weight="bold" className="text-[var(--color)"/>}
            title="Email"
            desc="Change or update your email"
            buttonL="Update Email"
            onClick={handleEmailUpdate}
            />

            {/* name  */}
            <div className="flex gap-2 items-center">
                <input
                type="text"
                placeholder="Enter a new Full Name"
                value={fnInput}
                onChange={(e)=> setFnInput(e.target.value)}
                className="border-3 border-[var(--border)] rounded px-2 py-1 w-full"
                
                />
            </div>
            <SettingRow
            icon={<UserIcon size={22} weight="bold" className="text-[var(--color)"/>}
            title="Full Name"
            desc="Change or update your name"
            buttonL="Update Name"
            onClick={handleFullNameUpdate}
            />

            {/* password */}
            <div className="flex flex-col gap-2">
                <input
                type="password"
                placeholder="old password"
                value={oldPwdInput}
                onChange={(e)=> setOldPwdInput(e.target.value)}
                className="border-3 border-[var(--border)] rounded px-2 py-1 w-md"
                />
                <input
                type="password"
                placeholder="new password"
                value={newPwdInput}
                onChange={(e)=> setNewPwdInput(e.target.value)}
                className="border-3 border-[var(--border)] rounded px-2 py-1 w-md"
                />
            </div>
            <SettingRow
            icon={<LockIcon size={22} weight="bold" className="text-[var(--color)"/>}
            title="Password"
            desc="Change or update your password"
            buttonL="Update password"
            onClick={handlePasswordUdate}
            />

            {/* backupfood */}
            </div>
        )}
        </div>
    )
}