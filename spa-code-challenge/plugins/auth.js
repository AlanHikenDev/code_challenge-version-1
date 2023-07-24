export default function ({ $auth }) {
    if (!$auth.loggedIn) {
      return undefined
    }
    return $auth
  }
  