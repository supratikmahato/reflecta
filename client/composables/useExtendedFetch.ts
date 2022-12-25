const config = useRuntimeConfig();

export const useExtendedFetch = $fetch.create({
  baseURL: config.baseUrl,
});
