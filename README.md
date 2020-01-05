Não esqueçam de entrar dentro da pasta `client` e executar o comando `npm install` antes de utilizar o projeto.

03/Jan/2020 ---
    Adicionando suporte ao build de producao o babiliPlugin
    Instalando o modulo 'cross-env' para utilizacao de variaveis de ambiente
    Modificando os scripts para  build de dev e build de producao

04/Jan/2020 ---
    Instalando e configurando o Webpack dev server

05/Jan/2020 ---
    Removendo importacao tradicional do bootstrap
    Usando o NPM para instalar o Bootstrap
    Configurando o app para importar o css do bootstrap como modulo
    Configurando css-loader e style-loader para carregar o css do bootstrap como modulo
    Configurando o url-loader e file-loader para carregar as fontes do bootstrap
    Importando um css qualquer usando a sintaxe 'import'
    Quando usar o import:
        - Se colocar sem a '/' no comeco o webpack ira buscar na pasta node_modules
        - Se quiser importar um modulo fora da pasta node_modules tem que colocar o caminho relativo ate o arquivo

        import 'calopsita/dist/calop.css'; <- node_modules
        import '../css/alecrim.css; <- outra pasta
    
    Usando 'extract-text-webpack-plugin' para gerar um unico arquivo CSS para impedir o FOUC (Flash of Unstyled Content)
