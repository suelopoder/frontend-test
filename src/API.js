const customFetch = async (...args) => {
  const result = await fetch(...args);
  if (result.ok) {
    return result;
  }
  const response = await result.json();
  return Promise.reject(response.error);
}

const API = {
  getDocs: async query => {
    const result = await customFetch(`./api?query=${query}`);
    return await result.json();
  },
  uploadDoc: async file => {
    const formData = new FormData();
    formData.append('file', file);
    await customFetch('/api', { method: 'POST', body: formData });
  },
  deleteDoc: async id => {
    return await customFetch(`/api/${id}`, { method: 'DELETE' });
  }
}

export default API;
