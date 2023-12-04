Como iniciar e rodar o projeto, tanto o frontend como backend:

1 - Ter os dois repositórios no seu computador, clone-os do github

2 - É preciso ter um ambiente android para rodar o frontend, temos 2 opções. A primeira é baixar um emulador de android com o android studio, essa é a melhor opção em termos práticos porém é bastante exigente com o computador e a instalação vai demorar um pouco. A segunda opção é baixar o aplicativo expo go para android e usar ele para rodar o app no celular, essa é mais simples de se obter, porém ela tem 1 problema, não funciona na internet da UnB

3 - Agora que já temos o ambiente android pronto, vamos rodar o frontend primeiro, com os seguintes passos:
Primeiro instale as dependências:
    
    >> npm install
    >> npx expo install
   
Segundo rode o aplicativo:
    
    >> npx expo start

Por fim nessa etapa vai depender da sua escolha de ambiente, se optou pelo emulador do android studio é só abrir o emulador e apertar a no terminal que o aplicativo vai abrir no emulador. Se optou pelo expo go é só abrir o aplicativo no celular e colocar para ler o qr code que vai aparecer no terminal.

4 - Finalmente vamos configurar o backend e rodar ele
Primeiramente, quando você rodar o front vai aparecer uma mensagem no terminal dessa forma: "Metro waiting on exp://192.168.0.10:8081", esse é só um exemplo o seu vai estar diferente, o que vocês têm que fazer é copiar o endereço, que no caso do exemplo acima seria: "192.168.0.10" e você vai colocar ele no backend no arquivo main.py na linha 13. É para ficar dessa forma, conforme o exemplo que eu passei: "app.run(host='192.168.0.10', port=5000, debug=True)"
Agora você vai voltar no frontend a pasta services e abrir o arquivo api.ts e lá você tbm vai colar esse endereço antes do ":5000", é para ficar assim:
    
    "import axios from "axios";

    export const api = axios.create({
        baseURL: "http://192.168.0.10:5000"
    })"
    
Lembrando que isso é só um exemplo no de vocês vai ser um número diferente.
Finalmente é só voltar para o arquivo main.py no back e rodar a aplicação, pode ser pelo play do vscode mesmo.

5 - Após esses passos é para a aplicação está rodando perfeitamente.
