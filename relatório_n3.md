# Craft Corner - Relatório TDD (N3)

## Funcionalidade

A funcionalidade escolhida para implementação com TDD foi o **cadastro de tutoriais** no Craft Corner.

Essa funcionalidade permite que usuários criem novos tutoriais para compartilhar conhecimentos de artesanato com outros usuários da plataforma. Durante o cadastro, o sistema realiza validações para garantir que os dados informados sejam válidos.

---

## Regras de Negócio

* O tutorial deve possuir um título.
* O tutorial deve possuir uma descrição.
* O tutorial deve possuir a lista de materiais.
* O tutorial deve possuir um nível de dificuldade.
* O tutorial deve possuir uma URL de vídeo.
* O tutorial deve possuir uma duração.
* O tutorial deve possuir uma imagem de capa.
* Não é permitido cadastrar dois tutoriais com o mesmo título e a mesma URL do vídeo.
* O ID do tutorial deve ser válido quando informado.
* O usuário pode excluir um tutorial existente.

---

## Aplicação do TDD

No desenvolvimentofoi utilizado o ciclo **Red-Green-Refactor**, aplicando a metodologia Test Driven Development.

### Red

Inicialmente foram escritos os testes unitários para validar as regras de negócio do cadastro de tutoriais antes da implementação da funcionalidade.

Como esperado, todos os testes falharam, pois o código responsável pelo cadastro ainda não existia.

Exemplo: teste que impede o cadastro de um tutorial com o título vazio.

---

### Green

Após a criação dos testes, foi implementado apenas o código mínimo necessário para que cada teste fosse aprovado.

Foram adicionadas validações para verificar os campos obrigatórios, impedir o cadastro de tutoriais duplicados e permitir a exclusão de um tutorial existente.

---

### Refactor

Após todos os testes passarem, o código foi reorganizado para melhorar sua organização e facilitar futuras manutenções.

As regras de negócio ficaram centralizadas na camada de Service, enquanto o Controller ficou responsável apenas por receber a requisição HTTP e retornar a resposta adequada.

---

# Exemplos de Testes Unitários

## Teste 1 - Impedir Cadastro sem Título

O objetivo deste teste é garantir que nenhum tutorial seja cadastrado sem possuir um título.

Foi utilizado um **mock** do `TutorialModel`, simulando o comportamento do banco de dados. Como o campo `titulo` não foi informado, o Service lança uma exceção com a mensagem **"Título é obrigatório"**.

A asserção utilizada foi:

* `expect(...).rejects.toThrow()`

---

## Teste 2 - Impedir Cadastro de Tutoriais Duplicados

Este teste verifica se o sistema impede o cadastro de um tutorial quando já existe outro com o mesmo título e a mesma URL do vídeo.

Foi utilizado um **mock** do método `findOne()` do `TutorialModel`, simulando que o tutorial já existe no banco de dados.

A asserção utilizada foi:

* `expect(...).rejects.toThrow()`

---

## Teste 3 - Excluir Tutorial com Sucesso

O objetivo deste teste é verificar se um tutorial pode ser removido corretamente.

Foi criado um **mock** do método `destroy()` para simular a exclusão do registro.

Após executar a função de exclusão, o teste verifica se o método foi chamado e se a mensagem de sucesso foi retornada.

As asserções utilizadas foram:

* `expect().toHaveBeenCalled()`
* `expect().toEqual()`

---

# Exemplos de Testes de Integração

## Teste 1 - Cadastro de Tutorial com Sucesso

Este teste verifica a integração entre as rotas, o controller e o service.

O método `createTutorial()` foi mockado utilizando o Vitest para simular um cadastro realizado com sucesso.

Foi enviado um `POST` para a rota de cadastro utilizando o Supertest.

As verificações realizadas foram:

* Status HTTP **201 (Created)**.
* Mensagem **"Tutorial cadastrado com sucesso"**.
* Chamada correta do método do Service.

---

## Teste 2 - Tentativa de Cadastro sem Título

Neste teste foi simulado um erro retornado pelo Service quando o título não é informado.

Foi enviado um `POST` contendo dados inválidos para a rota de cadastro.

O Controller capturou a exceção e retornou:

* Status HTTP **400 (Bad Request)**.
* Mensagem **"Título é obrigatório"**.

O teste garante que as validações da camada de Service sejam refletidas corretamente na resposta HTTP enviada ao cliente.

---

# Como executar o projeto

Instale todas as dependências do projeto:

```bash
npm install
```

Para iniciar a aplicação:

```bash
npm start
```

---

# Como executar os testes

Executar todos os testes:

```bash
npm test
```

Executar os testes em modo de observação:

```bash
npm test -- --watch
```
