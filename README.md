# Teste – FullStack Java/Kotlin

### Objetivo
O objetivo desta atividade é para avaliarmos suas habilidades em codificação e o que você valoriza no desenvolvimento de software. Gostamos de inovação e novas ideias.

### A atribuição
Construa uma página web (aplicação web) de listagem que exiba uma listagem dos produtos oferecidos pela Gubee tecnologia.

Os dados necessários para serem consumidos são conforme o JSON no final do documento.

Você deve exibir:
- Nome do produto.
- Descrição simples.
- Mercado alvo.
- Tecnologias utilizadas no produto.

Adicionar novos campos é encorajado, mas não mandatório.

Devem existir opções de filtro pelas respectivas tecnologias e mercado alvo. Quando mais de uma tecnologia selecionada, somente retornar os produtos que possuem pelo menos uma das tecnologias, Ex: Se o usuário selecionar Java e Oracle deve listar os produtos que contenham Java, Java e Oracle e somente Oracle. Você está livre para criar o mecanismo de filtro da forma que desejar.

Escolha os frameworks que ache que melhor atende ao desafio.

Para o json, você pode carrega-lo na aplicação e retorna-lo via leitura de arquivo, inserir as informações em base de dados, ou usar um serviço web como [https://resttesttest.com](https://resttesttest.com) para disponibilizado.

Faça suposições necessárias para implementação.

### Requisitos:
- Deve ser feito utilizando Java 8 ou superior.
- Toda lógica deve ser testável unitariamente com jUnit.
- Código limpo e boas praticas de OO.

### Desejável:
- Separação entre backend e frontend.
- Arquitetura em camadas.
- Uso da API de Stream e Lambda.
- Endpoints RestFul.

> O objetivo do teste é avaliar principalmente suas aptidões com desenvolvimento e sua preocupação com a qualidade do desenvolvido, sendo assim não existe a necessidade de focar em layout e aparência, faça um layout simples.

### Entregáveis:
Disponibilizar a fonte do projeto no GITHUB para que possamos analisar.
- Lembre-se, você será avaliado e questionado sobre o que fez, então faça sozinho com o conhecimento que possui.
- JSON Exemplo:
  
[gubee-teste.json](#backend/src/main/resources/json)