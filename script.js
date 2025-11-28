// Dados dos produtos (expandido com mais itens)
const produtos = [
    { id: 1, nome: 'Calça Jeans Country Azul Made In ZW', preco: 959, desc: 'Calça jeans resistente para looks country.', img: 'https://via.placeholder.com/300x400?text=Calca+Jeans+Country+Azul' },
    { id: 2, nome: 'Calça Jeans West Dust', preco: 299, desc: 'Calça jeans básica para looks country.', img: 'https://via.placeholder.com/300x400?text=Calca+Couro+Country+Marrom' },
    { id: 3, nome: 'Calça Jeans Turmalina', preco: 689, desc: 'Estilo rústico perfeito para o campo.', img: 'https://via.placeholder.com/300x400?text=Calca+Rustica+Country+Bege' },
    { id: 4, nome: 'Calça Jeans Country Preta', preco: 469, desc: 'Calça jeans preta clássica para o dia a dia country.', img: 'https://via.placeholder.com/300x400?text=Calca+Jeans+Country+Preta' },
    { id: 5, nome: 'Calça Couro Country Preto', preco: 1220, desc: 'Calça de couro preto elegante e durável.', img: 'https://via.placeholder.com/300x400?text=Calca+Couro+Country+Preto' },
    { id: 6, nome: 'Calça Jeans Viking', preco: 890, desc: 'Estilo rústico que combina com tudo.', img: 'https://via.placeholder.com/300x400?text=Calca+Rustica+Country+Verde' }
];

// Carrinho
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
atualizarCarrinho();

// Slider automático (dinâmico com base no número de produtos)
let slideIndex = 0;
setInterval(() => {
    const container = document.querySelector('.produto-container');
    const totalProdutos = document.querySelectorAll('.produto').length;
    slideIndex = (slideIndex + 1) % totalProdutos;
    container.style.transform = `translateX(-${slideIndex * 320}px)`;
}, 3000);

// Filtros
document.getElementById('categoria').addEventListener('change', filtrarProdutos);
document.getElementById('tamanho').addEventListener('change', filtrarProdutos);

function filtrarProdutos() {
    const categoria = document.getElementById('categoria').value;
    const tamanho = document.getElementById('tamanho').value;
    const produtosEl = document.querySelectorAll('.produto');

    produtosEl.forEach(prod => {
        const cat = prod.dataset.categoria;
        const tam = prod.dataset.tamanho;
        if ((categoria === 'todos' || cat === categoria) && (tamanho === 'todos' || tam === tamanho)) {
            prod.style.display = 'block';
        } else {
            prod.style.display = 'none';
        }
    });
}

// Modal de detalhes
document.querySelectorAll('.detalhes-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const prod = produtos.find(p => p.id == id);
        document.getElementById('modal-title').textContent = prod.nome;
        document.getElementById('modal-img').src = prod.img;
        document.getElementById('modal-desc').textContent = prod.desc;
        document.getElementById('modal-price').textContent = `R$ ${prod.preco},00`;
        document.getElementById('modal').style.display = 'block';
    });
});

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

// Adicionar ao carrinho
document.querySelectorAll('.add-carrinho').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const prod = produtos.find(p => p.id == id);
        carrinho.push(prod);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
        alert(`${prod.nome} adicionado ao carrinho!`);
    });
});

// Atualizar contador do carrinho
function atualizarCarrinho() {
    document.getElementById('carrinho-count').textContent = carrinho.length;
}

// Scroll para produtos
function scrollToProdutos() {
    document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
}