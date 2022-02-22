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