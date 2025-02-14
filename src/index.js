import './styles/styles.scss';

const handleFormSubmit = async (event) => {
  event.preventDefault();
  
  const url = document.getElementById('urlInput').value;
  if (!url) {
    alert('يرجى إدخال رابط');
    return;
  }

  try {
    const response = await fetch('/process-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    
    const data = await response.json();
    
    document.getElementById('sentiment').textContent = data.sentiment;
    document.getElementById('contentType').textContent = data.contentType;
    document.getElementById('textPreview').textContent = data.textPreview;
  } catch (error) {
    console.error('حدث خطأ:', error);
    alert('حدث خطأ أثناء معالجة الرابط');
  }
};

document.getElementById('urlForm').addEventListener('submit', handleFormSubmit);
