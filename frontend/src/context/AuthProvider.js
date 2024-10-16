import { createContext, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    
    return (
        <AuthContext.Provider value={{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

MyComponent.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default AuthContext;