# US04: Feedback do Analista (Auditoria e Rastreabilidade)

## 1. Descrição da User Story
**Como** gestor da operação e analista L1 da Clear IT,  
**Quero** classificar a sugestão do Copiloto como "Aceita", "Editada" ou "Rejeitada",  
**Para que** possamos auditar a eficácia da IA, manter o controle estrito humano sobre as decisões (*Human-in-the-loop*) e gerar métricas confiáveis para o retreinamento ou ajuste da ferramenta.

## 2. Regras de Negócio e Auditoria
1. **Obrigatoriedade Humana (*Human-in-the-loop*):** O Copiloto nunca atua de forma 100% autônoma. Nenhuma nota é enviada ao cliente ou aplicada como resolução definitiva sem a chancela (revisão) de um analista L1.
2. **Classificações do Feedback:**
   - 🟢 **Aceita (*Accepted*):** A sugestão de diagnóstico e o rascunho estavam perfeitos e o analista apenas confirmou o uso.
   - 🟡 **Editada (*Edited*):** A direção estava correta, mas o analista precisou complementar a resposta, alterar o jargão ou ajustar um pequeno passo técnico.
   - 🔴 **Rejeitada (*Rejected*):** A IA alucinou, sugeriu algo perigoso ou buscou um documento totalmente fora do contexto real do chamado.
3. **Pilar de Rastreabilidade:** Para fins de auditoria (e métricas futuras do EP-05 - Dashboard), cada interação deve registrar quem validou a informação, em qual ticket e a que horas (Timestamp).
4. **Aprendizado Contínuo:** Tickets marcados como "Editados" fornecerão uma base valiosíssima para entendermos a diferença entre o que a IA gerou e o que o analista de fato enviou.

## 3. Critérios de Aceite
1. **Rota Dedicada:** O backend (FastAPI) deve possuir um endpoint exclusivo para receber de forma assíncrona o feedback da interface do usuário.
2. **Validação Estrita:** O sistema deve rejeitar (HTTP 422/400) payloads de feedback que não contenham um dos 3 estados oficiais (`accepted`, `edited`, `rejected`).
3. **Captura da Edição:** Se o status for marcado como `edited`, o frontend deve enviar o texto final que o analista realmente utilizou, para possibilitar comparações (Diff) em auditorias futuras.
4. **Resiliência:** A falha no envio do log de feedback não deve travar ou derrubar a operação de resposta do analista no FreshService.

## 4. Arquitetura do Endpoint (Proposta)

### `POST /api/v1/feedback`

**Objetivo:** Recebe e armazena o veredito de uma sugestão gerada pela inteligência artificial.

#### Request Payload
```json
{
  "ticket_id": "12345",
  "suggestion_id": "sug_abc123",
  "analyst_id": "usr_9982",
  "status": "edited", 
  "original_confidence": 75,
  "final_response_used": "Olá, João. Identificamos o Erro 403. Limpe os cookies do navegador e tente pelo portal corporativo em acesso.empresa.com.br. Qualquer dúvida, ligue no ramal 1234.",
  "timestamp": "2026-07-07T20:25:00Z"
}
```
*(No cenário de `status: accepted` ou `rejected`, o campo `final_response_used` pode ser vazio/nulo).*

#### Response Payload (Sucesso - 201 Created)
```json
{
  "status": "success",
  "message": "Feedback registrado com sucesso.",
  "feedback_id": "fbk_77889"
}
```

## 5. Tarefas Técnicas de Implementação (Backend - Sprint 3)
- [ ] Criar modelo Pydantic para validação do schema de entrada (Enum com os 3 status válidos).
- [ ] Implementar a rota `POST /api/v1/feedback`.
- [ ] Definir e criar a tabela de banco de dados (ex: SQLite ou PostgreSQL) focada em registros tabulares/relacionais para armazenar logs de uso, mantendo-a separada do banco vetorial (ChromaDB).
- [ ] Garantir que o endpoint seja rápido e não bloqueante (execução de inserção no banco de forma assíncrona se necessário).
