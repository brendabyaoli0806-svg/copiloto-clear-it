# US05: Mascaramento de Dados Sensíveis (LGPD)

## 1. Descrição da User Story
**Como** analista de segurança e DPO (Data Protection Officer) da Clear IT,  
**Quero** que todos os dados sensíveis e Informações de Identificação Pessoal (PII) contidos nos tickets sejam anonimizados automaticamente,  
**Para que** não ocorra vazamento de dados de clientes ao repassar o texto para os provedores de LLM em nuvem (ex: OpenAI) ou ao armazenar no Vector DB, garantindo total conformidade com a LGPD.

## 2. Regras de Negócio e Segurança
1. **Interceptação Preemptiva:** O mascaramento deve ser a PRIMEIRA AÇÃO executada no backend quando a requisição é recebida. Ele age como um *middleware* antes da busca vetorial ou do acionamento do LangChain.
2. **Dados Alvo de Sanitização:**
   - E-mails corporativos e pessoais.
   - Números de CPF e CNPJ.
   - Endereços IP (IPv4 e IPv6).
   - Números de telefone e celulares.
   - Strings que indiquem tokens, chaves de API ou senhas (ex: `password=12345`).
3. **Uso de Placeholders Explícitos:** O dado não deve ser simplesmente apagado, pois isso poderia destruir o contexto da frase para o LLM. A substituição deve ser feita por tags que representem o tipo do dado.
   - *Exemplo Original:* "Falha de login do usuário joao.silva@empresa.com.br vindo do IP 189.44.20.10"
   - *Exemplo Mascarado:* "Falha de login do usuário `[EMAIL]` vindo do IP `[IP_ADDRESS]`"
4. **Isolamento de Logs:** Os logs internos do sistema (FastAPI logger) também **não** devem gravar o payload bruto que contenha PII.

## 3. Critérios de Aceite
1. **Prova de Privacidade:** Ao enviar um payload com CPFs, IPs e E-mails reais para a API, a chamada externa gerada para a OpenAI (ou LLM escolhido) não deve conter os dados originais.
2. **Compreensão do LLM:** O mascaramento não deve inviabilizar o diagnóstico. O LLM deve tratar as tags `[EMAIL]` e `[IP_ADDRESS]` normalmente e mantê-las em seu rascunho de resposta (US03) se precisar referenciá-las.
3. **Desempenho:** O processo de varredura e substituição não pode adicionar mais de `1.0s` ao tempo de latência do endpoint principal.
4. **Cobertura de Testes:** Testes unitários obrigatórios comprovando que o mascaramento atua em todas as bordas (início e fim de strings, agrupados por vírgulas, etc.).

## 4. Estratégia Técnica (Regex + NER)
Para a **Sprint 3 (MVP)**, a abordagem mais ágil e de menor latência será a utilização de **Expressões Regulares (Regex)** pré-compiladas, focadas em padrões matemáticos exatos (IP, CPF, Email, Telefone).

No **Backlog Futuro**, caso seja necessário mascarar texto livre como Nomes Próprios (que não seguem padrão Regex claro), a estratégia deverá escalar para a biblioteca **Microsoft Presidio** (ou ferramentas de NER do Spacy), que utilizam Processamento de Linguagem Natural local para encontrar e mascarar entidades.

## 5. Tarefas Técnicas de Implementação (Backend - Sprint 3)
- [ ] Criar um pacote dedicado (ex: `core/security.py` ou `utils/masking.py`) dentro do backend FastAPI.
- [ ] Desenvolver a função `sanitize_ticket_data(text: str) -> str` com as RegEx de Email, IP, CPF, e chaves básicas.
- [ ] Injetar o mascaramento no controller da US01 (`POST /api/v1/diagnostics/generate`) instantes antes do texto ser repassado ao LangChain.
- [ ] Criar um arquivo de testes robusto (`test_lgpd_masking.py`) enviando dezenas de cenários de texto sujo para garantir que os dados não passam e que as RegEx não quebram palavras legítimas (falsos positivos).
