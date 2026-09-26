const fs = require('fs');

// Ler a lista de produtos do script.js
const script = fs.readFileSync('script.js', 'utf8');
const match = script.match(/const initialProducts = (\[[\s\S]*?\]);/);

if (!match) {
    console.error("Não foi possível encontrar initialProducts no script.js");
    process.exit(1);
}

// Avaliar o array de produtos de forma segura
const produtosRaw = eval(match[1]);

// Mapeia para a estrutura simples usada no admin
const produtosFormatados = produtosRaw.map(p => ({
    id: p.id,
    nome: p.name,
    preco: p.price,
    img: p.image,
    desc: p.description,
    badge: p.badge || '',
    cat: p.category || ''
}));

const produtosJson = JSON.stringify(produtosFormatados, null, 4);

const adminHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LevelUpStore - Painel Admin</title>
<style>
body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a1018; color: #f8fafc; }
.login-container { max-width: 350px; margin: 15vh auto; padding: 40px; background: #151f2b; border-radius: 10px; text-align: center; border: 1px solid #263442; }
input, select, textarea { width: 100%; padding: 10px; margin: 8px 0; background: #0b141e; border: 1px solid #263442; color: white; border-radius: 5px; box-sizing: border-box; font-size: 14px; }
button { width: 100%; padding: 12px; background: #ff6b35; border: none; color: #111; font-weight: bold; cursor: pointer; border-radius: 5px; margin-top: 10px; font-size: 14px; transition: 0.2s; }
button:hover { background: #ff8c5a; }
.hidden { display: none !important; }
.panel { display: flex; height: 100vh; }
.sidebar { width: 340px; background: #151f2b; border-right: 1px solid #263442; display: flex; flex-direction: column; }
.sidebar-header { padding: 15px; border-bottom: 1px solid #263442; }
.sidebar-list { flex: 1; overflow-y: auto; }
.main { flex: 1; padding: 30px 40px; overflow-y: auto; }
.item { padding: 12px 15px; border-bottom: 1px solid #263442; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
.item:hover, .item.active { background: #1c2938; }
.item small { color: #ff6b35; font-weight: bold; }
.form-group { margin-bottom: 15px; }
label { display: block; margin-bottom: 4px; color: #8c9aa8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
textarea { min-height: 80px; }
img.preview { max-width: 200px; height: 140px; object-fit: cover; background: #22303b; margin-bottom: 15px; border-radius: 5px; border: 1px solid #263442; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
</style>
</head>
<body>
<div id="loginScreen" class="login-container">
    <h2>Acesso Administrativo</h2>
    <p style="color: #8c9aa8; font-size: 12px; margin-bottom: 20px;">LevelUpStore Control</p>
    <input type="text" id="user" value="levelupstoreadmin" placeholder="Usuário">
    <input type="password" id="pass" value="@levelupstoreadmin123" placeholder="Senha">
    <button onclick="entrar()">ENTRAR NO PAINEL</button>
    <p id="msg" style="color: #ff6b35; font-size: 12px; margin-top: 10px;"></p>
</div>

<div id="painel" class="panel hidden">
    <div class="sidebar">
        <div class="sidebar-header">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong id="contador">Produtos</strong>
                <a href="index.html" target="_blank" style="color: #ff6b35; font-size: 12px; text-decoration: none;">Ver Loja ↗</a>
            </div>
            <input type="text" id="busca" placeholder="Buscar por nome ou categoria..." oninput="filtrarLista()">
        </div>
        <div id="lista" class="sidebar-list"></div>
    </div>
    <div class="main">
        <h2>Gerenciador de Produtos</h2>
        <div id="editorForm" class="hidden">
            <img id="prevImg" class="preview" src="">
            <div class="grid-2">
                <div class="form-group"><label>ID</label><input id="pId" readonly style="opacity: 0.5;"></div>
                <div class="form-group">
                    <label>Categoria</label>
                    <select id="pCat">
                        <option value="pc">PC Gamer</option>
                        <option value="hardware">Hardware / Monitores</option>
                        <option value="mobile">Celulares (Apple/Samsung/Xiaomi)</option>
                        <option value="audio">Áudio (JBL / AirPods)</option>
                        <option value="wearable">Wearables / Smartwatches</option>
                        <option value="gamer">Cadeiras & Periféricos</option>
                    </select>
                </div>
            </div>

            <div class="grid-2">
                <div class="form-group"><label>Nome do Produto</label><input id="pNome" required></div>
                <div class="form-group"><label>Etiqueta / Badge</label><input id="pBadge" placeholder="Ex: Apple, Novo, Promoção"></div>
            </div>

            <div class="grid-2">
                <div class="form-group"><label>Preço à vista (R$)</label><input id="pPreco" type="number" step="0.01" required></div>
                <div class="form-group"><label>URL da Imagem</label><input id="pImg" oninput="document.getElementById('prevImg').src=this.value"></div>
            </div>

            <div class="form-group"><label>Descrição Curta</label><textarea id="pDesc"></textarea></div>

            <button onclick="salvar()">SALVAR ALTERAÇÕES</button>
            <button onclick="excluir()" style="background: #c0392b; color: white; margin-top: 10px;">EXCLUIR ESTE PRODUTO</button>
        </div>
        <div id="aviso" style="margin-top: 15vh; text-align: center; color: #555;">Selecione um produto na barra lateral para editar.</div>
    </div>
</div>

<script>
const PRODUTOS = \${produtosJson};
let produtosFiltrados = [...PRODUTOS];
let atual = null;

function entrar() {
    const u = document.getElementById('user').value.trim();
    const p = document.getElementById('pass').value.trim();
    if(u === 'levelupstoreadmin' && p === '@levelupstoreadmin123') {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('painel').classList.remove('hidden');
        carregarLista();
    } else {
        document.getElementById('msg').innerText = "Usuário ou senha incorretos";
    }
}

document.getElementById('pass').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') entrar();
});

function carregarLista() {
    document.getElementById('contador').innerText = 'Produtos (' + produtosFiltrados.length + ')';
    const lista = document.getElementById('lista');
    lista.innerHTML = produtosFiltrados.map(p =>
        \`<div class="item \${atual && atual.id === p.id ? 'active' : ''}" onclick="selecionar(\${p.id})">
            <div>
                <div><strong>\${p.nome}</strong></div>
                <div style="font-size: 11px; color: #8c9aa8;">\${p.badge || p.cat}</div>
            </div>
            <small>R$ \${Number(p.preco).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</small>
        </div>\`
    ).join('');
}

function filtrarLista() {
    const termo = document.getElementById('busca').value.toLowerCase();
    produtosFiltrados = PRODUTOS.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        (p.badge && p.badge.toLowerCase().includes(termo)) ||
        (p.cat && p.cat.toLowerCase().includes(termo))
    );
    carregarLista();
}

function selecionar(id) {
    atual = PRODUTOS.find(p => p.id === id);
    if (!atual) return;
    document.getElementById('aviso').classList.add('hidden');
    document.getElementById('editorForm').classList.remove('hidden');
    document.getElementById('pId').value = atual.id;
    document.getElementById('pNome').value = atual.nome;
    document.getElementById('pPreco').value = atual.preco;
    document.getElementById('pImg').value = atual.img;
    document.getElementById('pDesc').value = atual.desc || '';
    document.getElementById('pBadge').value = atual.badge || '';
    document.getElementById('pCat').value = atual.cat || 'pc';
    document.getElementById('prevImg').src = atual.img;
    carregarLista();
}

function salvar() {
    if(atual) {
        atual.nome = document.getElementById('pNome').value;
        atual.preco = Number(document.getElementById('pPreco').value);
        atual.img = document.getElementById('pImg').value;
        atual.desc = document.getElementById('pDesc').value;
        atual.badge = document.getElementById('pBadge').value;
        atual.cat = document.getElementById('pCat').value;
        alert("Produto '" + atual.nome + "' atualizado com sucesso!");
        carregarLista();
    }
}

function excluir() {
    if(confirm("Tem certeza que deseja excluir este produto?")) {
        const index = PRODUTOS.findIndex(p => p.id === atual.id);
        if (index !== -1) {
            PRODUTOS.splice(index, 1);
        }
        atual = null;
        document.getElementById('editorForm').classList.add('hidden');
        document.getElementById('aviso').classList.remove('hidden');
        filtrarLista();
    }
}
<\/script>

</body>
</html>`;

fs.writeFileSync('admin.html', adminHtml, 'utf8');
console.log('admin.html gerado com sucesso com todos os ' + produtosFormatados.length + ' produtos!');