import fetch from 'isomorphic-fetch'


const serverUrl = 'http://localhost:2900';
export const loginUrl = serverUrl + '/login';
export const registerUrl = serverUrl + '/register';


let auth = {
    
    login (username, password) {
        //if (auth.loggedIn()) return Promise.resolve(true)
    
         var req = {
            method: "POST",
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };

        console.log(req);

        return fetch(loginUrl, req)
            .then(function(response) {
                console.log(response);
                return response.json(response)
            }).then(function(json) {
                console.log('parsed json', json)
                return Promise.resolve(true);
            }).catch(function(ex) {
                console.log('parsing failed', ex)
                return Promise.reject();
            }); 
    },

    register (username, password, email) {
        var req = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password, email: email })
        };

        return fetch(registerUrl, req)
        .then(function(response) {
                console.log(response);
                return response.json(response)
        }).then(function(json) {
            console.log('parsed json', json)
            return Promise.resolve(true);
        }).catch(function(ex) {
            console.log('parsing failed', ex)
            return Promise.reject();
        }); 

        // return fetch(registerUrl,
        // {
        //     method: "POST",
        //     mode: 'no-cors',
        //     body: { username: username, password: password, email: email } 
        // }).then(response => {
        //     console.log(response);
        //         let respBool = response.success === true;
        //         if(respBool) {
        //             console.log("registered");
        //             return Promise.resolve(true);
        //         } else {
        //             return Promise.reject();
        //         }
        // }).catch(ex => {
        //     console.log('er   ' +ex);
        // });
    },

    loggedIn () {
        return !!localStorage.token
    },

    onChange () {}
}

export default auth