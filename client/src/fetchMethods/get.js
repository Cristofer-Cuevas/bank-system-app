export const verify = (params) => {
    return fetch(`https://bank-app-vhlm.onrender.com/verify/${params}`);
};

export const getUsers = () => {
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

    return fetch("https://bank-app-vhlm.onrender.com/users", {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: cookieValue,
        }),
    });
};

export const getAuth = () => {
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

    return fetch("https://bank-app-vhlm.onrender.com/get-auth", {
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: cookieValue,
        }),
    });
};
