// Configuração do Supabase para persistência na nuvem (Vercel)
const SUPABASE_URL = 'https://tylrkakismpicnpzjiks.supabase.co';
const SUPABASE_KEY = 'sb_publishable_EYEc-ZTzObs27HrBJ_kdFg_xhEY9bHc';

// Inicializa o cliente Supabase de forma segura
let supabaseClient = null;
if (typeof window !== 'undefined' && window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} else {
  console.warn('Biblioteca Supabase não carregada via CDN.');
}

const loginView = document.querySelector('#loginView');
const adminView = document.querySelector('#adminView');
const loginForm = document.querySelector('#loginForm');
const loginError = document.querySelector('#loginError');
let selectedProduct = null;
let activeAdminFilter = 'all';

// Carrega produtos do Supabase ou usa lista local como fallback inicial
let adminProducts = window.levelUpProducts || [];

const categoryMedia = [
  { key: 'pc', name: 'PC Gamer' },
  { key: 'apple', name: 'Apple' },
  { key: 'samsung', name: 'Samsung' },
  { key: 'xbox', name: 'Xbox' },
  { key: 'playstation', name: 'PlayStation' },
  { key: 'jbl', name: 'JBL' },
  { key: 'xiaomi', name: 'Xiaomi' },
  { key: 'razer', name: 'Razer' },
  { key: 'chair', name: 'Cadeira Gamer' }
];

async function loadProductsFromDB() {
  if (!supabaseClient) return;

  try {
    const { data, error } = await supabaseClient.from('products_edits').select('*');
    if (error) {
      console.error('Erro ao carregar produtos do Supabase:', error.message);
      return;
    }

    // Mescla os dados do DB com a lista original
    if (data) {
      data.forEach(edit => {
        const product = adminProducts.find(p => p.id === edit.id);
        if (product) Object.assign(product, edit);
      });
    }
  } catch (err) {
    console.error('Falha na conexão com Supabase:', err);
  }
  renderProductList();
}

function showAdmin() {
  loginView.classList.add('hidden');
  adminView.classList.remove('hidden');
  loadProductsFromDB();
}

function showLogin() {
  adminView.classList.add('hidden');
  loginView.classList.remove('hidden');
}

async function saveProductToDB(id, updates) {
  if (!supabaseClient) return false;

  try {
    const { error } = await supabaseClient.from('products_edits').upsert({ id, ...updates });
    if (error) {
      console.error('Erro ao salvar:', error);
      return false;
    }
    return true;
  } catch (e) {
    console.error('Erro de rede ao salvar:', e);
    return false;
  }
}

function renderProductList() {
  const query = document.querySelector('#productSearch').value.toLowerCase();
  const list = document.querySelector('#productList');
  const visible = adminProducts.filter(product => matchesAdminFilter(product, activeAdminFilter) && `${product.name} ${product.badge} ${product.detail}`.toLowerCase().includes(query));

  document.querySelector('#productTotal').textContent = `${visible.length} produtos`;
  list.innerHTML = visible.map(product => `
    <button class="product-row ${selectedProduct?.id === product.id ? 'selected' : ''}" data-product-id="${product.id}">
      <img src="${product.image}" alt="" />
      <span><b>${product.name}</b><small>${product.badge} · ${adminMoney(product.price)}</small></span>
      <i>›</i>
    </button>`).join('');

  list.querySelectorAll('[data-product-id]').forEach(button =>
    button.addEventListener('click', () => selectProduct(Number(button.dataset.productId)))
  );
}

function matchesAdminFilter(product, filter) {
  if (filter === 'all') return true;
  if (product.adminCategory) return product.adminCategory === filter;
  if (filter === 'apple') return product.badge.startsWith('Apple') || /iPhone|AirPods|MacBook|Apple Watch/.test(product.name);
  if (filter === 'samsung') return product.badge === 'Samsung';
  if (filter === 'xbox') return product.badge === 'Xbox';
  if (filter === 'playstation') return product.badge === 'PlayStation';
  if (filter === 'jbl') return product.badge === 'JBL';
  if (filter === 'xiaomi') return product.badge === 'Xiaomi';
  if (filter === 'razer') return product.badge === 'Razer';
  if (filter === 'chair') return product.name.startsWith('Cadeira Gamer');
  return product.category === filter;
}

function getProductAdminCategory(product) {
  if (product.adminCategory) return product.adminCategory;
  if (product.badge.startsWith('Apple') || /iPhone|AirPods|MacBook|Apple Watch/.test(product.name)) return 'apple';
  if (product.badge === 'Samsung') return 'samsung';
  if (product.badge === 'Xbox') return 'xbox';
  if (product.badge === 'PlayStation') return 'playstation';
  if (product.badge === 'JBL') return 'jbl';
  if (product.badge === 'Xiaomi') return 'xiaomi';
  if (product.badge === 'Razer') return 'razer';
  if (product.name.startsWith('Cadeira Gamer')) return 'chair';
  return product.category;
}

function adminMoney(value) { return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }

async function deleteProduct(id) {
  if (!confirm('Tem certeza que deseja excluir este produto?')) return;

  try {
    if (supabaseClient) {
      const { error } = await supabaseClient.from('products_edits').delete().eq('id', id);
      if (error) throw error;
    }

    // Remove da lista local
    const index = adminProducts.findIndex(p => p.id === id);
    if (index !== -1) adminProducts.splice(index, 1);

    // Atualiza a interface
    selectedProduct = null;
    document.querySelector('#emptyEditor').classList.remove('hidden');
    document.querySelector('#productForm').classList.add('hidden');
    document.querySelector('#saveMessage').textContent = 'Produto excluído com sucesso!';
    renderProductList();
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    document.querySelector('#saveMessage').textContent = 'Erro ao excluir produto. Tente novamente.';
  }
}

async function deleteCategoryImage(key) {
  if (!confirm(`Tem certeza que deseja remover a imagem da categoria ${key}?`)) return;

  try {
    if (supabaseClient) {
      const { error } = await supabaseClient.from('category_images').delete().eq('key', key);
      if (error) throw error;
    }

    // Remove do localStorage
    const images = JSON.parse(localStorage.getItem('levelup-category-images') || '{}');
    delete images[key];
    localStorage.setItem('levelup-category-images', JSON.stringify(images));

    // Atualiza a interface
    renderCategoryMedia();
    return true;
  } catch (error) {
    console.error('Erro ao excluir imagem de categoria:', error);
    return false;
  }
}

function selectProduct(id) {
  selectedProduct = adminProducts.find(product => product.id === id);
  if (!selectedProduct) return;

  document.querySelector('#emptyEditor').classList.add('hidden');
  document.querySelector('#productForm').classList.remove('hidden');
  document.querySelector('#editingId').textContent = `#${selectedProduct.id}`;
  document.querySelector('#editingName').textContent = selectedProduct.name;
  document.querySelector('#productName').value = selectedProduct.name;
  document.querySelector('#productCategory').value = getProductAdminCategory(selectedProduct);
  document.querySelector('#productBadge').value = selectedProduct.badge;
  document.querySelector('#productDetail').value = selectedProduct.detail;
  document.querySelector('#productDescription').value = selectedProduct.description;
  document.querySelector('#productPrice').value = selectedProduct.price;
  document.querySelector('#productImage').value = selectedProduct.image || '';
  document.querySelector('#imagePreview').src = selectedProduct.image || '';
  document.querySelector('#saveMessage').textContent = '';
  renderProductList();
}

document.querySelector('#productSearch').addEventListener('input', renderProductList);
document.querySelector('#productImageFile').addEventListener('change', event => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    document.querySelector('#productImage').value = reader.result;
    document.querySelector('#imagePreview').src = reader.result;
  });
  reader.readAsDataURL(file);
});
document.querySelector('#productImage').addEventListener('input', event => {
  document.querySelector('#imagePreview').src = event.target.value;
});

// Lógica de Login Corrigida
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const user = document.querySelector('#loginUser').value.trim();
  const password = document.querySelector('#loginPassword').value;

  if (user === 'levelupstoreadmin' && password === '@levelupstoreadmin123') {
    sessionStorage.setItem('levelup-admin-auth', 'true');
    showAdmin();
  } else {
    loginError.textContent = 'Usuário ou senha inválidos.';
  }

  return false;
});

document.querySelector('#logoutButton').addEventListener('click', () => {
  sessionStorage.removeItem('levelup-admin-auth');
  showLogin();
});

document.querySelector('#productForm').addEventListener('submit', async event => {
  event.preventDefault();
  if (!selectedProduct) return;

  const updated = {
    name: document.querySelector('#productName').value.trim(),
    category: document.querySelector('#productCategory').value,
    adminCategory: document.querySelector('#productCategory').value,
    badge: document.querySelector('#productBadge').value.trim(),
    detail: document.querySelector('#productDetail').value.trim(),
    description: document.querySelector('#productDescription').value.trim(),
    price: Number(document.querySelector('#productPrice').value),
    image: document.querySelector('#productImage').value.trim()
  };

  Object.assign(selectedProduct, updated);

  const saveMsg = document.querySelector('#saveMessage');
  saveMsg.textContent = 'Salvando...';

  const success = await saveProductToDB(selectedProduct.id, updated);

  if (success) {
    saveMsg.style.color = '#74dc95';
    saveMsg.textContent = 'Salvo com sucesso! Visível para todos.';
  } else {
    saveMsg.style.color = '#ffca45';
    saveMsg.textContent = 'Salvo localmente (Supabase indisponível).';
  }
  renderProductList();
});

document.querySelector('#deleteProduct')?.addEventListener('click', () => {
  if (!selectedProduct) return;
  deleteProduct(selectedProduct.id);
});

// Verifica autenticação ao carregar
if (sessionStorage.getItem('levelup-admin-auth') === 'true') {
  showAdmin();
}