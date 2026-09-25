const SUPABASE_URL = 'https://tylrkakismpicnpzjiks.supabase.co';
const SUPABASE_KEY = 'sb_publishable_EYEc-ZTzObs27HrBJ_kdFg_xhEY9bHc';

const supabaseClient = (typeof window !== 'undefined' && window.supabase)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

const initialProducts = [
  { id: 1, category: 'pc', badge: 'Mais vendido', name: 'PC Completo LevelUp Start', detail: 'Ryzen 5 5600G · 16GB · SSD 480GB', description: 'Kit pronto para jogar em Full HD com monitor, teclado e mouse.', price: 2899, image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=700&q=80' },
  { id: 2, category: 'pc', badge: 'Equilíbrio perfeito', name: 'PC Completo LevelUp RTX', detail: 'Ryzen 5 5600 · RTX 4060 · 16GB · SSD 1TB', description: 'Desempenho forte para jogos competitivos e criação de conteúdo.', price: 5499, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=700&q=80' },
  { id: 3, category: 'pc', badge: 'Novo', name: 'PC Completo LevelUp Creator', detail: 'Ryzen 7 7700 · RTX 4070 · 32GB · SSD 1TB', description: 'Potência para jogar, editar e fazer streaming sem travar.', price: 8299, image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?auto=format&fit=crop&w=700&q=80' },
  { id: 4, category: 'pc', badge: 'Ultra performance', name: 'PC Completo LevelUp Extreme', detail: 'Ryzen 9 7950X · RTX 4080 · 64GB · SSD 2TB', description: 'A experiência definitiva em 4K, ray tracing e alta taxa de quadros.', price: 14999, image: 'https://images.unsplash.com/photo-1587202372162-1f2e9abf2f2f?auto=format&fit=crop&w=700&q=80' },
  { id: 5, category: 'hardware', badge: 'NVIDIA', name: 'GeForce RTX 4060 8GB', detail: 'NVIDIA · GDDR6 · DLSS 3 · Ray Tracing', description: 'Placa eficiente para jogar em Full HD com gráficos no alto.', price: 1999, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=700&q=80' },
  { id: 6, category: 'hardware', badge: 'AMD Ryzen', name: 'Ryzen 7 7800X3D', detail: 'AMD · 8 núcleos · 16 threads · AM5', description: 'Processador gamer de alta performance para taxas de FPS elevadas.', price: 2499, image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=700&q=80' },
  { id: 7, category: 'hardware', badge: 'LG UltraGear', name: 'Monitor Gamer 27” QHD', detail: '165Hz · 1ms · IPS · HDR10', description: 'Tela QHD com fluidez e cores precisas para competir melhor.', price: 1799, image: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&w=700&q=80' },
  { id: 8, category: 'hardware', badge: 'Samsung', name: 'Monitor Odyssey 27”', detail: 'Samsung · Full HD · 180Hz · 1ms', description: 'Imersão curva e resposta rápida para sua estação de jogos.', price: 1399, image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=700&q=80' },
  { id: 9, category: 'mobile', badge: 'Apple · Linha 13', name: 'iPhone 13 128GB', detail: 'Apple · 6.1” Super Retina · Câmera dupla · 5G', description: 'O clássico com chip A15 Bionic, câmera avançada e ótima autonomia.', price: 3199, image: 'https://images.unsplash.com/photo-1592286927505-2fd0c7f2f2f9?auto=format&fit=crop&w=700&q=80' },
  { id: 10, category: 'mobile', badge: 'Apple · Linha 13', name: 'iPhone 13 Pro 128GB', detail: 'Apple · 6.1” ProMotion · Câmera tripla · 5G', description: 'Tela de 120Hz e conjunto de câmeras Pro para fotos e vídeos.', price: 3999, image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=700&q=80' },
  { id: 11, category: 'mobile', badge: 'Apple · Linha 13', name: 'iPhone 13 Pro Max 256GB', detail: 'Apple · 6.7” ProMotion · A15 Bionic · 5G', description: 'A maior tela da geração 13 com bateria para o dia inteiro.', price: 4599, image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=700&q=80' },
  { id: 12, category: 'mobile', badge: 'Apple · Linha 14', name: 'iPhone 14 128GB', detail: 'Apple · 6.1” OLED · Câmera dupla · 5G', description: 'Mais segurança, câmera melhorada e desempenho consistente para todos os dias.', price: 3499, image: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&w=700&q=80' },
  { id: 13, category: 'mobile', badge: 'Apple · Linha 14', name: 'iPhone 14 Plus 128GB', detail: 'Apple · 6.7” OLED · Bateria ampliada · 5G', description: 'Tela grande e excelente autonomia em um design leve e elegante.', price: 3899, image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=700&q=80' },
  { id: 14, category: 'mobile', badge: 'Apple · Linha 14', name: 'iPhone 14 Pro 128GB', detail: 'Apple · 6.1” Dynamic Island · 48MP · 5G', description: 'Acabamento premium, tela sempre ativa e câmera principal de 48MP.', price: 4899, image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=700&q=80' },
  { id: 15, category: 'mobile', badge: 'Apple · Linha 14', name: 'iPhone 14 Pro Max 256GB', detail: 'Apple · 6.7” ProMotion · 48MP · A16 Bionic', description: 'A experiência Pro máxima da geração 14 em uma tela imersiva.', price: 5599, image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80' },
  { id: 16, category: 'mobile', badge: 'Apple · Linha 15', name: 'iPhone 15 128GB', detail: 'Apple · 6.1” Dynamic Island · 48MP · USB-C', description: 'Design renovado, câmera de 48MP e conexão USB-C para o dia a dia.', price: 4299, image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=700&q=80' },
  { id: 17, category: 'mobile', badge: 'Apple · Linha 15', name: 'iPhone 15 Plus 128GB', detail: 'Apple · 6.7” OLED · 48MP · USB-C', description: 'Mais tela e bateria para assistir, criar e trabalhar com conforto.', price: 4699, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80' },
  { id: 18, category: 'mobile', badge: 'Apple · Linha 15', name: 'iPhone 15 Pro 128GB', detail: 'Apple · Titânio · A17 Pro · USB-C · 48MP', description: 'Titânio, chip A17 Pro e controles profissionais para criação.', price: 5799, image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=700&q=80' },
  { id: 19, category: 'mobile', badge: 'Apple · Linha 15', name: 'iPhone 15 Pro Max 256GB', detail: 'Apple · Titânio · A17 Pro · Zoom 5x · USB-C', description: 'O topo da geração com zoom óptico de 5x e bateria de longa duração.', price: 6899, image: 'https://images.unsplash.com/photo-1551817958-d9d86fb29431?auto=format&fit=crop&w=700&q=80' },
  { id: 20, category: 'mobile', badge: 'Apple · Linha 16', name: 'iPhone 16 128GB', detail: 'Apple · A18 · Controle de câmera · 48MP', description: 'Nova geração de desempenho com câmera versátil e bateria eficiente.', price: 4999, image: 'https://images.unsplash.com/photo-1603891128711-11b4b03bb138?auto=format&fit=crop&w=700&q=80' },
  { id: 21, category: 'mobile', badge: 'Apple · Linha 16', name: 'iPhone 16 Plus 128GB', detail: 'Apple · 6.7” · A18 · 48MP · USB-C', description: 'Tela ampla, potência A18 e autonomia para acompanhar sua rotina.', price: 5499, image: 'https://images.unsplash.com/photo-1551721434-8b94ddff0f56?auto=format&fit=crop&w=700&q=80' },
  { id: 22, category: 'mobile', badge: 'Apple · Linha 16', name: 'iPhone 16 Pro 128GB', detail: 'Apple · Titânio · A18 Pro · 5x · 4K', description: 'Construído para quem grava, edita e exige máxima performance.', price: 6999, image: 'https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=700&q=80' },
  { id: 23, category: 'mobile', badge: 'Apple · Linha 16', name: 'iPhone 16 Pro Max 256GB', detail: 'Apple · Titânio · A18 Pro · 6.9” · 5x', description: 'A maior experiência Pro com tela imersiva e controle de câmera.', price: 7999, image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=700&q=80' },
  { id: 24, category: 'mobile', badge: 'Apple · Linha 17', name: 'iPhone 17 256GB', detail: 'Apple · Nova geração · OLED · 5G', description: 'Desempenho atualizado e câmeras inteligentes em um corpo refinado.', price: 5699, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80' },
  { id: 25, category: 'mobile', badge: 'Apple · Linha 17', name: 'iPhone 17 Pro 256GB', detail: 'Apple · ProMotion · Chip Pro · Câmera Pro', description: 'Ferramentas avançadas para transformar ideias em fotos e vídeos.', price: 7499, image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=700&q=80' },
  { id: 26, category: 'mobile', badge: 'Apple · Linha 17', name: 'iPhone 17 Pro Max 512GB', detail: 'Apple · 6.9” · ProMotion · Zoom avançado', description: 'O modelo mais completo da geração para produtividade e criação.', price: 8999, image: 'https://images.unsplash.com/photo-1537589376225-5405c60a5bd8?auto=format&fit=crop&w=700&q=80' },
  { id: 27, category: 'mobile', badge: 'Apple · Linha 18', name: 'iPhone 18 256GB', detail: 'Apple · Próxima geração · OLED · 5G', description: 'Modelo de entrada da nova geração com desempenho para muitos anos.', price: 6199, image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=700&q=80' },
  { id: 28, category: 'mobile', badge: 'Apple · Linha 18', name: 'iPhone 18 Pro 256GB', detail: 'Apple · Chip Pro · ProMotion · Câmera avançada', description: 'Tecnologia Pro para quem quer mais velocidade e qualidade de imagem.', price: 8299, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=700&q=80' },
  { id: 29, category: 'mobile', badge: 'Apple · Linha 18', name: 'iPhone 18 Pro Max 512GB', detail: 'Apple · 6.9” · Chip Pro · Zoom avançado · 5G', description: 'O modelo mais avançado da linha, com a maior tela e armazenamento.', price: 9999, image: 'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&w=700&q=80' },
  { id: 30, category: 'mobile', badge: 'Samsung', name: 'Galaxy S24 256GB', detail: 'Samsung · AMOLED 6.2” · 5G · 50MP', description: 'Tela brilhante, inteligência Galaxy e câmera para todos os momentos.', price: 3899, image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=700&q=80' },
  { id: 31, category: 'mobile', badge: 'Xiaomi', name: 'Xiaomi Redmi Note 13 Pro', detail: 'Xiaomi · AMOLED 6.67” · 200MP · 5G', description: 'Muito espaço, câmera de alta resolução e carregamento veloz.', price: 1899, image: 'https://images.unsplash.com/photo-1529612700005-e35377bf1415?auto=format&fit=crop&w=700&q=80' },
  { id: 37, category: 'mobile', badge: 'Samsung', name: 'Galaxy S24 Ultra 256GB', detail: 'Samsung · AMOLED 6.8” · 200MP · S Pen', description: 'A experiência Galaxy mais completa para produtividade, fotos e vídeos.', price: 5799, image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=700&q=80' },
  { id: 38, category: 'mobile', badge: 'Samsung', name: 'Galaxy S24 FE 256GB', detail: 'Samsung · AMOLED 6.7” · 50MP · 5G', description: 'Desempenho premium e tela grande por um valor mais equilibrado.', price: 3299, image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=700&q=80' },
  { id: 39, category: 'mobile', badge: 'Samsung', name: 'Galaxy A55 256GB', detail: 'Samsung · Super AMOLED 6.6” · 50MP · 5G', description: 'Design elegante, boa autonomia e câmera versátil para o dia a dia.', price: 2199, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=700&q=80' },
  { id: 40, category: 'mobile', badge: 'Samsung', name: 'Galaxy Z Flip6 256GB', detail: 'Samsung · Dobrável · AMOLED 6.7” · 50MP', description: 'Formato compacto e personalidade forte com tecnologia dobrável.', price: 6499, image: 'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b3f?auto=format&fit=crop&w=700&q=80' },
  { id: 41, category: 'mobile', badge: 'Xiaomi', name: 'Xiaomi Redmi Note 14 Pro', detail: 'Xiaomi · AMOLED 6.67” · 200MP · 5G', description: 'Tela vibrante, câmera detalhada e carregamento rápido para a rotina.', price: 2299, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80' },
  { id: 42, category: 'mobile', badge: 'Xiaomi', name: 'Xiaomi Poco X6 Pro 512GB', detail: 'POCO · AMOLED 6.67” · 120Hz · Dimensity 8300', description: 'Performance agressiva para jogos mobile e multitarefa.', price: 2499, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80' },
  { id: 43, category: 'mobile', badge: 'Xiaomi', name: 'Xiaomi 14T Pro 512GB', detail: 'Xiaomi · AMOLED 6.67” · Leica · 5G', description: 'Câmeras com assinatura Leica e potência para quem exige mais.', price: 3999, image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=700&q=80' },
  { id: 32, category: 'audio', badge: 'JBL', name: 'JBL Charge 5', detail: 'JBL · Bluetooth · IP67 · 20h de bateria', description: 'Som potente e portátil para levar sua trilha sonora a qualquer lugar.', price: 799, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80' },
  { id: 61, category: 'audio', badge: 'JBL', name: 'JBL Flip 6', detail: 'JBL · Bluetooth 5.1 · IP67 · 12h de bateria', description: 'Caixa compacta e resistente para levar som JBL para qualquer lugar.', price: 599, image: 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?auto=format&fit=crop&w=700&q=80' },
  { id: 62, category: 'audio', badge: 'JBL', name: 'JBL Xtreme 3', detail: 'JBL · IP67 · Alça de transporte · 15h de bateria', description: 'Graves fortes e potência para animar encontros em ambientes internos e externos.', price: 1599, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=700&q=80' },
  { id: 63, category: 'audio', badge: 'JBL', name: 'JBL Boombox 3', detail: 'JBL · Bluetooth · IP67 · 24h de bateria', description: 'A caixa portátil para quem quer volume alto e graves marcantes.', price: 2399, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80' },
  { id: 64, category: 'audio', badge: 'JBL', name: 'JBL PartyBox 110', detail: 'JBL · 160W · Luzes RGB · Entrada para microfone', description: 'Potência de festa, efeitos de luz e conexão para cantar com os amigos.', price: 2199, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=700&q=80' },
  { id: 65, category: 'audio', badge: 'JBL', name: 'JBL Tune 770NC', detail: 'JBL · Over-ear · Cancelamento de ruído · 70h', description: 'Fone confortável com ANC e bateria longa para trabalho e viagens.', price: 499, image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=700&q=80' },
  { id: 66, category: 'audio', badge: 'JBL', name: 'JBL Live Pro 2', detail: 'JBL · TWS · ANC adaptativo · IPX5', description: 'Earbuds com som detalhado, encaixe confortável e chamadas nítidas.', price: 899, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80' },
  { id: 67, category: 'audio', badge: 'JBL Quantum 910', name: 'JBL Quantum 910 Wireless', detail: 'JBL · Wireless · Som espacial · Compatível com PC e console', description: 'Headset gamer JBL com posicionamento sonoro preciso para competir.', price: 1299, image: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&w=700&q=80' },
  { id: 68, category: 'audio', badge: 'JBL', name: 'JBL Bar 500', detail: 'JBL · Soundbar 5.1 · Dolby Atmos · Subwoofer sem fio', description: 'Cinema em casa com graves profundos e som envolvente para filmes e jogos.', price: 2499, image: 'https://images.unsplash.com/photo-1558756520-53f96f2e3e57?auto=format&fit=crop&w=700&q=80' },
  { id: 33, category: 'audio', badge: 'Apple', name: 'AirPods Pro 2', detail: 'Apple · Cancelamento de ruído · USB-C', description: 'Áudio espacial e cancelamento ativo para uma experiência imersiva.', price: 1899, image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=700&q=80' },
  { id: 48, category: 'audio', badge: 'Apple', name: 'AirPods 4', detail: 'Apple · Áudio espacial · USB-C · Bluetooth', description: 'Leves, confortáveis e práticos para música e chamadas durante o dia.', price: 1299, image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=700&q=80' },
  { id: 49, category: 'audio', badge: 'Apple', name: 'AirPods Max USB-C', detail: 'Apple · Over-ear · Áudio espacial · ANC', description: 'Fones premium com palco sonoro amplo e cancelamento ativo de ruído.', price: 4599, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80' },
  { id: 50, category: 'wearable', badge: 'Apple Watch', name: 'Apple Watch SE 2 GPS', detail: 'Apple · 40mm · GPS · Monitoramento de saúde', description: 'Recursos essenciais de saúde, treino e notificações para sua rotina.', price: 1899, image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=700&q=80' },
  { id: 51, category: 'wearable', badge: 'Apple Watch', name: 'Apple Watch Series 10', detail: 'Apple · 42mm · GPS · Tela ampla · Sono', description: 'Design fino, tela brilhante e acompanhamento completo da sua saúde.', price: 3999, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=700&q=80' },
  { id: 52, category: 'wearable', badge: 'Apple Watch', name: 'Apple Watch Ultra 2', detail: 'Apple · 49mm · GPS + Cellular · Titânio', description: 'Resistência, autonomia e ferramentas avançadas para aventura e esporte.', price: 6499, image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=700&q=80' },
  { id: 53, category: 'hardware', badge: 'Apple', name: 'MacBook Air M3 13”', detail: 'Apple · M3 · 8GB · SSD 256GB · Retina', description: 'Notebook leve e silencioso para estudo, trabalho e criação.', price: 7499, image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=700&q=80' },
  { id: 54, category: 'hardware', badge: 'Apple', name: 'MacBook Air M4 15”', detail: 'Apple · M4 · 16GB · SSD 512GB · Liquid Retina', description: 'Tela ampla e performance eficiente para produtividade sem limites.', price: 9999, image: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?auto=format&fit=crop&w=700&q=80' },
  { id: 55, category: 'hardware', badge: 'Apple', name: 'MacBook Pro M4 Pro 14”', detail: 'Apple · M4 Pro · 24GB · SSD 512GB · XDR', description: 'Potência profissional para edição, programação e projetos exigentes.', price: 15999, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=700&q=80' },
  { id: 34, category: 'gamer', badge: 'Conforto', name: 'Cadeira Gamer LevelUp Pro', detail: 'Reclinável · Apoio lombar · Até 150kg', description: 'Ergonomia e sustentação para longas sessões de jogo.', price: 1199, image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=700&q=80' },
  { id: 35, category: 'gamer', badge: 'PlayStation', name: 'PlayStation 5 Slim', detail: 'Sony · SSD 1TB · Edição com leitor', description: 'Carregamento rápido, gráficos incríveis e nova geração de jogos.', price: 3799, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=80' },
  { id: 36, category: 'gamer', badge: 'Xbox', name: 'Xbox Series X 1TB', detail: 'Microsoft · 4K · SSD · Ray Tracing', description: 'O console mais potente da Xbox para jogar com máxima qualidade.', price: 4299, image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=700&q=80' },
  { id: 69, category: 'gamer', badge: 'PlayStation', name: 'PlayStation 5 Pro 2TB', detail: 'Sony · SSD 2TB · 4K aprimorado · Ray Tracing', description: 'Mais resolução, iluminação avançada e desempenho para a nova geração.', price: 5999, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=700&q=80' },
  { id: 70, category: 'gamer', badge: 'PlayStation', name: 'PlayStation 5 Digital Slim', detail: 'Sony · SSD 1TB · Edição digital · 4K', description: 'A experiência PS5 em formato digital, elegante e mais compacto.', price: 3499, image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=700&q=80' },
  { id: 71, category: 'gamer', badge: 'PlayStation', name: 'PlayStation 4 Pro 1TB', detail: 'Sony · 4K · HDR · SSD 1TB', description: 'Catálogo enorme de jogos e gráficos aprimorados em 4K.', price: 2299, image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=700&q=80' },
  { id: 72, category: 'gamer', badge: 'PlayStation', name: 'PlayStation 4 Slim 500GB', detail: 'Sony · HDR · 500GB · Blu-ray', description: 'Uma forma acessível de aproveitar os grandes clássicos do PlayStation.', price: 1699, image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=700&q=80' },
  { id: 73, category: 'gamer', badge: 'Xbox', name: 'Xbox Series S 512GB', detail: 'Microsoft · Digital · 1440p · SSD', description: 'Compacto e rápido, ideal para entrar na nova geração Xbox.', price: 2499, image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=700&q=80' },
  { id: 74, category: 'gamer', badge: 'Xbox', name: 'Xbox Series S 1TB Carbon Black', detail: 'Microsoft · Digital · SSD 1TB · Quick Resume', description: 'Mais espaço para sua biblioteca em um console compacto e silencioso.', price: 2999, image: 'https://images.unsplash.com/photo-1605898839601-9c7c8f7e8d2b?auto=format&fit=crop&w=700&q=80' },
  { id: 75, category: 'gamer', badge: 'Xbox', name: 'Xbox One X 1TB', detail: 'Microsoft · 4K nativo · HDR · Blu-ray 4K', description: 'Desempenho poderoso para aproveitar jogos Xbox em alta resolução.', price: 1999, image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=700&q=80' },
  { id: 76, category: 'gamer', badge: 'Xbox', name: 'Xbox One S 1TB', detail: 'Microsoft · HDR · 4K vídeo · Blu-ray', description: 'Console versátil para jogos, streaming e entretenimento em casa.', price: 1499, image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=700&q=80' },
  { id: 44, category: 'gamer', badge: 'Ergonomia', name: 'Cadeira Gamer LevelUp Elite', detail: 'Reclinável 180° · Apoio lombar · Até 150kg', description: 'Encosto alto e espuma de alta densidade para longas sessões.', price: 1499, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80' },
  { id: 45, category: 'gamer', badge: 'RGB', name: 'Cadeira Gamer Thunder RGB', detail: 'LED RGB · Braços 4D · Base reforçada', description: 'Visual marcante e ajustes completos para personalizar seu setup.', price: 1799, image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?auto=format&fit=crop&w=700&q=80' },
  { id: 46, category: 'gamer', badge: 'Premium', name: 'Cadeira Gamer Master Pro', detail: 'Couro premium · Reclinável · Apoio para pés', description: 'Conforto premium com suporte para cabeça, lombar e pernas.', price: 2299, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=700&q=80' },
  { id: 47, category: 'gamer', badge: 'Compacta', name: 'Cadeira Gamer Core', detail: 'Tecido respirável · Braços ajustáveis · Até 120kg', description: 'Uma opção compacta e confortável para setups menores.', price: 899, image: 'https://images.unsplash.com/photo-1617364852221-75c1f8d2d3c4?auto=format&fit=crop&w=700&q=80' },
  { id: 56, category: 'gamer', badge: 'Razer', name: 'Razer BlackWidow V4', detail: 'Razer · Switch mecânico · RGB Chroma · USB', description: 'Teclado mecânico preciso com iluminação RGB personalizável.', price: 1199, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80' },
  { id: 57, category: 'gamer', badge: 'Razer', name: 'Razer Basilisk V3 Pro', detail: 'Razer · Wireless · Sensor 30K · RGB Chroma', description: 'Mouse sem fio ergonômico para controle preciso em qualquer jogo.', price: 899, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=700&q=80' },
  { id: 58, category: 'gamer', badge: 'Razer', name: 'Razer Kraken V3 Pro', detail: 'Razer · Wireless · Haptic Feedback · THX Spatial', description: 'Headset imersivo com graves táteis e som espacial detalhado.', price: 1499, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=700&q=80' },
  { id: 59, category: 'gamer', badge: 'Razer', name: 'Razer Seiren V3 Mini', detail: 'Razer · USB · Microfone condensador · Supercardioide', description: 'Microfone compacto para lives, chamadas e criação de conteúdo.', price: 399, image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=700&q=80' },
  { id: 60, category: 'gamer', badge: 'Razer', name: 'Razer Wolverine V2 Chroma', detail: 'Razer · Xbox · Botões programáveis · RGB', description: 'Controle com resposta rápida e comandos extras para Xbox e PC.', price: 999, image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=700&q=80' }
];

let products = [...initialProducts];
window.levelUpProducts = products;

let cart = JSON.parse(localStorage.getItem('levelup-cart') || '[]').map(id => products.find(product => product.id === id)).filter(Boolean);
let favorites = JSON.parse(localStorage.getItem('levelup-favorites') || '[]');

const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const productGrid = document.querySelector('#productGrid');
const cartCount = document.querySelector('#cartCount');
const cartDrawer = document.querySelector('#cartDrawer');
const cartItems = document.querySelector('#cartItems');

function matchesFilter(product, filter) {
  if (filter === 'all') return true;
  if (filter === 'mobile') return product.category === 'mobile' || /iPhone|Galaxy|Redmi|Poco|Xiaomi/.test(product.name);
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

function renderProducts(filter = 'all', query = '') {
  if (!productGrid) return;
  const filtered = products.filter(product => matchesFilter(product, filter) && `${product.name} ${product.detail} ${product.description} ${product.badge}`.toLowerCase().includes(query.toLowerCase()));
  productGrid.innerHTML = filtered.length ? filtered.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80';" />
        <span class="product-badge">${product.badge}</span>
        <button class="favorite ${favorites.includes(product.id) ? 'is-favorite' : ''}" data-favorite="${product.id}" aria-label="${favorites.includes(product.id) ? 'Remover' : 'Adicionar'} ${product.name} dos favoritos">${favorites.includes(product.id) ? '♥' : '♡'}</button>
      </div>
      <div class="product-info">
        <small>${product.detail}</small>
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <span class="price">${money(product.price)} <small>à vista</small></span>
        <button class="add-product" data-add="${product.id}" aria-label="Adicionar ${product.name} ao carrinho">+</button>
      </div>
    </article>
  `).join('') : '<p class="empty-cart">Nenhum produto encontrado.</p>';
}

function applyCategoryImages(images = {}) {
  const localSaved = JSON.parse(localStorage.getItem('levelup-category-images') || '{}');
  const merged = { ...localSaved, ...images };
  document.querySelectorAll('[data-filter-link]').forEach(card => {
    const img = merged[card.dataset.filterLink];
    if (img) card.style.backgroundImage = `url("${img}")`;
  });
}

function renderCart() {
  if (!cartCount || !cartItems) return;
  const count = cart.length;
  localStorage.setItem('levelup-cart', JSON.stringify(cart.map(product => product.id)));
  cartCount.textContent = count;
  const drawerCount = document.querySelector('#drawerCount');
  if (drawerCount) drawerCount.textContent = `(${count})`;

  cartItems.innerHTML = count ? cart.map((product, index) => `
    <div class="cart-line">
      <span>${product.name}</span>
      <strong>${money(product.price)}</strong>
      <button data-remove="${index}" aria-label="Remover">×</button>
    </div>
  `).join('') : '<p class="empty-cart">Seu carrinho está vazio.</p>';

  const cartTotal = document.querySelector('#cartTotal');
  if (cartTotal) cartTotal.textContent = money(cart.reduce((total, item) => total + item.price, 0));
}

// Carrega os dados reais do Supabase
async function initStore() {
  if (supabaseClient) {
    try {
      const { data: edits, error } = await supabaseClient.from('products_edits').select('*');
      if (!error && edits && edits.length > 0) {
        edits.forEach(edit => {
          if (edit.deleted) {
            products = products.filter(p => p.id !== edit.id);
          } else {
            const product = products.find(p => p.id === edit.id);
            if (product) {
              Object.assign(product, edit);
            } else {
              products.push(edit);
            }
          }
        });
        window.levelUpProducts = products;
      }
    } catch (e) {
      console.warn('Erro ao conectar com Supabase:', e);
    }
  }

  renderProducts();
  renderCart();
  applyCategoryImages();
}

productGrid?.addEventListener('click', event => {
  const favoriteButton = event.target.closest('[data-favorite]');
  if (favoriteButton) {
    const id = Number(favoriteButton.dataset.favorite);
    favorites = favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id];
    localStorage.setItem('levelup-favorites', JSON.stringify(favorites));
    const active = document.querySelector('.filter-tabs .active');
    renderProducts(active ? active.dataset.filter : 'all', document.querySelector('#searchInput')?.value || '');
    return;
  }
  const button = event.target.closest('[data-add]');
  if (!button) return;
  const product = products.find(item => item.id === Number(button.dataset.add));
  if (product) {
    cart.push(product);
    renderCart();
    cartDrawer?.classList.add('open');
    cartDrawer?.setAttribute('aria-hidden', 'false');
  }
});

cartItems?.addEventListener('click', event => {
  const button = event.target.closest('[data-remove]');
  if (!button) return;
  cart.splice(Number(button.dataset.remove), 1);
  renderCart();
});

document.querySelector('#cartButton')?.addEventListener('click', () => {
  cartDrawer?.classList.add('open');
  cartDrawer?.setAttribute('aria-hidden', 'false');
});

document.querySelectorAll('[data-close-cart]').forEach(button => button.addEventListener('click', () => {
  cartDrawer?.classList.remove('open');
  cartDrawer?.setAttribute('aria-hidden', 'true');
}));

document.querySelectorAll('.filter-tabs button').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter-tabs .active')?.classList.remove('active');
  button.classList.add('active');
  renderProducts(button.dataset.filter, document.querySelector('#searchInput')?.value || '');
}));

document.querySelectorAll('[data-filter-link]').forEach(card => card.addEventListener('click', () => {
  const filter = card.dataset.filterLink;
  const button = document.querySelector(`.filter-tabs button[data-filter="${filter}"]`);
  if (button) {
    document.querySelector('.filter-tabs .active')?.classList.remove('active');
    button.classList.add('active');
  }
  renderProducts(filter, document.querySelector('#searchInput')?.value || '');
}));

document.querySelectorAll('[data-nav-filter]').forEach(link => link.addEventListener('click', () => {
  const filter = link.dataset.navFilter;
  const button = document.querySelector(`.filter-tabs button[data-filter="${filter}"]`);
  document.querySelector('.main-nav')?.classList.remove('open');
  if (button) {
    document.querySelector('.filter-tabs .active')?.classList.remove('active');
    button.classList.add('active');
  }
  renderProducts(filter, document.querySelector('#searchInput')?.value || '');
}));

document.querySelectorAll('[data-footer-filter]').forEach(link => link.addEventListener('click', () => {
  const filter = link.dataset.footerFilter;
  const button = document.querySelector(`.filter-tabs button[data-filter="${filter}"]`);
  document.querySelector('.filter-tabs .active')?.classList.remove('active');
  if (button) {
    button.classList.add('active');
  }
  renderProducts(filter, '');
}));

document.querySelector('#searchInput')?.addEventListener('input', event => {
  const active = document.querySelector('.filter-tabs .active');
  renderProducts(active ? active.dataset.filter : 'all', event.target.value);
});

document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  document.querySelector('.main-nav')?.classList.toggle('open');
});

document.querySelector('#checkoutButton')?.addEventListener('click', () => {
  if (!cart.length) {
    window.alert('Adicione um produto ao carrinho antes de continuar.');
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const items = cart.map((item, index) => `${index + 1}. ${item.name}\n   ${item.detail}\n   ${money(item.price)}`).join('\n\n');
  const message = `Olá, LevelUpStore! Quero finalizar meu pedido:\n\n${items}\n\nTotal: ${money(total)}\n\nAguardo as instruções para pagamento e entrega.`;
  const whatsappUrl = `https://wa.me/5516982195452?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});

document.querySelector('#newsletterForm')?.addEventListener('submit', event => {
  event.preventDefault();
  event.target.reset();
  const msg = document.querySelector('#newsletterMessage');
  if (msg) msg.textContent = 'Cadastro realizado com sucesso.';
});

const guides = {
  setup: { title: 'Como montar um setup que acompanha sua evolução', content: '<p>Comece pelo seu objetivo: jogar em Full HD, competir em alta taxa de quadros ou criar conteúdo. Essa decisão orienta o processador, a placa de vídeo e o monitor.</p><p>Priorize uma fonte de qualidade, boa ventilação e espaço para upgrades. Um setup equilibrado dura mais e permite evoluir sem trocar tudo de uma vez.</p>' },
  keyboard: { title: 'O teclado certo muda seu jogo?', content: '<p>Switches lineares favorecem respostas rápidas e suaves, enquanto switches táteis oferecem um retorno físico mais evidente. O melhor tipo depende da sua preferência.</p><p>Observe também o tamanho, a conexão e os recursos de configuração. RGB é detalhe; conforto e consistência vêm primeiro.</p>' },
  monitor: { title: 'Guia rápido para escolher seu monitor', content: '<p>Combine a resolução com a potência do seu PC: Full HD é ótimo para FPS alto, QHD equilibra nitidez e desempenho, e 4K exige uma placa de vídeo mais forte.</p><p>Para jogos competitivos, procure alta frequência e baixo tempo de resposta. Para criação, priorize cores, contraste e ergonomia.</p>' }
};

document.querySelectorAll('[data-guide]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  const guide = guides[link.dataset.guide];
  if (guide) {
    document.querySelector('#guideTitle').textContent = guide.title;
    document.querySelector('#guideContent').innerHTML = guide.content;
    document.querySelector('#guideReader').classList.add('open');
    document.querySelector('#guideReader').setAttribute('aria-hidden', 'false');
  }
}));

document.querySelectorAll('[data-close-guide]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#guideReader').classList.remove('open');
  document.querySelector('#guideReader').setAttribute('aria-hidden', 'true');
}));

initStore();
