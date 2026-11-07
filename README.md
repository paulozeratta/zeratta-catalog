# Zeratta Catalog

Central de produtos e custos Zeratta com GitHub Pages e fretes persistidos no GitHub.

**Site:** https://paulozeratta.github.io/zeratta-catalog/

## Publicação

Em **Settings → Pages**, use **Deploy from a branch → main → /(root)**. Todo commit na `main` publica automaticamente a nova versão. Não configure domínio personalizado nem crie arquivo `CNAME`. O redirecionamento externo de `zeratta.com.br` para a loja não faz parte deste projeto.

## Acesso ao catálogo

O site mantém o HTML financeiro criptografado com AES-256-GCM. A senha é informada no próprio navegador e **não é salva no GitHub**. A senha atual foi escolhida pelo proprietário e deve ser mantida fora do repositório.

**Aviso de segurança:** uma senha curta reduz significativamente a resistência contra ataques de adivinhação, mesmo com criptografia. O Pages é público e o desbloqueio no navegador não equivale a controle de acesso de uma aplicação privada.

## Como salvar os fretes permanentemente

Os campos **Frete EPROLO → EUA** permitem valores individuais por Shopify Product ID.

- **Leitura:** ao abrir o catálogo, os fretes gravados são carregados automaticamente de `data/freights.enc.json`. O arquivo é criptografado e funciona entre navegadores/dispositivos mediante a senha atual.
- **Gravação:** por segurança, não há token GitHub no código da página. Para poder salvar do navegador, crie um **fine-grained personal access token** em https://github.com/settings/personal-access-tokens/new.
- Selecione o proprietário `paulozeratta`, em **Repository access** escolha **Only select repositories → zeratta-catalog** e em **Repository permissions** dê apenas **Contents: Read and write**. Não é necessária autorização para outros repositórios.
- Abra o catálogo, digite a senha de acesso, cole o token no campo **Ativar salvamento permanente** e clique em conectar. O token fica somente na memória da aba e precisa ser reinserido ao reabrir.
- A partir da conexão, cada frete alterado é salvo automaticamente como **arquivo criptografado** no GitHub. O botão **Salvar fretes no GitHub** permite gravar alterações pendentes. Confira a mensagem **Salvo permanentemente no GitHub**.
- Se o GitHub estiver desconectado, valores digitados ficam **somente no localStorage do navegador**, com aviso claro. Conecte e salve antes de trocar de dispositivo.
- Notas, SKUs, títulos e outros campos editados no navegador continuam locais e podem ser exportados pelo backup JSON. Apenas **fretes** são persistidos neste mecanismo de nuvem.

Não crie um token clássico com permissões amplas. **Nunca** registre o token em commits, arquivos ou capturas de tela. O GitHub pode registrar versões criptografadas anteriores no histórico do repositório.

## Atualizar todo o catálogo

1. Obtenha a versão atualizada do HTML original de uma fonte segura, fora do repositório público.
2. Instale `cryptography` no computador: `python -m pip install cryptography`.
3. Configure no sistema a senha atual como variável de ambiente `ZERATTA_CATALOG_PASSWORD`; não a coloque no Git.
4. Execute `python scripts/encrypt_catalog.py /caminho/novo-catalogo.html`.
5. O script preserva a sincronização de fretes, criptografa o novo HTML e substitui somente `index.html`.
6. Faça commit e push de `index.html` para `main`. O Pages republica automaticamente.

Os fretes permanecem em arquivo separado (`data/freights.enc.json`), portanto **uma atualização do catálogo não apaga os fretes salvos** desde que os Shopify Product IDs não mudem.

## Limitações

O GitHub Pages é hospedagem estática: não obtém, por si só, novos dados da Shopify ou EPROLO. Para atualizar produtos/custos de fornecedores, ainda é necessário gerar e publicar uma nova versão do catálogo. Só os fretes editados e salvos pelo mecanismo acima são sincronizados diretamente do navegador. A versão não oferece usuários, permissões por pessoa nem revogação individual de acesso. O Pages não possui SLA de disponibilidade absoluta.

## Estrutura

- `index.html`: tela de desbloqueio e catálogo cifrado.
- `data/freights.enc.json`: valores de frete criptografados e sincronizados.
- `scripts/encrypt_catalog.py`: atualização protegida mantendo o módulo de fretes.
- `.nojekyll`: publicação estática sem Jekyll.
- `.gitignore`: evita upload acidental de credenciais e arquivos de origem privados.
