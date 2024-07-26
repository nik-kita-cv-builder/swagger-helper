let clientId = "NONE";
export const useClientId = () => {
  return {
    get() {
      return clientId;
    },
    set(value: string) {
      clientId = value;
    },
  };
};
