export class User {
  username = ''
  email = ''
  password = ''
}

// for api
// const session = ref({
//   user: null as User | null,
//   token: '',
//   message: '',
//   isLoading: false
// })

// export const refSession = () => session

// export const useLogin = () => ({
//   async login(email: string, password: string) {},
//   async logout() {
//     session.value.user = null
//   },
//   async googleLogin() {
//     await loadScript('https://apis.google.com/js/api.js')
//     await loadScript('http://accounts.google.com/gsi/client')

//     const tokenClient = google.accounts.oauth2.initTokentClient({
//       client_id: import meta.env.VITE_GOOGLE_CLIENT_ID,
//       scope: 'email',
//       callback: (response: any) => {
//         if (response.credential) {
//           session.value.token = response.credential
//           google.accounts.oauth2
//         }
//       }
//     })

//   }
