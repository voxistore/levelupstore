// --- CONFIGURAÇÃO SUPABASE (NUVEM) ---
const SUPABASE_URL = 'https://tylrkakismpicnpzjiks.supabase.co';
const SUPABASE_KEY = 'sb_publishable_EYEc-ZTzObs27HrBJ_kdFg_xhEY9bHc';

// Inicializa o cliente usando a biblioteca global carregada no HTML
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Lista original de produtos (fallback caso o banco esteja vazio)
const products = [
  { id: 1, category: 'pc', badge: 'Mais vendido', name: 'PC Completo LevelUp Start', detail: 'Ryzen 5 5600G · 16GB · SSD 480GB', description: 'Kit pronto para jogar em Full HD com monitor, teclado e mouse.', price: 2899, image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=700&q=80' },
  // ... (o restante da sua lista original continua aqui) ...
];

// Função principal para carregar dados da nuvem
async function initStore() {
  try {
    // Busca edições salvas no painel admin
    const { data: edits, error } = await supabaseClient.from('products_edits').select('*');

    if (error) throw error;

    if (edits && edits.length > 0) {
      console.log('Carregando dados da nuvem...');
      edits.forEach(edit => {
        const productIndex = products.findIndex(p => p.id === edit.id);
        if (productIndex !== -1) {
          // Atualiza o produto local com os dados do banco
          Object.assign(products[productIndex], edit);
        }
      });
    }
  } catch (err) {
    console.warn('Usando dados locais (Supabase não configurado ou offline):', err);
  }

  window.levelUpProducts = products;
  renderProducts();
  renderCart();
  applyCategoryImages();
}

// ... (Mantenha todas as suas funções de renderização, carrinho e filtros aqui) ...
// Certifique-se de chamar initStore() no final do arquivo ou onde o DOM estiver pronto.
initStore();