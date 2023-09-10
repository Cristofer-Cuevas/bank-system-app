export const verify = (params) => {
    return fetch(`http://localhost:3002/verify/${params}`);
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

    return fetch("http://localhost:3002/users", {
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

    return fetch("http://localhost:3002/get-auth", {
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: cookieValue,
        }),
    });
};
