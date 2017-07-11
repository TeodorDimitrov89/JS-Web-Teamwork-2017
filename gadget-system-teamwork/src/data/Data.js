import Auth from '../components/users/Auth'
const baseUrl = 'http://localhost:4000'
const getOptions = () => ({
  mode: 'cors',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
const handleJsonResponse = res => res.json()
const applyAuthorizationHeader = (options, authenticated) => {
  if (authenticated) {
    options.headers.Authorization = `bearer ${Auth.getToken()}`
  }
}
class Data {
  static get (url, authenticated) {
    let options = getOptions()
    options.method = 'GET'
    applyAuthorizationHeader(options, authenticated)
    return window.fetch(`${baseUrl}/${url}`, options)
        .then(handleJsonResponse)
  }
  static post (url, data, authenticated) {
    let options = getOptions()
    options.method = 'POST'
    options.body = JSON.stringify(data)

    applyAuthorizationHeader(options, authenticated)

    return window.fetch(`${baseUrl}/${url}`, options)
        .then(handleJsonResponse)
  }
}

export default Data
