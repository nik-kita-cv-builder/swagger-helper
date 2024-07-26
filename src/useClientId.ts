export const useClientId = () => {
  let clientId = "NONE";

  return {
    get() {
      return clientId;
    },
    set(value: string) {
      clientId = value;
    },
  };
};
