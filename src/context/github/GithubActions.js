// Get search results
export const searchUsers = async (text) => {
       const params = new URLSearchParams({
        q: text
    })

    const response = await fetch(`https://api.github.com/search/users?${params}`
    // , {
    //     headers: {
    //         Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    //     }
    // }
    )

    const {items} = await response.json()

    return items
}

// Get single user
export const getUser = async (login) => {
    const response = await fetch(`https://api.github.com/users/${login}`)

    if(response.status === 404) {
        window.loacation = '/notfound'
    } else {
        const data = await response.json()

       return data
    }        
}

// Get user repos
export const getUserRepos = async (login) => {
    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    })

    const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`)

    const data = await response.json()

    return data
}