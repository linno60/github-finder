import { createContext, useState } from 'react';

const GithubContext = createContext()

export const GithubProvider = ({children}) => {
    const [users, setUsers] = useState([])
    const [loading, setLaoding] = useState(true)
 
    const fetchUsers = async () => {
        const response = await fetch(`https://api.github.com/users`
        // , {
        //     headers: {
        //         Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        //     }
        // }
        )

        const data = await response.json()

        setUsers(data)
        setLaoding(false)
    }

    return <GithubContext.Provider value={{
        users,
        loading,
        fetchUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext