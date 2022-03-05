// ---------- Google Sign In Post ---------- //
export const signInPostGoogleIdToken = (id_token) => {
  return fetch("https://pern-bank-system-app.herokuapp.com/google/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_token: id_token,
    }),
  });
};

// ---------- Sign in post ---------- //
export const signInPost = (credentials) => {
  return fetch("https://pern-bank-system-app.herokuapp.com/signin", {
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
  return fetch("https://pern-bank-system-app.herokuapp.com/signup", {
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

// ---------- Google Sign up Post ---------- //

export const signUpPostGoogleIdToken = (id_token) => {
  return fetch("https://pern-bank-system-app.herokuapp.com/google/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_token: id_token,
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

  return fetch("https://pern-bank-system-app.herokuapp.com/transfer", {
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
