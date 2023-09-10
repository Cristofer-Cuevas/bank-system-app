// ---------- Sign in post ---------- //
export const signInPost = (credentials) => {
    return fetch("http://localhost:3002/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
        }),
    });
};

// ---------- Sign up post ---------- //
export const signUpPost = (credentials) => {
    return fetch("http://localhost:3002/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: credentials.username,
            lastname: credentials.lastname,
            email: credentials.email,
            password: credentials.password,
        }),
    });
};

// ---------- Transaction Post ---------- //

export const transferPost = (id, amount) => {
    let cookieValue;

    if (document.cookie) {
        let cookie = document.cookie.split("; ").find((row) => {
            return row.startsWith("Jwt=");
        });

        if (cookie) {
            cookie = cookie.split("=")[1];
            cookieValue = cookie;
        }
    }

    return fetch("http://localhost:3002/transfer", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",

            Authorization: cookieValue,
        }),
        body: JSON.stringify({
            id: id,
            amount: amount,
        }),
    });
};
