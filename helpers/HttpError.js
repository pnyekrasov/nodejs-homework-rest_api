const errorMessageScroll = {
  400: 'Bad Request',
  401: 'Not authorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
}

const HttpError = (status, message = errorMessageScroll[status]) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

module.exports = HttpError;
