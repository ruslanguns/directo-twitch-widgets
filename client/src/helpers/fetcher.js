/**
 * Helper function to make ajax requests
 */
export const fetcher = async (...args) => {
  return fetch(...args).then((res) => res.json());
};
