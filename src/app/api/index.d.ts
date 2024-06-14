/**
 * AxiosRequestConfig служит для обработки различных конфигураций HTTP-запросов Axios.
 * Представляет собой условный тип, который проверяет, определены ли дополнительные параметры (Params). Если параметры не определены, берется стандартный 'config'.
 * В противном случае определяются свойства 'params' и 'config'.
 */

type AxiosRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { params: Params; config?: import('axios').AxiosRequestConfig };