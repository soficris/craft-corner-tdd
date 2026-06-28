# Craft Corner - Relátorio TDD

## Funcionalidade 

A funcinalidade escolhida para a implementação com o TDD foi a função de favoritar um tutorial do Craft Corner.  
Essa funcionalidade permite que usuários logados consigam adicionar tutoriais aos seus favoritos, tanto para apreciar o trabalho dos outros usuários tanto para revisitar aquele tutorial depois. 

## Regras de Negócio

- O usuário pode favoritar um tutorial. 
- O usuário deve estar autenticado para favoritar um tutorial. 
- O usuário não pode favoritar o próprio vídeo. 
- O usuário não pode favoritar mais de 100 tutoriais por dia. 
- O usuário pode remover um tutorial dos favortios. 
- O usuário não pode remover um favorito que não existe. 
- O tutorial deve existir para ser favoritado. 
- O mesmo tutorial não pode ser favoritado duas vezes pelo mesmo usuário. 
- O ID do tutorial tem que ser válido. 

## Aplicação do TDD 

No sistema, o TDD foi aplicado utilizando o ciclo Red-Green-Refactor 

### Red 
Foi criado um teste para uma funcionalidade que ainda não havia sido implementada. Ao executar, o teste falhou.  

Exemplo:. Teste para impedir favoritar o mesmo tutorial. 

### Green  
Após o teste falha, foi implementado um código minimo necessário para que o teste passasse apenas.  

Foi criada uma função de validação para não permitir o mesmo usuário favoritar o mesmo tutorial duas vezes ou mais. 

### Refactor  
  
Passando no teste, o código foi reogarnizado para melhor entendimento. 

As regras de negócio foram separadas em funções específicas, como:  

- validateUserAuthen()
- validateDuplicateFavorite()

## Exemplos de Testes Unitários 

### Teste 1 - Impedir Favoritos Duplicados 
O teste tem o objetivo de garantir que um mesmo usuário não favorite o mesmo tutorial mais de uma vez.  
  
No teste, ele simula a existência de um favorito que está no banco de dados. Ao tentar favoritar novamente, o sistema deve lançar uma mensagem de aviso, de que o tutorial já está nos favoritos. 
  
### Teste 2 - Validar Usuário Autenticado 

O teste tem o objetivo de que apenas usuários autenticados possam favoritar um tutorial. 

No teste, é simulado um usuário inexistente (Ao buscar usuário, retorna null). Ao esse usuário tentar favoritar, o sistema interrompe e exibe uma mensagem pedindo ao usuário logar no sistema. 

### Teste 3 - Impedir de Favoritar o Próprio Tutorial  

O teste tem o objetivo que o autor de um tutorial não possa adicioná-lo aos seus próprios favoritos. 

No teste, ele simula um tutorial em que o proprietário possui o mesmo ID do usuário que está tentando favoritar o tutorial. O sistema bloqueia a ação de favoritar e exibe uma mensagem avisando que o usuário não pode curtir o próprio vídeo. 