//1.区分开发环境和生产环境
// export const BASE_URL = "http://codercba.dev:8000"
// export const BASE_URL = "http://codercba.prod:8000"

let BASE_URL = ''
if (import.meta.env.DEV) {
  BASE_URL = 'http://codercba.dev:8000'
} else {
  BASE_URL = 'http://codercba.prod:8000'
}
console.log(BASE_URL)

export const TIME_OUT = 10000
export { BASE_URL }
