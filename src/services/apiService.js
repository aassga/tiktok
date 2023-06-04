import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/',
  withCredentials: false,
  timeout: 20000
})

function _setHeader(headers) {
  const axiosCommon = axiosInstance.defaults.headers.common || {}
  axiosInstance.defaults.headers.common = Object.assign(axiosCommon, headers)
}

function _addIden() {
  const timestamp = Date.parse(new Date())

  const idParams = {}
  idParams['timestamp'] = timestamp
  return idParams
}

axiosInstance.interceptors.request.use(
  config => config,
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('[AxiosError]', error)
    return Promise.reject(error)
  }
)

const handleRes = ({ type, url, data }) => {
  return data
}

export async function post(url, params, options = {}) {
  try {
    _setHeader(_addIden())
    const res = await axiosInstance.post(url, params)
    return handleRes({
      type: 'post',
      url,
      data: res.data
    })
  } catch (err) {
    console.warn(err)
    err.message = '網路異常'
    return err
  }
}

export async function get(url, params, options = {}) {
  try {
    _setHeader(_addIden())
    const res = await axiosInstance.get(url, { params })
    return handleRes({
      type: 'get',
      url,
      data: res.data
    })
  } catch (err) {
    console.warn(err)
    err.message = '網路異常'
    return err
  }
}
