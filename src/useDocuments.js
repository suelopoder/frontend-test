import { useState, useEffect } from 'react';
import API from './API';

export default function useDocuments() {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchDocs() {
      setLoading(true);
      setError(null);
      try {
        const data = await API.getDocs(searchQuery);
        setDocs(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
    fetchDocs();
  }, [searchQuery]);

  const uploadDoc = async file => {
    setLoading(true);
    setError(null);
    try {
      await API.uploadDoc(file);
      const data = await API.getDocs(searchQuery);
      setDocs(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  const deleteDoc = async document => {
    setLoading(true);
    setError(null);
    try {
      await API.deleteDoc(document.name);
      const data = await API.getDocs(searchQuery);
      setDocs(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return [
    { docs, error, loading, searchQuery },
    { searchDocs: setSearchQuery, uploadDoc, deleteDoc }
  ];
}