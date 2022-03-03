import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
	box-sizing: border-box;
}

html{
	width: 100%;
	height: 100%;
	
}

body {
	scrollbar-width: none;

	width: 100%;
	height: 100%;
	margin: 0;
		font-family: Montserrat, sans-serif;
	}
	
	body::-webkit-scrollbar {
		width: 0;
}

body::-webkit-scrollbar-track {
	background-color: transparent;
}

body::-webkit-scrollbar-thumb {
	background-color: rgba(255, 255, 255, 0.5);

	border-radius: 0.5rem;
}

#root {
	width: 100%;
	height: 100%;
}

h1 {
	font-size: 2rem;
	margin: 0.67em 0;
}

a {
	 background-color: transparent;
	 text-decoration: none;
}

img {
	width: 100%;
	border-style: none;
}

input {
	border: none;
}

  


button {
background-color: transparent;
border: none;
box-shadow: none;
cursor: pointer;
padding: 0;
}
`;

export default GlobalStyles;
