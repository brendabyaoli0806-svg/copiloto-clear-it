# Status de Funcionalidades — Copiloto Clear IT (Tech Tigers)

Este documento acompanha o status de desenvolvimento das funcionalidades (Features) e Épicos previstos para o MVP do **Copiloto Inteligente de Suporte L1**. A base técnica para essas features foi provada viável na **Sprint 2 (PoC)** e o desenvolvimento efetivo do produto se dá a partir da **Sprint 3**.

## 1. Épicos (MVP)

| ID | Épico | Status | Observações |
| :--- | :--- | :--- | :--- |
| **EP-01** | Integração FreshService | 🔲 Não iniciado | Leitura de tickets e postagem de notas internas. |
| **EP-02** | Base de Conhecimento e Mascaramento LGPD | 🔄 Em progresso | PoC validou anonimização conceitualmente. |
| **EP-03** | Pipeline RAG e Motor de IA | 🔄 Em progresso | PoC demonstrou eficácia da busca vetorial (ChromaDB) + LLM. |
| **EP-04** | Auditoria e Feedback das Sugestões | 🔲 Não iniciado | Rastreabilidade de ações dos analistas. |

## 2. Funcionalidades (MVP)

| ID | Funcionalidade | Prioridade | Estado | Responsável | Observações |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **F-01** | **Diagnóstico Inteligente (Causa Raiz e Confiança)** | Alta | 🔄 Em progresso | Backend / IA | Conceito validado na Sprint 2. Aguardando implementação da API (FastAPI) e LangChain. |
| **F-02** | **Sugestão de Ações Recomendadas** | Alta | 🔄 Em progresso | Backend / IA | Modelo treinado no fluxo RAG gerou boas sugestões na PoC. |
| **F-03** | **Rascunho de Resposta ao Cliente** | Alta | 🔄 Em progresso | Backend / IA | Utiliza informações recuperadas da base vetorial. |
| **F-04** | **Feedback do Analista (Aceita/Editada/Rejeita)** | Alta | 🔲 Não iniciado | Frontend / Backend | Depende da criação da interface web em React. Requisito de auditoria. |
| **F-05** | **Mascaramento de Dados Sensíveis (LGPD)** | Alta | 🔄 Em progresso | Backend | Estratégia de remoção de dados validada. Necessita integração como serviço. |
| **F-06** | **Geração de Nota Interna Automática** | Alta | 🔲 Não iniciado | Integração | Core do produto (US01); acionado na abertura do ticket via FreshService. |

## 3. Backlog Futuro (Pós-MVP)

| ID | Épico | Status | Observação |
| :--- | :--- | :--- | :--- |
| **EP-05** | Dashboard Operacional | ⛔ Planejado (V2) | Métricas operacionais, acompanhamento de acertos da IA. |
| **EP-06** | Auto Remediation Supervisionada | ⛔ Planejado (V3) | Execução de comandos com autorização do analista. |

---
*Legenda: ✅ Concluído · 🔄 Em progresso · 🔲 Não iniciado · ⛔ Planejado/Bloqueado*
