import Auth from '../components/users/Auth'

const baseUrl = 'http://localhost:5000'

const getOptions = () => ({
  mode: 'cors', // this indicates that request is sent to an external server.
                    // react url: http://localhost:3000
                    // server url: http://localhost:5000
                    // Otherwise SERVER DOES NOT EXECUTE THE QUERIES
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

    return window.fetch(
      `${baseUrl}${url}`,
      options)
      .then(handleJsonResponse)
  }

  static post (url, data, authenticated) {
    let options = getOptions()
    options.method = 'POST'
    options.body = JSON.stringify(data)

    applyAuthorizationHeader(options, authenticated)

    return window.fetch(      // fetch works only for Chrome and Firefox.
        `${baseUrl}${url}`,    // fetch polyfill is necessary when operating with other browsers is necessary!!!
        options)
      .then(handleJsonResponse)
  }
}

export default Data
