const express = require('express');
const path = require('path');
const app = express();

const distDir = path.join(__dirname, '../client/dist/your-angular-project');
app.use(express.static(distDir));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));