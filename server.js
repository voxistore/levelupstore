const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware para parsear JSON e aumentar limite para uploads de imagens base64
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname)));

// Função para ler dados do arquivo JSON
async function readData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Se o arquivo não existir, retorna estrutura vazia
        return { products: {}, categoryImages: {} };
    }
}

// Função para escrever dados no arquivo JSON
async function writeData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Rota para obter todas as alterações (usada pelo script.js)
app.get('/api/get-changes', async (req, res) => {
    const data = await readData();
    res.json(data);
});

// Rota para salvar edição de produto (usada pelo admin.js)
app.post('/api/save-product', async (req, res) => {
    const { id, updates } = req.body;
    if (!id || !updates) {
        return res.status(400).json({ error: 'Dados incompletos' });
    }
    const data = await readData();
    if (!data.products) data.products = {};
    // Atualiza ou cria a entrada do produto
    data.products[id] = { ...data.products[id], ...updates };
    await writeData(data);
    res.json({ message: 'Produto salvo com sucesso!' });
});

// Rota para salvar imagem de categoria (usada pelo admin.js)
app.post('/api/save-category-image', async (req, res) => {
    const { key, image } = req.body;
    if (!key || !image) {
        return res.status(400).json({ error: 'Dados incompletos' });
    }
    const data = await readData();
    if (!data.categoryImages) data.categoryImages = {};
    data.categoryImages[key] = image;
    await writeData(data);
    res.json({ message: 'Imagem da categoria salva!' });
});

// Servir a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor LevelUpStore rodando em http://localhost:${PORT}`);
    console.log(`📁 Pasta do projeto: ${__dirname}`);
});