# US01: Geração Automática de Nota Interna de Diagnóstico

## 1. Descrição da User Story
**Como** analista de suporte L1 da Clear IT,  
**Quero** receber uma sugestão estruturada de diagnóstico com a causa raiz mais provável, as ações recomendadas e um rascunho de resposta ao cliente,  
**Para que** eu possa resolver incidentes com autonomia — sem precisar consultar múltiplas fontes manualmente ou interromper um analista sênior — reduzindo o tempo de atendimento e aumentando minha taxa de resolução no primeiro contato.

## 2. Critérios de Aceite
1. **Geração Automática:** Ao ser acionado o endpoint de geração, a aplicação (FastAPI) deve retornar o diagnóstico, ações e rascunho de resposta estruturados.
2. **Desempenho:** O tempo de resposta da API deve ser inferior a 10s.
3. **Integração RAG (Motor de IA):** A resposta gerada pelo LLM deve utilizar exclusivamente o contexto injetado através da base de conhecimento (ChromaDB).
4. **Mascaramento:** A API deve passar o conteúdo do ticket por um serviço de anonimização antes de enviá-lo ao LLM.
5. **Formato de Saída (JSON):** A API deve entregar um payload pronto para ser postado como Nota Interna no FreshService.

## 3. Arquitetura do Endpoint (Proposta)

### `POST /api/v1/diagnostics/generate`

**Objetivo:** Recebe os dados do ticket aberto, anonimiza as informações sensíveis, consulta o banco vetorial, envia o prompt estruturado ao LLM e devolve a nota interna.

#### Request Payload
```json
{
  "ticket_id": "12345",
  "subject": "Problema de acesso ao sistema de faturamento",
  "description": "Usuário João (joao@empresa.com) relatou que desde as 09:00 não consegue acessar o ERP de Faturamento, recebendo o Erro 403.",
  "priority": 2
}
```

#### Response Payload (Sucesso - 200 OK)
```json
{
  "ticket_id": "12345",
  "diagnostico": {
    "causa_raiz": "Provável expiração do token de sessão no SSO devido à inatividade ou mudança de políticas no Azure AD.",
    "confianca": "85%"
  },
  "acoes_recomendadas": [
    "Solicitar ao usuário que limpe os cookies do navegador.",
    "Reautenticar através do portal do SSO corporativo.",
    "Caso persista, verificar se a conta do usuário não está bloqueada no Active Directory."
  ],
  "rascunho_resposta": "Olá, João. Vimos que está enfrentando o Erro 403 ao acessar o ERP. Por favor, pedimos que limpe os cookies do seu navegador e tente fazer o login novamente pela página principal do nosso SSO. Se o problema persistir, nos avise respondendo este e-mail. Atenciosamente, Suporte Clear IT."
}
```

## 4. Tarefas Técnicas de Implementação (Sprint 3)
- [ ] Inicializar projeto backend com **FastAPI**.
- [ ] Criar modelo Pydantic para Request e Response (`schemas.py`).
- [ ] Implementar serviço de Anonimização Simples (Regex para E-mails, CPFs e IPs).
- [ ] Implementar integração básica com **LangChain + OpenAI** e prompt instrucional.
- [ ] Implementar integração básica com **ChromaDB** para injetar contexto (RAG).
- [ ] Criar o endpoint `POST /api/v1/diagnostics/generate` orquestrando o fluxo.
