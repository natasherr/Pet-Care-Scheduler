import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
    const [current_user, setCurrentUser] = useState(null);

    console.log("Current user:", current_user);

    // LOGIN
    const login = (email, password) => {
        toast.loading("Logging you in ... ");
        fetch("https://pet-care-scheduler.onrender.com/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email, password
            })
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.access_token) {
                toast.dismiss();
                sessionStorage.setItem("token", response.access_token);
                setAuthToken(response.access_token);

                fetch('https://pet-care-scheduler.onrender.com/current_user', {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${response.access_token}`
                    }
                })
                .then((response) => response.json())
                .then((response) => {
                    if (response.email) {
                        setCurrentUser(response);
                    }
                });

                toast.success("Successfully Logged in");
                navigate("/");
            } else if (response.error) {
                toast.dismiss();
                toast.error(response.error);
            } else {
                toast.dismiss();
                toast.error("Either email/password is incorrect");
            }
        });
    };

    // LOGOUT
    const logout = () => {
        toast.loading("Logging out ... ");
        fetch("https://pet-care-scheduler.onrender.com/logout", {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        })
        .then((resp) => resp.json())
        .then((response) => {
            console.log(response);
            if (response.success) {
                sessionStorage.removeItem("token");
                setAuthToken(null);
                setCurrentUser(null);
                toast.dismiss();
                toast.success("Successfully Logged out");
                navigate("/login");
            }
        });
    };

    // Fetch current user
    useEffect(() => {
        fetchCurrentUser();
    }, []);
    
    const fetchCurrentUser = () => {
        console.log("Current user fcn:", authToken);
        fetch('https://pet-care-scheduler.onrender.com/current_user', {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.email) {
                setCurrentUser(response);
            }
        });
    };

    // Add User
    const addUser = (name, email, password) => {
        toast.loading("Registering ... ");
        fetch("https://pet-care-scheduler.onrender.com/users/add", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name, email, password
            })
        })
        .then((resp) => resp.json())
        .then((response) => {
            console.log(response);
            if (response.message) {
                toast.dismiss();
                toast.success(response.message);
                navigate("/login");
            } else if (response.error) {
                toast.dismiss();
                toast.error(response.error);
            } else {
                toast.dismiss();
                toast.error("Failed to Add User");
            }
        });
    };

    // Update User
    const updateUser = (user_id, updatedData) => {
        console.log("Updating user:", updatedData);
        toast.loading("Updating user...");

        fetch(`https://pet-care-scheduler.onrender.com/users/${user_id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(updatedData)
        })
        .then((resp) => resp.json())
        .then((response) => {
            toast.dismiss();
            if (response.success) {
                setCurrentUser(response.updatedUser);
                toast.success("User updated successfully!");
            } else {
                toast.error(response.error || "Failed to update user.");
            }
        })
        .catch((error) => {
            toast.dismiss();
            toast.error("An error occurred: " + error.message);
        });
    };

    const deleteUser = async (user_id) => {
        console.log("Deleting user:", user_id);
        toast.loading("Deleting user...");
        fetch(`https://pet-care-scheduler.onrender.com/users/${user_id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then((resp) => resp.json())
        .then((response) => {
            toast.dismiss();
            if (response.success) {
                setCurrentUser(null); // Optionally clear current user
                toast.success("User deleted successfully!");
                navigate("/login"); // Redirect after deletion
            } else {
                toast.error(response.error || "Failed to delete user.");
            }
        })
        .catch((error) => {
            toast.dismiss();
            toast.error("An error occurred: " + error.message);
        });
    };

    const data = {
        authToken,
        login,
        logout,
        current_user,
        addUser,
        updateUser,
        deleteUser,
    };

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
};
