import fetch from 'isomorphic-fetch'

let auth = {
    
    login (username, password) {
        if (auth.loggedIn()) return Promise.resolve(true)
    
        return fetch("http://localhost:2900/login", 
            {
                method: "POST",
                body: {username: username, password: password}
            }).then(response =>{
                let respBool = response.message === "ok";
                if(respBool) {
                    localStorage.token = response.token;
                    return Promise.resolve(true);
                } else {
                    return Promise.reject();
                }
            }); 
    },

    register (username, password) {
        return fetch("http://localhost:2900/register",
        {
           method: "POST",
            body: { username: username, password: password } 
        }).then(response =>{
                let respBool = response.message == "ok";
                if(respBool) {
                    return Promise.resolve(true);
                } else {
                    return Promise.reject();
                }
            });
    },

    loggedIn () {
        return !!localStorage.token
    },

    onChange () {}
}

export default auth