//src/utils/httpStatusHandler.js
export const handleHttpStatus = (error, store) => {
  if (!error.response) {
    store.getState().showSnackbar(
      "Network error. Please check your connection.",
      "error"
    );
    return Promise.reject(error);
  }

  const { status, data } = error.response;

  if (import.meta.env.DEV) {
    console.error("HTTP Error:", status, data);
  }

  switch (true) {
    case status === 400:
      store.getState().showSnackbar(
        data?.message || "Invalid request.",
        "warning"
      );
      break;

    case status === 403:
      store.getState().showSnackbar(
        "You are not authorized to perform this action.",
        "error"
      );
      break;

    case status === 404:
      store.getState().showSnackbar(
        "Requested resource not found.",
        "warning"
      );
      break;

    case status >= 500:
      store.getState().showSnackbar(
        "Server error. Please try again later.",
        "error"
      );
      break;

    default:
      store.getState().showSnackbar(
        "Unexpected error occurred.",
        "error"
      );
  }

  return Promise.reject(error);
};