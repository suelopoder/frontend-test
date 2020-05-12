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
  deleteDoc: async docName => {
    const body = { name: docName };
    return await fetch('/api', {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export default API;
