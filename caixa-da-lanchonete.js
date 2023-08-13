// Giovanni Cabreira Milanez - Desafio START DB

class CaixaDaLanchonete {

    // Função para percorrer duas arrays e ver se ambas possuem um elemento em comum
    elementoArray(array1, array2) {
      for (const elemento of array1) {
        if (array2.includes(elemento)) {
          return true; // Encontrou um elemento em comum
        }
      }
    return false; // Não encontrou elementos em comum
    }

    calcularValorDaCompra(metodoDePagamento, itens) {

        // Menu da lanchonete
        const menu = {          
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
          };

        // Separação dos produtos
        const extras = ['chantily', 'queijo', 'combo1', 'combo2'];
        const principais =  ['cafe', 'suco', 'sanduiche', 'salgado'];

        // Variavel para armazenar o valor final a ser cobrado
        let subtotal = 0;                           
        let flag = 0;

        // Vetor para separar o nome dos produtos
        const ItensAux = itens.map(item => item.split(',')[0]);
  
        // Se não tiver nenhum pedido, termina a função 
        if (ItensAux.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        // Se possuir extras no pedido, verifica se possuem o produto principal 
        if (this.elementoArray(ItensAux, extras)) {

          // verifica se o pedido possui chantily, se não tiver café, liga a flag
          if(ItensAux.includes('chantily') && !ItensAux.includes('cafe')){
              flag = 1;
          }

          // verifica se o pedido possui queijo, se não tiver sanduiche, liga a flag
          if(ItensAux.includes('queijo') && !ItensAux.includes('sanduiche')){
              flag = 1;
          }

          // verifica se o pedido tem algum combo, se não tiver um produto principal, liga a flag
          if((ItensAux.includes('combo1') || ItensAux.includes('combo2')) && !this.elementoArray(ItensAux, principais)){
              flag = 1;
          }

          // se algum pedido foi inválido, termina a função
          if (flag === 1){
            return "Item extra não pode ser pedido sem o principal";
          }
        }

        // Laço para separar os pedidos e somar no pedido
        for (const pedido of itens) {

          // Separa o nome e a quantidade do pedido 
          const [nome, quantidade] = pedido.split(',');
      
          // Se o item não estiver no menu, retorna o pedido invalido
          if (!principais.includes(nome) && !extras.includes(nome)) {
              return "Item inválido!";
          }
            
          // Se a quantidade for menor ou igual a 0, retorna o pedido invalido
          if(parseInt(quantidade) < 1){
              return "Quantidade inválida!";
          }

          // Soma o valor do pedido com a quantidade
          subtotal += menu[nome] * quantidade;
        }

        // Escolher a forma de pagamento
        switch (metodoDePagamento) {

            // 5% de desconto
            case 'dinheiro':
              subtotal *= 0.95; 
              break;

            // 3% de acrescimo  
            case 'credito':
              subtotal *= 1.03; 
              break;

            // Nenhuma alteracao no valor
            case 'debito':      
              break;            

            // Termina a funcao caso nao tenha nenhuma opcao de pagamento valida
            default:            
              return "Forma de pagamento inválida!";
          }

        return `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    }
}

module.exports = CaixaDaLanchonete;
