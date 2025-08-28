const express = require('express');
const path = require('path');
const app = express();

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public_html')));

// Default route to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public_html', 'Task6-2C.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
