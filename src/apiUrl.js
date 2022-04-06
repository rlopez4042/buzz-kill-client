let apiUrl

// check if development 
if (window.location.hostname === 'localhost') {
  apiUrl = 'http://localhost:4000' 
} else {
  apiUrl = 'https://infinite-gorge-81026.herokuapp.com/'
}

// export api url
export default apiUrl