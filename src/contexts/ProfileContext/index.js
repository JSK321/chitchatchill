import React, { useContext, useState } from 'react'
import API from '../../utils/API'

const ProfileContext = React.createContext()
const ProfileData = React.createContext()

export function useProfile() {
    return useContext(ProfileContext)
}

export function useProfileData() {
    return useContext(ProfileData)
}

export function ProfileProvider({ children }) {
    const [profileState, setProfileState] = useState({
        name: "",
        accountName: "",
        email: "",
        password: "",
        profileImage: "",
        token: "",
        id: "",
        isLoggedIn: false
    });

    function fetchProfileData() {
        const token = localStorage.getItem("token");
        if (localStorage.getItem('token') !== null) {
            API.getProfile(token).then(profileData => {
                if (profileData) {
                    setProfileState({
                        name: profileData.name,
                        accountName: profileData.accountName,
                        email: profileData.email,
                        profileImage: profileData.profileImage,
                        token: token,
                        id: profileData.id,
                        isLoggedIn: true
                    });
                } else {
                    setProfileState({
                        name: "",
                        accountName: "",
                        email: "",
                        password: "",
                        profileImage: "",
                        token: "",
                        id: "",
                        isLoggedIn: false
                    })
                }
            });
        };
    }

    return (
        <ProfileContext.Provider value={profileState}>
            <ProfileData.Provider value={fetchProfileData}>
                {children}
            </ProfileData.Provider>
        </ProfileContext.Provider>
    )
}
