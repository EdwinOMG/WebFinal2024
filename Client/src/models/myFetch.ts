const API_URL = 'http://localhost:3000/api/v1/'

export function rest<T>(url: string, data?: any, method?: string): Promise<T> {
  return fetch(url, {
    method: method ?? (data ? 'POST' : 'GET'),
    headers: {
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : undefined
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)
    }
    return res.json()
  })
}

export function api<T>(url: string, data?: any, method?: string): Promise<T> {
  return rest<T>(API_URL + url, data, method)
}

// for api
// // creates a html script tag, calls loadscript and create a promise that will return the script when done loading.
// //resolve and reject are parameters of the promise function to set it up
// // if done loading call reslve, and append it( add it to last ) to the script
// export async function loadScript(url: string): Promise<void> {
//   return new Promise((resolve, reject) => {
//     if (document.querySelector(`script[src="${url}"]`)) {
//       resolve()
//       return
//     }
//     const script = document.createElement('script')
//     script.src = url
//     script.onload = () => resolve()
//     script.onerror = (err) => reject(err)
//     document.head.appendChild(script)
//   })
// }
