export const userKey = '__pixelart_user'
export const baseApiUrl = 'http://192.168.0.106:3000'


export function showError(e) {
    if(e && e.response && e.response.data) {
        window.alert(e.response.data)
    } else if(typeof e === 'string') {
        window.alert(e.response.data)
    }
}

export default { baseApiUrl, showError, userKey }