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

    Usando  o 'optimizeCSSAssetsPlugin' e 'cssnano' para gerar css's minificados para ambiente de producao

06/Jan/2020 ---
    Importanto scripts para o projeto
    
    Podemos importar um script para o projeto utilizando a sintaxe 'import'. Isso fara com que as funcoes do modulo do script sejam disponibilizados na aplicacao

    Para importar um modulo de um script de forma global (para toda a aplicacao) devemos utilizar o plugin nativo do webpack 'ProviderPlugin' que pode ser obtido a partir de um "require('webpack')" e, em seguida, colocar quais variaveis e seus respectivos arquivos de scripts devem ser publicadas globalmente no projeto

07/Jan/2020 ---
    Otimizando carregamento de scripts:
    Em ambiente de produção, podemos adicionar o plugin 'new webpack.optimize.ModuleConcatenationPlugin()' para otimizar o carregamento de scripts.

    SERVICE_URL:
    Podemos utilizar o plugin webpack.DefinePlugin({ SERVICE_URL : URL }) para definir qual o endereço de serviço a ser utilizado de acordo com o ambiente a aplicação estará rodando