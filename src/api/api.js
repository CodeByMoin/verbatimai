export const processAudio = async (file) => {
  const formData = new FormData();
  formData.append('audio', file);
  
  const response = await fetch('https://verbatimai-server.onrender.com/api/upload', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Audio processing failed');
  }
  
  return await response.json();
};

export const summarizeText = async (transcript) => {
  const response = await fetch('https://verbatimai-server.onrender.com/api/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ transcript }),
  });
  
  if (!response.ok) {
    throw new Error('Summarization failed');
  }
  
  return await response.json();
};