# Business Context Consolidado

> **Squad:** Tech Tigers · **Código:** B.4 · **Desafio:** B – Serviços (Clear IT)
> *Este documento é a fonte da verdade atualizada para Produto, consolidando as definições iniciais.*

---

## 1. Problema Central

O que parece um problema de ferramentas é, na verdade, um problema de **gestão de conhecimento operacional em tempo real**: cada analista L1 começa do zero, toda vez, mesmo quando a solução já existe em algum ticket fechado ou na cabeça de um sênior.

### Quem sofre? (Personas e Stakeholders)

| Persona / Stakeholder | Dor e Objetivo |
|---|---|
| **Analista L1 (Principal)** | Precisa consultar múltiplas fontes manualmente, sem acesso rápido a diagnósticos anteriores. *Objetivo*: Resolver incidentes com rapidez e autonomia. |
| **Analista L2/L3 (Sênior)** | É interrompido constantemente para resolver problemas que já foram resolvidos antes. *Objetivo*: Atuar apenas em incidentes realmente complexos. |
| **Gestão / Operação** | Não consegue reduzir MTTR nem melhorar FCR porque o gargalo é estrutural. *Objetivo*: Reduzir custos operacionais e escalar a operação. |
| **Cliente final** | Sofre com downtime prolongado e respostas lentas. *Objetivo*: Atendimento rápido e consistente. |

---

## 2. Dores Priorizadas

| # | Dor | Descrição |
|---|---|---|
| 1 | **Consultas Manuais e Fragmentadas** | O analista L1 precisa buscar informações em múltiplos sistemas, wikis desatualizadas e tickets antigos. O conhecimento existe, mas é inacessível no momento da crise. |
| 2 | **Curva de Aprendizado e Retrabalho** | Novos analistas demoram semanas para atingir produtividade mínima. Sem base de conhecimento estruturada, cada um aprende por tentativa e erro. |
| 3 | **Gargalos de Handoff e Comunicação** | Escalonamentos desnecessários congestionam o time L2/L3. Falta contexto estruturado no momento da passagem, forçando o sênior a re-diagnosticar do zero. |

---

## 3. Visão do Produto

> Que o **conhecimento sênior chegue automaticamente ao analista certo**, no segundo em que ele mais precisa, sem depender de escalonamento ou busca manual.

**Nome interno:** Copiloto Inteligente para Suporte L1 da Clear IT

**O que faz (MVP):** Ao abrir um ticket no FreshService, o Copiloto gera automaticamente uma nota interna com:
- Diagnóstico provável (com percentual de confiança)
- Ações recomendadas
- Rascunho de resposta ao cliente

**O que não faz (Fora do MVP):** Auto remediation, execução automática de scripts/comandos, agentes autônomos, fechamento automático de chamados. A IA não age sobre a infraestrutura, apenas recomenda.

---

## 4. Impacto Esperado e KPIs

Ao resolver as 3 dores, a Clear IT ganha **blindagem financeira e operacional**:

| KPI / Dimensão | Meta / Ganho Esperado |
|---|---|
| **MTTR (Tempo Médio de Resolução)** | Redução ≥ 15% após 30 dias de uso com grupo piloto. |
| **FCR / Taxa de Escalonamento** | Aumento mensurável de FCR e redução de escalonamento indevido. |
| **Tempo de Onboarding** | Redução do tempo necessário para um novo L1 se tornar produtivo. |
| **Precisão do Diagnóstico** | ≥ 60% na PoC validada por especialistas L2/L3. |

---

## 5. User Story e Critérios de Aceite (US01)

> Como analista de suporte L1 da Clear IT, quero receber uma sugestão estruturada de diagnóstico com a causa raiz mais provável, as ações recomendadas e um rascunho de resposta ao cliente, para que eu possa resolver incidentes com autonomia — sem precisar consultar múltiplas fontes manualmente ou interromper um analista sênior — reduzindo o tempo de atendimento e aumentando minha taxa de resolução no primeiro contato.

### Critérios de Aceite
1. **Sugestão aparece dentro do ticket:** Ao abrir qualquer ticket L1 no FreshService, o Copiloto exibe em até 10s uma nota interna (ou via web assíncrona) com diagnóstico, ações e rascunho de resposta.
2. **Acurácia mínima:** Em teste com 50 tickets históricos já resolvidos, ≥ 60% das sugestões batem com a resolução real.
3. **Feedback rastreável:** O analista marca cada sugestão como "aceita", "editada" ou "rejeitada" com timestamp e ID do usuário/ticket.
4. **Proteção LGPD:** Nenhum log com IP, credencial ou dado pessoal é enviado ao LLM sem mascaramento prévio.

---

## 6. Regras de Negócio e Restrições

- 🔒 **LGPD:** Dados sensíveis devem ser anonimizados (mascarados) antes do envio ao modelo de IA. Informações pessoais não podem ser armazenadas fora dos sistemas autorizados.
- 🤝 **Confiança (Human-in-the-loop):** O Copiloto nunca age autonomamente. A decisão final é sempre do analista humano.
- 📋 **Auditoria:** Toda sugestão e decisão do analista devem ser registradas.
- ⏱️ **SLA:** A sugestão não pode travar o FreshService (tempo de resposta ideal ≤ 10s).

---

## 7. Arquitetura de Fluxo (Processo Lógico)

```text
Informações da Chamada
             |
             ▼
      Agente de IA (Analisa a solicitação, extrai contexto e sintomas)
             |
             ▼
      Consulta Base de Conhecimento (Busca Vetorial RAG)
             |
             ▼
      Sugere Diagnóstico + Ações Recomendadas + Rascunho Cliente
             |
             ▼
      Validação do Analista L1 (Aceita/Edita/Rejeita ou Escala)
```

---

## 8. Backlog e Roadmap Macro

### Backlog de Épicos (MVP e Futuro)
- EP-01: Integração FreshService
- EP-02: Base de Conhecimento e Mascaramento LGPD
- EP-03: Pipeline RAG e Motor de IA
- EP-04: Auditoria e Feedback das Sugestões
- EP-05: Dashboard Operacional (Backlog - V2)
- EP-06: Auto Remediation Supervisionada (Backlog - V3)

### Funcionalidades do MVP
- F-01: Diagnóstico Inteligente (Causa Raiz e Confiança)
- F-02: Sugestão de Ações e Resposta ao Cliente
- F-03: Feedback do Analista e Rastreabilidade
- F-04: Mascaramento de dados sensíveis (LGPD)

---

## 9. Premissas e Riscos

- **Premissas:** Existe uma base de conhecimento, há acesso a tickets históricos e o FreshService permite integração.
- **Riscos e Mitigação:**
  - Base desatualizada → Processo contínuo de curadoria de KM.
  - Alucinação do LLM → Uso intensivo de RAG e validação humana obrigatória.

---

## 10. Squad Tech Tigers

| Membro | Área |
|---|---|
| Brenda Beatryz da Silva Oliveira (contato) | Tecnologia e Produto |
| Eduardo Augusto Carvalho Silva Brito | Tecnologia e Produto |
| Kayk Junior Da Silva Trindade | Tecnologia e Produto |
| Raul Pereira França | Negócios e Estratégia |
| Vinícius Vieira de Souza | Negócios e Estratégia |
