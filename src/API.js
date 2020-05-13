const API = {
  getDocs: async query => {
    const result = await fetch(`./api?query=${query}`);
    return await result.json();
  },
  uploadDoc: async file => {
    const formData = new FormData();
    formData.append('file', file);
    return await fetch('/api', { method: 'POST', body: formData });
  },
  deleteDoc: async id => {
    return await fetch(`/api/${id}`, { method: 'DELETE' });
  }
}

export default API;
