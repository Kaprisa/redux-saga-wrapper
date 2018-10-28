export default moduleName => (type, payload) => ({
  type: `${moduleName}/${type}`,
  payload,
});
