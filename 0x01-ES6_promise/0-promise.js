function getResponseFromAPI() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = true;
      resolve(response);
    }, 1000); // Simulating a delay of 1 second
  });
}

export default getResponseFromAPI;
