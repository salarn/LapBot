import credential from '../utils/auth0Credential'
import Auth0 from 'react-native-auth0'

let auth0 = new Auth0(credential)

export default auth0